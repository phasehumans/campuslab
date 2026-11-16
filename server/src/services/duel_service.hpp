#pragma once

#include <string>
#include <vector>
#include <optional>
#include <functional>
#include <algorithm>
#include <chrono>
#include <iostream>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../db/connection_pool.hpp"
#include "../models/models.hpp"
#include "../repositories/contest_repository.hpp"
#include "contest_service.hpp"
#include "integrity.hpp"

namespace campuslab {

using json = nlohmann::json;

// 1v1 duels, stored as ContestRoom rows with mode = 'DUEL'.
//
//   WAITING --opponent joins--> LOBBY --both ready--> LIVE --> FINISHED
//      |                          |                              (SOLVED | TIMEOUT | FORFEIT | DISQUALIFIED)
//      +------ expiry / cancel ---+--> CANCELLED (EXPIRED | CANCELLED)
//
// Winner = participant whose Accepted submission the server *received* first.
// A still-judging earlier submission blocks the decision until it resolves.
class DuelService {
public:
    using Broadcaster = std::function<void(const std::string& room_code, const json& msg)>;

    static constexpr int LOBBY_TTL_MINUTES = 30;
    static constexpr int COUNTDOWN_SECONDS = 3;
    static constexpr int MAX_VIOLATIONS = Integrity::MAX_VIOLATIONS;  // 1st = warning, 2nd = loss
    static constexpr int PENDING_GRACE_SECONDS = 60;  // stuck judge jobs stop blocking after this
    static constexpr int MAX_OPEN_DUELS_PER_USER = 5;

    explicit DuelService(DbConnectionPool& db_pool, Broadcaster broadcaster = nullptr)
        : db_pool_(db_pool), broadcaster_(std::move(broadcaster)) {}

    void set_broadcaster(Broadcaster b) { broadcaster_ = std::move(b); }

    struct DuelResult {
        bool success;
        int status_code;
        std::string message;
        std::optional<ContestRoomResponse> room;
    };

    struct ViolationResult {
        bool success;
        int status_code;
        std::string message;
        int violations = 0;
        bool lost = false;
        std::optional<ContestRoomResponse> room;
    };

    // EASY_OR_MEDIUM is the default: a random Hard in 30 minutes mostly ends in a draw.
    static constexpr const char* DEFAULT_DIFFICULTY = "EASY_OR_MEDIUM";
    static constexpr int DEFAULT_TIME_LIMIT_MINUTES = 30;

    static bool normalize_difficulty(std::string& d) {
        std::transform(d.begin(), d.end(), d.begin(), ::toupper);
        return d == "EASY" || d == "MEDIUM" || d == "HARD" || d == "RANDOM" || d == "EASY_OR_MEDIUM";
    }

    static bool valid_time_limit(int minutes) {
        return minutes == 15 || minutes == 30 || minutes == 45;
    }

    // ---------------------------------------------------------
    // Create
    // ---------------------------------------------------------
    DuelResult create(const std::string& user_id, std::string difficulty, int time_limit_minutes) {
        if (!normalize_difficulty(difficulty)) {
            return {false, 400, "Difficulty must be one of Easy, Medium, Hard, Easy or Medium, or Random", std::nullopt};
        }
        if (!valid_time_limit(time_limit_minutes)) {
            return {false, 400, "Time limit must be 15, 30 or 45 minutes", std::nullopt};
        }

        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto open_rows = txn.exec_params(
            "SELECT COUNT(*) FROM \"ContestRoom\" WHERE mode = 'DUEL' AND status = 'WAITING' "
            "AND \"hostUserId\" = $1 AND \"endsAt\" > NOW()",
            user_id
        );
        if (open_rows[0][0].as<int>() >= MAX_OPEN_DUELS_PER_USER) {
            return {false, 429, "You have too many open duel links. Cancel one or wait for it to expire", std::nullopt};
        }

        std::string code = insert_duel(txn, user_id, difficulty, time_limit_minutes);
        auto room = build(txn, code, user_id);
        txn.commit();
        return {true, 201, "Duel created", room};
    }

    // ---------------------------------------------------------
    // Read (also lazily applies expiry / timeout / pending verdicts)
    // ---------------------------------------------------------
    DuelResult get(const std::string& code, const std::string& user_id = "") {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row = ContestRepository::find_by_code(txn, code, true);
        if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") {
            return {false, 404, "Duel not found", std::nullopt};
        }

        json event = finalize_locked(txn, code);
        auto room = build(txn, code, user_id);
        txn.commit();
        emit(code, event);
        return {true, 200, "OK", room};
    }

    // ---------------------------------------------------------
    // Join (opponent accepts the challenge link)
    // ---------------------------------------------------------
    DuelResult join(const std::string& user_id, const std::string& code) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row = ContestRepository::find_by_code(txn, code, true);
        if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") {
            return {false, 404, "Duel not found", std::nullopt};
        }

        json event = finalize_locked(txn, code);
        row = ContestRepository::find_by_code(txn, code);
        const auto& r = *row;
        std::string status = r["status"].as<std::string>();
        json participants = json::parse(r["participants"].as<std::string>());

        if (contains_user(participants, user_id)) {
            auto room = build(txn, code, user_id);
            txn.commit();
            emit(code, event);
            return {true, 200, "Already in this duel", room};
        }

        if (status == "CANCELLED" || status == "FINISHED") {
            txn.commit();
            emit(code, event);
            return {false, 410, status == "CANCELLED" ? "This duel link has expired" : "This duel has already ended", std::nullopt};
        }
        if (status != "WAITING" || participants.size() >= 2) {
            txn.commit();
            emit(code, event);
            return {false, 409, "This duel is already taken", std::nullopt};
        }

        participants.push_back({{"userId", user_id}, {"joinedAt", now_iso()}});
        json standings = json::parse(r["standings"].as<std::string>());
        standings[user_id] = {{"score", 0}, {"solvedProblemIds", json::array()}, {"lastAcceptedAt", nullptr}};

        txn.exec_params(
            "UPDATE \"ContestRoom\" SET participants = $1, standings = $2, status = 'LOBBY', "
            "\"readyUserIds\" = '{}'::text[], \"endsAt\" = NOW() + INTERVAL '" + std::to_string(LOBBY_TTL_MINUTES) + " minutes' "
            "WHERE code = $3",
            participants.dump(), standings.dump(), code
        );

        auto room = build(txn, code, user_id);
        txn.commit();
        emit(code, {{"type", "DUEL_UPDATED"}, {"reason", "OPPONENT_JOINED"}, {"userId", user_id}});
        return {true, 200, "Joined duel", room};
    }

    // ---------------------------------------------------------
    // Ready toggle; second ready starts the countdown
    // ---------------------------------------------------------
    DuelResult set_ready(const std::string& user_id, const std::string& code, bool ready) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row = ContestRepository::find_by_code(txn, code, true);
        if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") {
            return {false, 404, "Duel not found", std::nullopt};
        }
        json pre_event = finalize_locked(txn, code);
        row = ContestRepository::find_by_code(txn, code);
        const auto& r = *row;

        json participants = json::parse(r["participants"].as<std::string>());
        if (!contains_user(participants, user_id)) {
            txn.commit();
            emit(code, pre_event);
            return {false, 403, "You are not part of this duel", std::nullopt};
        }
        if (r["status"].as<std::string>() != "LOBBY") {
            txn.commit();
            emit(code, pre_event);
            return {false, 409, "Ready is only available while both players are in the lobby", std::nullopt};
        }

        if (ready) {
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET \"readyUserIds\" = array_append(array_remove(\"readyUserIds\", $1), $1) WHERE code = $2",
                user_id, code
            );
        } else {
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET \"readyUserIds\" = array_remove(\"readyUserIds\", $1) WHERE code = $2",
                user_id, code
            );
        }

        auto ready_rows = txn.exec_params(
            "SELECT cardinality(\"readyUserIds\") AS n, difficulty FROM \"ContestRoom\" WHERE code = $1",
            code
        );
        json event = {{"type", "DUEL_UPDATED"}, {"reason", ready ? "READY" : "UNREADY"}, {"userId", user_id}};

        if (ready_rows[0]["n"].as<int>() >= 2) {
            std::vector<std::string> uids = user_ids(participants);
            std::string difficulty = ready_rows[0]["difficulty"].is_null() ? "RANDOM" : ready_rows[0]["difficulty"].as<std::string>();
            auto picked = pick_problem(txn, difficulty, uids);
            if (!picked.has_value()) {
                txn.abort();
                return {false, 503, "No problems available for this difficulty", std::nullopt};
            }
            const std::string& pid = picked->first;
            const std::string& diff = picked->second;
            int pts = diff == "EASY" ? 100 : (diff == "MEDIUM" ? 200 : 300);
            json points = {{pid, pts}};

            txn.exec_params(
                "UPDATE \"ContestRoom\" SET status = 'LIVE', \"problemIds\" = ARRAY[$1]::text[], \"problemPoints\" = $2::jsonb, "
                "\"startsAt\" = NOW() + INTERVAL '" + std::to_string(COUNTDOWN_SECONDS) + " seconds', "
                "\"endsAt\" = NOW() + INTERVAL '" + std::to_string(COUNTDOWN_SECONDS) + " seconds' + (\"timeLimitMinutes\" * INTERVAL '1 minute') "
                "WHERE code = $3",
                pid, points.dump(), code
            );
            auto t_rows = txn.exec_params("SELECT \"startsAt\"::text AS s, \"endsAt\"::text AS e FROM \"ContestRoom\" WHERE code = $1", code);
            event = {{"type", "DUEL_STARTED"}, {"startsAt", t_rows[0]["s"].as<std::string>()}, {"endsAt", t_rows[0]["e"].as<std::string>()}};
        }

        auto room = build(txn, code, user_id);
        txn.commit();
        emit(code, pre_event);
        emit(code, event);
        return {true, 200, "OK", room};
    }

    // ---------------------------------------------------------
    // Leave: cancel (host, waiting) / back to waiting (lobby) / forfeit (live)
    // ---------------------------------------------------------
    DuelResult leave(const std::string& user_id, const std::string& code) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row = ContestRepository::find_by_code(txn, code, true);
        if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") {
            return {false, 404, "Duel not found", std::nullopt};
        }
        json pre_event = finalize_locked(txn, code);
        row = ContestRepository::find_by_code(txn, code);
        const auto& r = *row;

        json participants = json::parse(r["participants"].as<std::string>());
        if (!contains_user(participants, user_id)) {
            txn.commit();
            emit(code, pre_event);
            return {false, 403, "You are not part of this duel", std::nullopt};
        }

        std::string status = r["status"].as<std::string>();
        json event = nullptr;

        if (status == "WAITING") {
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET status = 'CANCELLED', \"finishReason\" = 'CANCELLED', \"finishedAt\" = NOW(), "
                "\"endsAt\" = LEAST(\"endsAt\", NOW()) WHERE code = $1",
                code
            );
            event = {{"type", "DUEL_CANCELLED"}, {"reason", "CANCELLED"}};
        } else if (status == "LOBBY") {
            json remaining = json::array();
            for (const auto& p : participants) {
                if (p.value("userId", "") != user_id) remaining.push_back(p);
            }
            std::string new_host = remaining.empty() ? user_id : remaining[0]["userId"].get<std::string>();
            json standings = json::parse(r["standings"].as<std::string>());
            standings.erase(user_id);
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET participants = $1, standings = $2, \"hostUserId\" = $3, status = 'WAITING', "
                "\"readyUserIds\" = '{}'::text[], \"endsAt\" = NOW() + INTERVAL '" + std::to_string(LOBBY_TTL_MINUTES) + " minutes' "
                "WHERE code = $4",
                remaining.dump(), standings.dump(), new_host, code
            );
            event = {{"type", "DUEL_UPDATED"}, {"reason", "OPPONENT_LEFT"}, {"userId", user_id}};
        } else if (status == "LIVE") {
            std::string opponent = other_user(participants, user_id);
            if (finish_locked(txn, code, opponent, "FORFEIT")) {
                event = finished_event(opponent, "FORFEIT");
            }
        }
        // FINISHED / CANCELLED: nothing to do

        auto room = build(txn, code, user_id);
        txn.commit();
        emit(code, pre_event);
        emit(code, event);
        return {true, 200, "Left duel", room};
    }

    // ---------------------------------------------------------
    // Anti-cheat: first violation is a warning, second is a loss
    // ---------------------------------------------------------
    ViolationResult report_violation(const std::string& user_id, const std::string& code, const std::string& reason) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row = ContestRepository::find_by_code(txn, code, true);
        if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") {
            return {false, 404, "Duel not found"};
        }
        json pre_event = finalize_locked(txn, code);
        row = ContestRepository::find_by_code(txn, code);
        const auto& r = *row;

        json participants = json::parse(r["participants"].as<std::string>());
        if (!contains_user(participants, user_id)) {
            txn.commit();
            emit(code, pre_event);
            return {false, 403, "You are not part of this duel"};
        }

        json warnings = json::parse(r["warnings"].as<std::string>());
        int count = Integrity::count_for(warnings, user_id);

        if (r["status"].as<std::string>() != "LIVE" || !r["has_started"].as<bool>()) {
            auto room = build(txn, code, user_id);
            txn.commit();
            emit(code, pre_event);
            return {true, 200, "Duel is not live; violation ignored", count, false, room};
        }

        auto outcome = Integrity::record(warnings, user_id, reason);
        count = outcome.violations;
        if (outcome.duplicate) {
            auto room = build(txn, code, user_id);
            txn.commit();
            emit(code, pre_event);
            return {true, 200, "Duplicate violation ignored", count, false, room};
        }
        txn.exec_params("UPDATE \"ContestRoom\" SET warnings = $1::jsonb WHERE code = $2", warnings.dump(), code);

        json event;
        bool lost = false;
        if (outcome.disqualified) {
            for (auto& p : participants) {
                if (p.value("userId", "") == user_id) {
                    p["isDisqualified"] = true;
                    p["disqualifiedReason"] = reason;
                }
            }
            txn.exec_params("UPDATE \"ContestRoom\" SET participants = $1::jsonb WHERE code = $2", participants.dump(), code);
            std::string opponent = other_user(participants, user_id);
            if (finish_locked(txn, code, opponent, "DISQUALIFIED")) {
                event = finished_event(opponent, "DISQUALIFIED");
            }
            lost = true;
        } else {
            event = {{"type", "PEER_WARNED"}, {"userId", user_id}, {"userName", user_name(txn, user_id)},
                     {"reason", reason}, {"violations", count}, {"timestamp", now_iso()}};
        }

        auto room = build(txn, code, user_id);
        txn.commit();
        emit(code, pre_event);
        emit(code, event);
        return {true, 200, lost ? "Second violation: duel lost" : "Warning recorded", count, lost, room};
    }

    // ---------------------------------------------------------
    // Rematch: first click creates the duel, second click joins it
    // ---------------------------------------------------------
    DuelResult rematch(const std::string& user_id, const std::string& code) {
        std::string next_code;
        bool created = false;
        {
            auto conn_guard = db_pool_.acquire();
            pqxx::work txn(conn_guard.get());

            auto row = ContestRepository::find_by_code(txn, code, true);
            if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") {
                return {false, 404, "Duel not found", std::nullopt};
            }
            const auto& r = *row;
            json participants = json::parse(r["participants"].as<std::string>());
            if (!contains_user(participants, user_id)) {
                return {false, 403, "You are not part of this duel", std::nullopt};
            }
            if (r["status"].as<std::string>() != "FINISHED") {
                return {false, 409, "Rematch is available once the duel has finished", std::nullopt};
            }

            if (!r["rematch_code"].is_null()) {
                next_code = r["rematch_code"].as<std::string>();
                txn.commit();
            } else {
                std::string difficulty = r["difficulty"].is_null() ? DEFAULT_DIFFICULTY : r["difficulty"].as<std::string>();
                next_code = insert_duel(txn, user_id, difficulty, r["time_limit_minutes"].as<int>());
                txn.exec_params("UPDATE \"ContestRoom\" SET \"rematchCode\" = $1 WHERE code = $2", next_code, code);
                std::string name = user_name(txn, user_id);
                txn.commit();
                created = true;
                emit(code, {{"type", "REMATCH_OFFER"}, {"code", next_code}, {"fromUserId", user_id}, {"fromName", name}});
            }
        }

        if (created) return get(next_code, user_id);
        return join(user_id, next_code);
    }

    // ---------------------------------------------------------
    // Called after a submission tagged with a room code was judged
    // ---------------------------------------------------------
    void on_submission_judged(const std::string& code, const std::string& user_id, const json& submission) {
        try {
            std::string name;
            json event = nullptr;
            int total = 0;
            {
                auto conn_guard = db_pool_.acquire();
                pqxx::work txn(conn_guard.get());
                auto row = ContestRepository::find_by_code(txn, code, true);
                if (!row.has_value() || (*row)["mode"].as<std::string>() != "DUEL") return;
                name = user_name(txn, user_id);
                // The judge stops at the first failing test, so report against the problem's full suite
                auto t_rows = txn.exec_params(
                    "SELECT jsonb_array_length(testcases) FROM \"Problem\" WHERE id = $1",
                    submission.value("problemId", std::string())
                );
                if (!t_rows.empty() && !t_rows[0][0].is_null()) total = t_rows[0][0].as<int>();
                event = finalize_locked(txn, code);
                txn.commit();
            }

            int passed = 0;
            if (submission.contains("testcases") && submission["testcases"].is_array()) {
                for (const auto& tc : submission["testcases"]) {
                    if (tc.value("passed", false)) passed++;
                }
            }
            emit(code, {
                {"type", "OPPONENT_SUBMITTED"},
                {"userId", user_id},
                {"userName", name},
                {"status", submission.value("status", "Pending")},
                {"passed", passed},
                {"total", total},
                {"timestamp", now_iso()}
            });
            emit(code, event);
        } catch (const std::exception& e) {
            std::cerr << "[DuelService] on_submission_judged failed: " << e.what() << std::endl;
        }
    }

    // Win / loss / draw record for the profile
    json get_record(const std::string& user_id) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());
        return record_for(txn, user_id);
    }

    static json record_for(pqxx::work& txn, const std::string& user_id) {
        auto rows = txn.exec_params(
            "SELECT "
            "COUNT(*) FILTER (WHERE \"winnerId\" = $1) AS wins, "
            "COUNT(*) FILTER (WHERE \"winnerId\" IS NOT NULL AND \"winnerId\" <> $1) AS losses, "
            "COUNT(*) FILTER (WHERE \"winnerId\" IS NULL) AS draws "
            "FROM \"ContestRoom\" WHERE mode = 'DUEL' AND status = 'FINISHED' "
            "AND participants @> jsonb_build_array(jsonb_build_object('userId', $1::text))",
            user_id
        );
        return {
            {"wins", rows[0]["wins"].as<int>()},
            {"losses", rows[0]["losses"].as<int>()},
            {"draws", rows[0]["draws"].as<int>()}
        };
    }

private:
    // Applies any pending state transitions on a row already locked by the caller.
    // Returns the event to broadcast after commit, or null.
    json finalize_locked(pqxx::work& txn, const std::string& code) {
        auto row = ContestRepository::find_by_code(txn, code);
        if (!row.has_value()) return nullptr;
        const auto& r = *row;
        std::string status = r["status"].as<std::string>();
        bool expired = r["is_ended"].as<bool>();

        if ((status == "WAITING" || status == "LOBBY") && expired) {
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET status = 'CANCELLED', \"finishReason\" = 'EXPIRED', \"finishedAt\" = NOW() WHERE code = $1",
                code
            );
            return {{"type", "DUEL_CANCELLED"}, {"reason", "EXPIRED"}};
        }

        if (status != "LIVE") return nullptr;

        // Earliest-received submission that is Accepted or still being judged
        auto subs = txn.exec_params(
            "SELECT s.\"userId\" AS user_id, s.status FROM \"Submission\" s "
            "JOIN \"ContestRoom\" c ON c.code = s.\"contestCode\" "
            "WHERE c.code = $1 AND s.\"problemId\" = c.\"problemIds\"[1] "
            "AND s.\"createdAt\" >= c.\"startsAt\" AND s.\"createdAt\" <= c.\"endsAt\" "
            "AND (s.status = 'Accepted' OR (s.status = 'Pending' AND s.\"createdAt\" > NOW() - INTERVAL '" +
            std::to_string(PENDING_GRACE_SECONDS) + " seconds')) "
            "ORDER BY s.\"createdAt\" ASC, s.id ASC LIMIT 1",
            code
        );

        if (!subs.empty()) {
            if (subs[0]["status"].as<std::string>() == "Accepted") {
                std::string winner = subs[0]["user_id"].as<std::string>();
                if (finish_locked(txn, code, winner, "SOLVED")) {
                    return finished_event(winner, "SOLVED");
                }
            }
            return nullptr; // an earlier submission is still being judged
        }

        if (expired) {
            if (finish_locked(txn, code, std::nullopt, "TIMEOUT")) {
                return finished_event(std::nullopt, "TIMEOUT");
            }
        }
        return nullptr;
    }

    static bool finish_locked(pqxx::work& txn, const std::string& code, const std::optional<std::string>& winner, const std::string& reason) {
        pqxx::result res;
        if (winner.has_value() && !winner->empty()) {
            res = txn.exec_params(
                "UPDATE \"ContestRoom\" SET status = 'FINISHED', \"winnerId\" = $2, \"finishReason\" = $3, "
                "\"finishedAt\" = NOW(), \"endsAt\" = LEAST(\"endsAt\", NOW()) WHERE code = $1 AND status = 'LIVE'",
                code, *winner, reason
            );
        } else {
            res = txn.exec_params(
                "UPDATE \"ContestRoom\" SET status = 'FINISHED', \"winnerId\" = NULL, \"finishReason\" = $2, "
                "\"finishedAt\" = NOW(), \"endsAt\" = LEAST(\"endsAt\", NOW()) WHERE code = $1 AND status = 'LIVE'",
                code, reason
            );
        }
        return res.affected_rows() > 0;
    }

    static json finished_event(const std::optional<std::string>& winner, const std::string& reason) {
        return {
            {"type", "DUEL_FINISHED"},
            {"winnerId", winner.has_value() && !winner->empty() ? json(*winner) : json(nullptr)},
            {"reason", reason}
        };
    }

    static std::string insert_duel(pqxx::work& txn, const std::string& user_id, const std::string& difficulty, int time_limit_minutes) {
        std::string code;
        for (int attempt = 0; attempt < 10; ++attempt) {
            std::string candidate = ContestService::generate_room_code();
            auto check = txn.exec_params("SELECT 1 FROM \"ContestRoom\" WHERE code = $1", candidate);
            if (check.empty()) { code = candidate; break; }
        }
        if (code.empty()) throw std::runtime_error("Failed to generate a unique duel code");

        json participants = json::array({{{"userId", user_id}, {"joinedAt", now_iso()}}});
        json standings = {{user_id, {{"score", 0}, {"solvedProblemIds", json::array()}, {"lastAcceptedAt", nullptr}}}};

        txn.exec_params(
            "INSERT INTO \"ContestRoom\" ("
            "code, \"hostUserId\", \"maxParticipants\", \"questionCount\", \"timeLimitMinutes\", topics, \"problemIds\", "
            "\"problemPoints\", participants, standings, \"createdAt\", \"startsAt\", \"endsAt\", mode, status, difficulty"
            ") VALUES ("
            "$1, $2, 2, 1, $3, '{}'::text[], '{}'::text[], '{}'::jsonb, $4::jsonb, $5::jsonb, "
            "NOW(), NOW(), NOW() + INTERVAL '" + std::to_string(LOBBY_TTL_MINUTES) + " minutes', 'DUEL', 'WAITING', $6)",
            code, user_id, time_limit_minutes, participants.dump(), standings.dump(), difficulty
        );
        return code;
    }

    // Prefer a problem neither player has solved; fall back to any of that difficulty.
    static std::optional<std::pair<std::string, std::string>> pick_problem(
        pqxx::work& txn, const std::string& difficulty, const std::vector<std::string>& uids) {
        std::string a = uids.size() > 0 ? uids[0] : "";
        std::string b = uids.size() > 1 ? uids[1] : a;

        auto rows = txn.exec_params(
            "SELECT p.id, p.difficulty::text AS difficulty FROM \"Problem\" p "
            "WHERE (" + difficulty_filter() + ") "
            "AND NOT EXISTS (SELECT 1 FROM \"ProblemSolved\" ps WHERE ps.\"problemId\" = p.id AND ps.\"userId\" IN ($2, $3)) "
            "ORDER BY random() LIMIT 1",
            difficulty, a, b
        );
        if (rows.empty()) {
            rows = txn.exec_params(
                "SELECT p.id, p.difficulty::text AS difficulty FROM \"Problem\" p "
                "WHERE (" + difficulty_filter() + ") ORDER BY random() LIMIT 1",
                difficulty
            );
        }
        if (rows.empty()) return std::nullopt;
        return std::make_pair(rows[0]["id"].as<std::string>(), rows[0]["difficulty"].as<std::string>());
    }

    static std::string difficulty_filter() {
        return "$1 = 'RANDOM' OR p.difficulty::text = $1 "
               "OR ($1 = 'EASY_OR_MEDIUM' AND p.difficulty::text IN ('EASY', 'MEDIUM'))";
    }

    static ContestRoomResponse build(pqxx::work& txn, const std::string& code, const std::string& user_id) {
        auto row = ContestRepository::find_by_code(txn, code);
        return ContestRepository::build_response(txn, *row, user_id);
    }

    static bool contains_user(const json& participants, const std::string& user_id) {
        for (const auto& p : participants) {
            if (p.value("userId", "") == user_id) return true;
        }
        return false;
    }

    static std::vector<std::string> user_ids(const json& participants) {
        std::vector<std::string> out;
        for (const auto& p : participants) out.push_back(p.value("userId", ""));
        return out;
    }

    static std::string other_user(const json& participants, const std::string& user_id) {
        for (const auto& p : participants) {
            std::string uid = p.value("userId", "");
            if (uid != user_id) return uid;
        }
        return "";
    }

    static std::string user_name(pqxx::work& txn, const std::string& user_id) {
        auto rows = txn.exec_params("SELECT name FROM \"User\" WHERE id = $1", user_id);
        if (rows.empty() || rows[0]["name"].is_null()) return "Coder";
        return rows[0]["name"].as<std::string>();
    }

    static std::string now_iso() {
        auto now = std::chrono::system_clock::now();
        auto t = std::chrono::system_clock::to_time_t(now);
        char buf[64];
        std::strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%SZ", std::gmtime(&t));
        return std::string(buf);
    }

    void emit(const std::string& code, const json& event) {
        if (event.is_null() || !broadcaster_) return;
        try {
            broadcaster_(code, event);
        } catch (...) {}
    }

    DbConnectionPool& db_pool_;
    Broadcaster broadcaster_;
};

} // namespace campuslab

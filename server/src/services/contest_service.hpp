#pragma once

#include <string>
#include <vector>
#include <optional>
#include <random>
#include <algorithm>
#include <chrono>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../db/connection_pool.hpp"
#include "../models/models.hpp"
#include "../repositories/contest_repository.hpp"

namespace campuslab {

using json = nlohmann::json;

class ContestService {
public:
    explicit ContestService(DbConnectionPool& db_pool) : db_pool_(db_pool) {}

    struct ContestResult {
        bool success;
        int status_code;
        std::string message;
        std::optional<ContestRoomResponse> room;
    };

    static std::string generate_room_code() {
        static const char alphabet[] = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(0, sizeof(alphabet) - 2);
        std::string code;
        for (int i = 0; i < 6; ++i) {
            code += alphabet[dis(gen)];
        }
        return code;
    }

    ContestResult create_room(
        const std::string& user_id,
        int question_count,
        int time_limit_minutes,
        std::optional<int> max_participants,
        const std::vector<std::string>& topics
    ) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        std::string tag_condition = "1=1";
        if (!topics.empty()) {
            tag_condition = "(";
            for (size_t i = 0; i < topics.size(); ++i) {
                if (i > 0) tag_condition += " OR ";
                std::string t = topics[i];
                std::string t_plural = (t.empty() || t.back() == 's') ? t : t + "s";
                std::string t_singular = (!t.empty() && t.back() == 's') ? t.substr(0, t.size() - 1) : t;
                tag_condition += "tags && ARRAY['" + txn.esc(t) + "', '" + txn.esc(t_plural) + "', '" + txn.esc(t_singular) + "']::text[]";
            }
            tag_condition += ")";
        }

        auto candidate_rows = txn.exec("SELECT id, difficulty FROM \"Problem\" WHERE " + tag_condition);
        if (static_cast<int>(candidate_rows.size()) < question_count) {
            return {
                false,
                400,
                "Only " + std::to_string(candidate_rows.size()) + " problems available for selected topics",
                std::nullopt
            };
        }

        std::vector<std::pair<std::string, std::string>> pool;
        for (const auto& cr : candidate_rows) {
            pool.push_back({cr["id"].as<std::string>(), cr["difficulty"].as<std::string>()});
        }

        std::random_device rd;
        std::mt19937 g(rd());
        std::shuffle(pool.begin(), pool.end(), g);

        std::vector<std::string> selected_pids;
        json problem_points = json::object();
        for (int i = 0; i < question_count; ++i) {
            selected_pids.push_back(pool[i].first);
            std::string diff = pool[i].second;
            problem_points[pool[i].first] = (diff == "EASY" ? 100 : (diff == "MEDIUM" ? 200 : 300));
        }

        std::string code;
        for (int attempt = 0; attempt < 10; ++attempt) {
            std::string candidate = generate_room_code();
            auto check = txn.exec_params("SELECT 1 FROM \"ContestRoom\" WHERE code = $1", candidate);
            if (check.empty()) { code = candidate; break; }
        }
        if (code.empty()) code = "ROOM99";

        auto now = std::chrono::system_clock::now();
        auto in_time_t = std::chrono::system_clock::to_time_t(now);
        char time_buf[64];
        std::strftime(time_buf, sizeof(time_buf), "%Y-%m-%dT%H:%M:%SZ", std::gmtime(&in_time_t));
        std::string now_str(time_buf);

        json participants = json::array({
            {{"userId", user_id}, {"joinedAt", now_str}}
        });

        json standings = {
            {user_id, {
                {"score", 0},
                {"solvedProblemIds", json::array()},
                {"lastAcceptedAt", nullptr}
            }}
        };

        std::string topics_pg = "{";
        for (size_t i = 0; i < topics.size(); ++i) {
            if (i > 0) topics_pg += ",";
            topics_pg += "\"" + topics[i] + "\"";
        }
        topics_pg += "}";

        std::string pids_pg = "{";
        for (size_t i = 0; i < selected_pids.size(); ++i) {
            if (i > 0) pids_pg += ",";
            pids_pg += "\"" + selected_pids[i] + "\"";
        }
        pids_pg += "}";

        std::string max_p_val = max_participants.has_value() ? std::to_string(*max_participants) : "NULL";

        auto ins_res = txn.exec(
            "INSERT INTO \"ContestRoom\" ("
            "\"code\", \"hostUserId\", \"maxParticipants\", \"questionCount\", \"timeLimitMinutes\", "
            "\"topics\", \"problemIds\", \"problemPoints\", \"participants\", \"standings\", "
            "\"createdAt\", \"startsAt\", \"endsAt\""
            ") VALUES ("
            "'" + txn.esc(code) + "', '" + txn.esc(user_id) + "', " + max_p_val + ", " +
            std::to_string(question_count) + ", " + std::to_string(time_limit_minutes) + ", " +
            "'" + txn.esc(topics_pg) + "'::text[], '" + txn.esc(pids_pg) + "'::text[], " +
            "'" + txn.esc(problem_points.dump()) + "'::jsonb, " +
            "'" + txn.esc(participants.dump()) + "'::jsonb, " +
            "'" + txn.esc(standings.dump()) + "'::jsonb, " +
            "NOW(), NOW(), NOW() + INTERVAL '" + std::to_string(time_limit_minutes) + " minutes'"
            ") RETURNING code, \"hostUserId\" AS host_user_id, \"maxParticipants\" AS max_participants, "
            "\"questionCount\" AS question_count, \"timeLimitMinutes\" AS time_limit_minutes, topics, "
            "\"problemIds\" AS problem_ids, \"problemPoints\" AS problem_points, participants, standings, "
            "\"createdAt\"::text AS created_at, \"startsAt\"::text AS starts_at, \"endsAt\"::text AS ends_at, "
            "NOW() > (NOW() + INTERVAL '" + std::to_string(time_limit_minutes) + " minutes') AS is_ended"
        );

        auto room_resp = ContestRepository::build_response(txn, ins_res[0], user_id);
        txn.commit();

        return {true, 201, "Contest room created successfully", room_resp};
    }

    ContestResult join_room(const std::string& user_id, const std::string& code) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row_opt = ContestRepository::find_by_code(txn, code);
        if (!row_opt.has_value()) {
            return {false, 404, "Contest room not found", std::nullopt};
        }

        const auto& r = *row_opt;
        if (r["is_ended"].as<bool>()) {
            return {false, 400, "Contest room has already ended", std::nullopt};
        }

        json participants = json::parse(r["participants"].as<std::string>());
        json standings = json::parse(r["standings"].as<std::string>());

        bool already_in = false;
        for (const auto& p : participants) {
            if (p.value("userId", "") == user_id) {
                already_in = true;
                break;
            }
        }

        if (!already_in) {
            if (!r["max_participants"].is_null()) {
                int max_p = r["max_participants"].as<int>();
                if (static_cast<int>(participants.size()) >= max_p) {
                    return {false, 400, "Contest room is full", std::nullopt};
                }
            }

            auto now = std::chrono::system_clock::now();
            auto in_time_t = std::chrono::system_clock::to_time_t(now);
            char time_buf[64];
            std::strftime(time_buf, sizeof(time_buf), "%Y-%m-%dT%H:%M:%SZ", std::gmtime(&in_time_t));

            participants.push_back({{"userId", user_id}, {"joinedAt", std::string(time_buf)}});
            standings[user_id] = {
                {"score", 0},
                {"solvedProblemIds", json::array()},
                {"lastAcceptedAt", nullptr}
            };

            txn.exec_params(
                "UPDATE \"ContestRoom\" SET participants = $1, standings = $2 WHERE code = $3",
                participants.dump(), standings.dump(), code
            );
        }

        auto updated_opt = ContestRepository::find_by_code(txn, code);
        auto room_resp = ContestRepository::build_response(txn, *updated_opt, user_id);
        txn.commit();

        return {true, 200, "Joined contest room successfully", room_resp};
    }

    ContestResult leave_room(const std::string& user_id, const std::string& code) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row_opt = ContestRepository::find_by_code(txn, code);
        if (!row_opt.has_value()) {
            return {false, 404, "Contest room not found", std::nullopt};
        }

        const auto& r = *row_opt;
        json participants = json::parse(r["participants"].as<std::string>());
        json new_participants = json::array();
        bool found = false;

        for (const auto& p : participants) {
            if (p.value("userId", "") == user_id) {
                found = true;
            } else {
                new_participants.push_back(p);
            }
        }

        if (!found) {
            return {false, 400, "User is not a participant in this contest room", std::nullopt};
        }

        std::string host_user_id = r["host_user_id"].as<std::string>();

        if (new_participants.empty()) {
            // Last remaining participant exited: close contest room immediately
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET participants = $1, \"endsAt\" = NOW() - INTERVAL '1 second' WHERE code = $2",
                new_participants.dump(), code
            );
        } else if (host_user_id == user_id) {
            // Host exited, transfer host role to the next participant
            std::string next_host = new_participants[0]["userId"].get<std::string>();
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET participants = $1, \"hostUserId\" = $2 WHERE code = $3",
                new_participants.dump(), next_host, code
            );
        } else {
            // Non-host participant exited
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET participants = $1 WHERE code = $2",
                new_participants.dump(), code
            );
        }

        auto updated_opt = ContestRepository::find_by_code(txn, code);
        std::optional<ContestRoomResponse> room_resp = std::nullopt;
        if (updated_opt.has_value()) {
            room_resp = ContestRepository::build_response(txn, *updated_opt, user_id);
        }
        txn.commit();

        return {true, 200, "Left contest room successfully", room_resp};
    }

    std::optional<ContestRoomResponse> get_room(const std::string& code, const std::string& user_id = "") {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row_opt = ContestRepository::find_by_code(txn, code);
        if (!row_opt.has_value()) return std::nullopt;

        return ContestRepository::build_response(txn, *row_opt, user_id);
    }

    ContestResult disqualify_participant(const std::string& user_id, const std::string& code, const std::string& reason) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto row_opt = ContestRepository::find_by_code(txn, code);
        if (!row_opt.has_value()) {
            return {false, 404, "Contest room not found", std::nullopt};
        }

        const auto& r = *row_opt;
        json participants = json::parse(r["participants"].as<std::string>());
        bool found = false;
        for (auto& p : participants) {
            if (p.value("userId", "") == user_id) {
                p["isDisqualified"] = true;
                p["disqualifiedReason"] = reason;
                found = true;
                break;
            }
        }

        if (found) {
            txn.exec_params(
                "UPDATE \"ContestRoom\" SET participants = $1 WHERE code = $2",
                participants.dump(), code
            );
        }

        auto updated_opt = ContestRepository::find_by_code(txn, code);
        auto room_resp = ContestRepository::build_response(txn, *updated_opt, user_id);
        txn.commit();

        return {true, 200, "Participant disqualified successfully", room_resp};
    }

private:
    DbConnectionPool& db_pool_;
};

} // namespace campuslab

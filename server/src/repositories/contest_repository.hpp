#pragma once

#include <string>
#include <vector>
#include <optional>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../models/models.hpp"
#include "problem_repository.hpp"

namespace campuslab {

class ContestRepository {
public:
    static std::optional<pqxx::row> find_by_code(pqxx::work& txn, const std::string& code) {
        auto rows = txn.exec_params(
            "SELECT code, \"hostUserId\" AS host_user_id, \"maxParticipants\" AS max_participants, "
            "\"questionCount\" AS question_count, \"timeLimitMinutes\" AS time_limit_minutes, "
            "topics, \"problemIds\" AS problem_ids, \"problemPoints\" AS problem_points, participants, standings, "
            "\"createdAt\"::text AS created_at, \"startsAt\"::text AS starts_at, \"endsAt\"::text AS ends_at, "
            "NOW() > \"endsAt\" as is_ended "
            "FROM \"ContestRoom\" WHERE code = $1",
            code
        );
        if (rows.empty()) return std::nullopt;
        return rows[0];
    }

    static ContestRoomResponse build_response(pqxx::work& txn, const pqxx::row& r, const std::string& current_user_id = "") {
        ContestRoomResponse resp;
        resp.code = r["code"].as<std::string>();
        std::string host_user_id = r["host_user_id"].as<std::string>();
        if (!r["max_participants"].is_null()) resp.max_participants = r["max_participants"].as<int>();
        resp.question_count = r["question_count"].as<int>();
        resp.time_limit_minutes = r["time_limit_minutes"].as<int>();
        resp.starts_at = r["starts_at"].as<std::string>();
        resp.ends_at = r["ends_at"].as<std::string>();
        resp.is_ended = r["is_ended"].as<bool>();

        resp.topics = ProblemRepository::parse_pg_array(r["topics"].as<std::string>());
        std::vector<std::string> pids = ProblemRepository::parse_pg_array(r["problem_ids"].as<std::string>());
        json points_map = json::parse(r["problem_points"].as<std::string>());
        json participants_raw = json::parse(r["participants"].as<std::string>());
        json standings_map = json::parse(r["standings"].as<std::string>());

        std::unordered_set<std::string> user_solved_pids;
        if (!current_user_id.empty() && standings_map.contains(current_user_id)) {
            for (const auto& pid : standings_map[current_user_id]["solvedProblemIds"]) {
                user_solved_pids.insert(pid.get<std::string>());
            }
        }

        if (!pids.empty()) {
            std::string in_clause;
            for (size_t i = 0; i < pids.size(); ++i) {
                if (i > 0) in_clause += ",";
                in_clause += "'" + txn.esc(pids[i]) + "'";
            }
            auto p_rows = txn.exec("SELECT id, title, difficulty, tags FROM \"Problem\" WHERE id IN (" + in_clause + ")");
            std::unordered_map<std::string, pqxx::row> p_map;
            for (const auto& pr : p_rows) p_map[pr["id"].as<std::string>()] = pr;

            for (const auto& pid : pids) {
                if (!p_map.count(pid)) continue;
                const auto& pr = p_map[pid];
                std::string diff_raw = pr["difficulty"].as<std::string>();

                ContestQuestionItem q;
                q.id = pid;
                q.title = pr["title"].as<std::string>();
                q.difficulty = diff_raw == "EASY" ? "Easy" : (diff_raw == "MEDIUM" ? "Medium" : "Hard");
                q.tags = ProblemRepository::parse_pg_array(pr["tags"].as<std::string>());
                q.points = points_map.value(pid, diff_raw == "EASY" ? 100 : (diff_raw == "MEDIUM" ? 200 : 300));
                q.solved = user_solved_pids.count(pid) > 0;
                resp.questions.push_back(q);
            }
        }

        std::vector<std::string> participant_uids;
        for (const auto& p : participants_raw) {
            std::string uid = p.value("userId", "");
            if (!uid.empty()) participant_uids.push_back(uid);
            if (uid == current_user_id) resp.me_joined = true;
        }
        resp.participant_count = static_cast<int>(participant_uids.size());

        struct UserMeta {
            std::string name;
            std::string avatar;
        };
        std::unordered_map<std::string, UserMeta> user_meta;
        if (!participant_uids.empty()) {
            std::string u_in;
            for (size_t i = 0; i < participant_uids.size(); ++i) {
                if (i > 0) u_in += ",";
                u_in += "'" + txn.esc(participant_uids[i]) + "'";
            }
            auto user_rows = txn.exec("SELECT id, name, avatar FROM \"User\" WHERE id IN (" + u_in + ")");
            for (const auto& ur : user_rows) {
                std::string uid = ur["id"].as<std::string>();
                std::string uname = ur["name"].is_null() ? "" : ur["name"].as<std::string>();
                std::string uavatar = ur["avatar"].is_null() ? "" : ur["avatar"].as<std::string>();
                user_meta[uid] = {uname, uavatar};
            }
        }

        for (const auto& uid : participant_uids) {
            const auto& meta = user_meta[uid];
            std::string uname = meta.name.empty() ? "Competitor" : meta.name;
            resp.participants.push_back({
                {"userId", uid},
                {"name", uname},
                {"avatar", meta.avatar.empty() ? nullptr : json(meta.avatar)},
                {"isHost", uid == host_user_id}
            });
        }

        for (const auto& uid : participant_uids) {
            ContestLeaderboardItem item;
            item.user_id = uid;
            const auto& meta = user_meta[uid];
            item.name = meta.name.empty() ? "Competitor" : meta.name;
            item.avatar = meta.avatar;
            item.is_you = (uid == current_user_id);

            if (standings_map.contains(uid)) {
                item.score = standings_map[uid].value("score", 0);
                item.solved = static_cast<int>(standings_map[uid]["solvedProblemIds"].size());
                if (!standings_map[uid]["lastAcceptedAt"].is_null()) {
                    item.last_accepted_at = standings_map[uid]["lastAcceptedAt"].get<std::string>();
                }
            }
            resp.leaderboard.push_back(item);
        }

        std::sort(resp.leaderboard.begin(), resp.leaderboard.end(), [](const ContestLeaderboardItem& a, const ContestLeaderboardItem& b) {
            if (a.score != b.score) return a.score > b.score;
            if (a.solved != b.solved) return a.solved > b.solved;
            std::string ta = a.last_accepted_at.value_or("9999");
            std::string tb = b.last_accepted_at.value_or("9999");
            return ta < tb;
        });

        for (size_t i = 0; i < resp.leaderboard.size(); ++i) {
            resp.leaderboard[i].rank = static_cast<int>(i + 1);
        }

        return resp;
    }
};

} // namespace campuslab

#pragma once

#include <string>
#include <optional>
#include <unordered_map>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../db/connection_pool.hpp"
#include "../models/models.hpp"

namespace campuslab {

using json = nlohmann::json;

class ProfileService {
public:
    explicit ProfileService(DbConnectionPool& db_pool) : db_pool_(db_pool) {}

    std::optional<json> get_profile(const std::string& user_id) {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto u_rows = txn.exec_params(
            "SELECT id, name, email, avatar, provider, role, \"createdAt\"::text AS created_at FROM \"User\" WHERE id = $1",
            user_id
        );
        if (u_rows.empty()) return std::nullopt;

        const auto& u = u_rows[0];
        std::string name = u["name"].is_null() ? "" : u["name"].as<std::string>();
        std::string email = u["email"].is_null() ? "" : u["email"].as<std::string>();
        std::string avatar = u["avatar"].is_null() ? "" : u["avatar"].as<std::string>();
        std::string provider = u["provider"].is_null() ? "github" : u["provider"].as<std::string>();
        std::string created_at = u["created_at"].as<std::string>();

        // Total available problems by difficulty
        auto prob_counts = txn.exec("SELECT difficulty, count(*) FROM \"Problem\" GROUP BY difficulty");
        std::unordered_map<std::string, int> total_by_diff;
        for (const auto& r : prob_counts) {
            total_by_diff[r[0].as<std::string>()] = r[1].as<int>();
        }

        // Solved problems by difficulty
        auto solved_counts = txn.exec_params(
            "SELECT p.difficulty, count(*) FROM \"ProblemSolved\" ps "
            "JOIN \"Problem\" p ON ps.\"problemId\" = p.id "
            "WHERE ps.\"userId\" = $1 GROUP BY p.difficulty",
            user_id
        );
        std::unordered_map<std::string, int> solved_by_diff;
        int total_solved = 0;
        for (const auto& r : solved_counts) {
            std::string d = r[0].as<std::string>();
            int c = r[1].as<int>();
            solved_by_diff[d] = c;
            total_solved += c;
        }

        json by_diff_arr = json::array({
            {
                {"name", "Easy"},
                {"value", solved_by_diff["EASY"]},
                {"total", total_by_diff["EASY"]}
            },
            {
                {"name", "Medium"},
                {"value", solved_by_diff["MEDIUM"]},
                {"total", total_by_diff["MEDIUM"]}
            },
            {
                {"name", "Hard"},
                {"value", solved_by_diff["HARD"]},
                {"total", total_by_diff["HARD"]}
            }
        });

        // Recent 10 submissions with problem details
        auto recent_subs = txn.exec_params(
            "SELECT s.id, s.\"problemId\" AS problem_id, s.status, s.language, s.\"createdAt\"::text AS created_at, p.title, p.difficulty "
            "FROM \"Submission\" s "
            "JOIN \"Problem\" p ON s.\"problemId\" = p.id "
            "WHERE s.\"userId\" = $1 "
            "ORDER BY s.\"createdAt\" DESC LIMIT 10",
            user_id
        );

        json recent_subs_arr = json::array();
        for (const auto& r : recent_subs) {
            std::string diff_raw = r["difficulty"].as<std::string>();
            std::string diff_label = diff_raw == "EASY" ? "Easy" : (diff_raw == "MEDIUM" ? "Medium" : "Hard");

            recent_subs_arr.push_back({
                {"id", r["id"].as<std::string>()},
                {"problemId", r["problem_id"].as<std::string>()},
                {"title", r["title"].as<std::string>()},
                {"difficulty", diff_label},
                {"status", r["status"].as<std::string>()},
                {"language", r["language"].as<std::string>()},
                {"createdAt", r["created_at"].as<std::string>()}
            });
        }

        json profile_data = {
            {"user", {
                {"id", user_id},
                {"name", name.empty() ? nullptr : json(name)},
                {"email", email.empty() ? nullptr : json(email)},
                {"avatar", avatar.empty() ? nullptr : json(avatar)},
                {"provider", provider},
                {"role", u["role"].as<std::string>()},
                {"createdAt", created_at}
            }},
            {"stats", {
                {"totalSolved", total_solved},
                {"byDifficulty", by_diff_arr}
            }},
            {"recentSubmissions", recent_subs_arr}
        };

        return profile_data;
    }

private:
    DbConnectionPool& db_pool_;
};

} // namespace campuslab

#pragma once

#include <string>
#include <optional>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../db/connection_pool.hpp"
#include "../repositories/problem_repository.hpp"

namespace campuslab {

using json = nlohmann::json;

// Problem of the Day.
// The day boundary is midnight IST. The first request of a new day picks the
// problem; INSERT ... ON CONFLICT makes concurrent first requests agree.
class PotdService {
public:
    explicit PotdService(DbConnectionPool& db_pool) : db_pool_(db_pool) {}

    // Weekly difficulty rhythm: Mon/Tue easy, Wed-Fri medium, weekend hard.
    static std::string difficulty_for_iso_dow(int iso_dow) {
        if (iso_dow <= 2) return "EASY";
        if (iso_dow <= 5) return "MEDIUM";
        return "HARD";
    }

    std::optional<json> get_today(const std::string& user_id = "") {
        auto conn_guard = db_pool_.acquire();
        pqxx::work txn(conn_guard.get());

        auto day_rows = txn.exec(
            "SELECT (NOW() AT TIME ZONE 'Asia/Kolkata')::date::text AS today, "
            "EXTRACT(ISODOW FROM (NOW() AT TIME ZONE 'Asia/Kolkata'))::int AS dow"
        );
        std::string today = day_rows[0]["today"].as<std::string>();
        int dow = day_rows[0]["dow"].as<int>();

        auto problem_id = find_for_date(txn, today);
        if (!problem_id.has_value()) {
            auto picked = pick_problem(txn, difficulty_for_iso_dow(dow));
            if (!picked.has_value()) return std::nullopt; // empty problem table
            txn.exec_params(
                "INSERT INTO \"DailyProblem\" (\"date\", \"problemId\") VALUES ($1::date, $2) "
                "ON CONFLICT (\"date\") DO NOTHING",
                today, *picked
            );
            problem_id = find_for_date(txn, today);
        }

        auto p_rows = txn.exec_params(
            "SELECT id, title, difficulty, tags FROM \"Problem\" WHERE id = $1",
            *problem_id
        );
        if (p_rows.empty()) return std::nullopt;
        const auto& p = p_rows[0];
        std::string diff_raw = p["difficulty"].as<std::string>();

        // Submission."createdAt" is a naive timestamp in the DB session time zone,
        // so convert the IST day window into that zone before comparing.
        const std::string window =
            "\"createdAt\" >= (($1::date)::timestamp AT TIME ZONE 'Asia/Kolkata')::timestamp "
            "AND \"createdAt\" < (($1::date + 1)::timestamp AT TIME ZONE 'Asia/Kolkata')::timestamp ";

        auto count_rows = txn.exec_params(
            "SELECT COUNT(DISTINCT \"userId\") FROM \"Submission\" "
            "WHERE \"problemId\" = $2 AND status = 'Accepted' AND " + window,
            today, *problem_id
        );
        int solved_count = count_rows[0][0].as<int>();

        bool solved_by_me = false;
        if (!user_id.empty()) {
            auto me_rows = txn.exec_params(
                "SELECT 1 FROM \"Submission\" "
                "WHERE \"problemId\" = $2 AND \"userId\" = $3 AND status = 'Accepted' AND " + window + "LIMIT 1",
                today, *problem_id, user_id
            );
            solved_by_me = !me_rows.empty();
        }

        auto next_rows = txn.exec_params(
            "SELECT ((($1::date + 1)::timestamp AT TIME ZONE 'Asia/Kolkata')::timestamp(3))::text AS next_at",
            today
        );

        txn.commit();

        return json{
            {"date", today},
            {"nextAt", next_rows[0]["next_at"].as<std::string>()},
            {"solvedCount", solved_count},
            {"solvedByMe", solved_by_me},
            {"problem", {
                {"id", p["id"].as<std::string>()},
                {"title", p["title"].as<std::string>()},
                {"difficulty", diff_raw == "EASY" ? "Easy" : (diff_raw == "MEDIUM" ? "Medium" : "Hard")},
                {"tags", ProblemRepository::parse_pg_array(p["tags"].is_null() ? "{}" : p["tags"].as<std::string>())}
            }}
        };
    }

private:
    static std::optional<std::string> find_for_date(pqxx::work& txn, const std::string& date) {
        auto rows = txn.exec_params(
            "SELECT \"problemId\" FROM \"DailyProblem\" WHERE \"date\" = $1::date",
            date
        );
        if (rows.empty()) return std::nullopt;
        return rows[0][0].as<std::string>();
    }

    static std::optional<std::string> pick_problem(pqxx::work& txn, const std::string& difficulty) {
        // 1. Never-featured problem of today's difficulty
        auto rows = txn.exec_params(
            "SELECT p.id FROM \"Problem\" p "
            "WHERE p.difficulty::text = $1 "
            "AND NOT EXISTS (SELECT 1 FROM \"DailyProblem\" d WHERE d.\"problemId\" = p.id) "
            "ORDER BY random() LIMIT 1",
            difficulty
        );
        if (!rows.empty()) return rows[0][0].as<std::string>();

        // 2. Otherwise the least recently featured problem of any difficulty
        rows = txn.exec(
            "SELECT p.id FROM \"Problem\" p "
            "LEFT JOIN (SELECT \"problemId\", MAX(\"date\") AS last_date FROM \"DailyProblem\" GROUP BY \"problemId\") d "
            "ON d.\"problemId\" = p.id "
            "ORDER BY d.last_date ASC NULLS FIRST, random() LIMIT 1"
        );
        if (!rows.empty()) return rows[0][0].as<std::string>();
        return std::nullopt;
    }

    DbConnectionPool& db_pool_;
};

} // namespace campuslab

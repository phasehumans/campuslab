#pragma once

#include <string>
#include <vector>
#include <optional>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../models/models.hpp"

namespace campuslab {

class SubmissionRepository {
public:
    static std::string create_submission(pqxx::connection& conn, const std::string& user_id, const std::string& problem_id, const std::string& source_code) {
        pqxx::work txn(conn);
        auto rows = txn.exec_params(
            "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
            "VALUES (gen_random_uuid(), $1, $2, $3, 'C++ (GCC 13)', 'Pending', NOW(), NOW()) "
            "RETURNING id",
            user_id, problem_id, json(source_code).dump()
        );
        txn.commit();
        return rows[0]["id"].as<std::string>();
    }

    static json get_submission_by_id(pqxx::connection& conn, const std::string& submission_id) {
        pqxx::work txn(conn);
        auto rows = txn.exec_params(
            "SELECT id, \"userId\" AS user_id, \"problemId\" AS problem_id, status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage, \"createdAt\"::text AS created_at "
            "FROM \"Submission\" WHERE id = $1",
            submission_id
        );
        if (rows.empty()) return nullptr;

        auto tc_rows = txn.exec_params(
            "SELECT \"testCase\" AS testcase, passed, stdout, \"expectedOutput\" AS expected_output, status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage "
            "FROM \"TestCaseResult\" WHERE \"submissionId\" = $1 ORDER BY \"testCase\"::int ASC",
            submission_id
        );

        json tc_arr = json::array();
        for (const auto& r : tc_rows) {
            tc_arr.push_back({
                {"testCase", r["testcase"].as<std::string>()},
                {"passed", r["passed"].as<bool>()},
                {"stdout", r["stdout"].is_null() ? nullptr : json(r["stdout"].as<std::string>())},
                {"expectedOutput", r["expected_output"].is_null() ? nullptr : json(r["expected_output"].as<std::string>())},
                {"status", r["status"].as<std::string>()},
                {"timeTaken", r["time_taken"].is_null() ? nullptr : json(r["time_taken"].as<std::string>())},
                {"memoryUsage", r["memory_usage"].is_null() ? nullptr : json(r["memory_usage"].as<std::string>())}
            });
        }

        std::string time_taken_val = rows[0]["time_taken"].is_null() ? "" : rows[0]["time_taken"].as<std::string>();
        std::string mem_val = rows[0]["memory_usage"].is_null() ? "" : rows[0]["memory_usage"].as<std::string>();

        return {
            {"id", rows[0]["id"].as<std::string>()},
            {"userId", rows[0]["user_id"].as<std::string>()},
            {"problemId", rows[0]["problem_id"].as<std::string>()},
            {"status", rows[0]["status"].as<std::string>()},
            {"timeTaken", time_taken_val.empty() ? nullptr : json(time_taken_val)},
            {"memoryUsage", mem_val.empty() ? nullptr : json(mem_val)},
            {"testcases", tc_arr}
        };
    }

    static json get_user_submissions_for_problem(pqxx::connection& conn, const std::string& user_id, const std::string& problem_id, int limit = 20) {
        pqxx::work txn(conn);
        auto rows = txn.exec_params(
            "SELECT id, \"userId\" AS user_id, \"problemId\" AS problem_id, status, language, \"createdAt\"::text AS created_at "
            "FROM \"Submission\" WHERE \"userId\" = $1 AND \"problemId\" = $2 ORDER BY \"createdAt\" DESC LIMIT $3",
            user_id, problem_id, limit
        );

        json list = json::array();
        for (const auto& r : rows) {
            list.push_back({
                {"id", r["id"].as<std::string>()},
                {"userId", r["user_id"].as<std::string>()},
                {"problemId", r["problem_id"].as<std::string>()},
                {"status", r["status"].as<std::string>()},
                {"language", r["language"].as<std::string>()},
                {"createdAt", r["created_at"].as<std::string>()}
            });
        }
        return list;
    }
};

} // namespace campuslab

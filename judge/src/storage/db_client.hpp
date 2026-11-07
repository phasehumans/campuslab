#pragma once

#include <string>
#include <vector>
#include <optional>
#include <iostream>
#include <memory>
#include <chrono>
#include <thread>
#include <pqxx/pqxx>
#include "types.hpp"

namespace campuslab {

class JudgeDbClient {
public:
    explicit JudgeDbClient(const std::string& db_url) : db_url_(db_url) {
        connect();
    }

    bool ensure_connected() {
        if (conn_ && conn_->is_open()) return true;
        return connect();
    }

    bool update_submission(
        const JudgeJob& job,
        const ExecutionResponse& resp,
        const std::string& final_status,
        const std::string& total_time,
        const std::string& max_memory,
        const std::string& compile_err
    ) {
        if (!ensure_connected()) {
            std::cerr << "[JudgeDbClient] DB connection not open, cannot update submission " << job.submission_id << std::endl;
            return false;
        }

        try {
            pqxx::work txn(*conn_);

            std::optional<std::string> opt_time = total_time.empty() ? std::nullopt : std::make_optional(total_time);
            std::optional<std::string> opt_mem = max_memory.empty() ? std::nullopt : std::make_optional(max_memory);
            std::optional<std::string> opt_compile = compile_err.empty() ? std::nullopt : std::make_optional(compile_err);

            // 1. Update Submission table
            txn.exec_params(
                "UPDATE \"Submission\" SET "
                "\"status\" = $1, "
                "\"timeTaken\" = $2, "
                "\"memoryUsage\" = $3, "
                "\"compilationOutput\" = $4, "
                "\"updatedAt\" = NOW() "
                "WHERE \"id\" = $5",
                final_status,
                opt_time,
                opt_mem,
                opt_compile,
                job.submission_id
            );

            // 2. Insert TestCaseResult rows
            for (const auto& item : resp.results) {
                std::string tc_id;
                auto r = txn.exec("SELECT gen_random_uuid()::text");
                tc_id = r[0][0].as<std::string>();

                std::optional<std::string> opt_stdout = item.stdout_output.empty() ? std::nullopt : std::make_optional(item.stdout_output);

                txn.exec_params(
                    "INSERT INTO \"TestCaseResult\" "
                    "(\"id\", \"submissionId\", \"testCase\", \"passed\", \"stdout\", \"expectedOutput\", \"stderr\", \"compileOutput\", \"status\", \"memoryUsage\", \"timeTaken\", \"createdAt\", \"updatedAt\") "
                    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())",
                    tc_id,
                    job.submission_id,
                    std::to_string(item.testcase + 1),
                    item.passed,
                    opt_stdout,
                    item.expected_output,
                    item.stderr_output,
                    item.compile_output,
                    item.status,
                    item.memory,
                    item.time
                );
            }

            // 3. If accepted, upsert into ProblemSolved
            if (final_status == "Accepted" && !job.user_id.empty() && !job.problem_id.empty()) {
                txn.exec_params(
                    "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                    "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) "
                    "ON CONFLICT (\"userId\", \"problemId\") DO NOTHING",
                    job.user_id,
                    job.problem_id
                );
            }

            txn.commit();
            std::cout << "[JudgeDbClient] Successfully updated DB for submission " << job.submission_id 
                      << " -> " << final_status << std::endl;
            return true;
        } catch (const std::exception& e) {
            std::cerr << "[JudgeDbClient] DB error on submission " << job.submission_id << ": " << e.what() << std::endl;
            conn_.reset();
            return false;
        }
    }

private:
    bool connect() {
        while (!conn_) {
            try {
                std::cout << "[JudgeDbClient] Connecting to PostgreSQL..." << std::endl;
                conn_ = std::make_unique<pqxx::connection>(db_url_);
                std::cout << "[JudgeDbClient] Connected to PostgreSQL!" << std::endl;
                return true;
            } catch (const std::exception& e) {
                std::cerr << "[JudgeDbClient] PostgreSQL connection error: " << e.what() << ". Retrying in 2s..." << std::endl;
                std::this_thread::sleep_for(std::chrono::seconds(2));
            }
        }
        return true;
    }

    std::string db_url_;
    std::unique_ptr<pqxx::connection> conn_;
};

} // namespace campuslab

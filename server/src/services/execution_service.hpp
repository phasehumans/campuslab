#pragma once

#include <string>
#include <vector>
#include <memory>
#include <chrono>
#include <thread>
#include <optional>
#include <iostream>
#include <pqxx/pqxx>
#include <hiredis/hiredis.h>
#include "json.hpp"
#include "types.hpp"
#include "../db/connection_pool.hpp"
#include "../models/models.hpp"
#include "../repositories/submission_repository.hpp"

namespace campuslab {

using json = nlohmann::json;

class ExecutionService {
public:
    ExecutionService(DbConnectionPool& db_pool, const std::string& redis_host, int redis_port)
        : db_pool_(db_pool), redis_host_(redis_host), redis_port_(redis_port) {}

    struct RunResult {
        bool success;
        int status_code;
        std::string message;
        json execution;
    };

    struct SubmitResult {
        bool success;
        int status_code;
        std::string message;
        json submission;
        json execution;
    };

    RunResult run_code(const std::string& user_id, const std::string& source_code, const std::vector<Testcase>& testcases) {
        if (source_code.empty()) {
            return {false, 400, "Source code is required", nullptr};
        }

        std::string job_id = "run_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        JudgeJob job;
        job.submission_id = job_id;
        job.type = "RUN";
        job.user_id = user_id;
        job.source_code = source_code;
        job.testcases = testcases;
        job.time_limit_sec = 1.0;
        job.memory_limit_kb = 262144;

        redisContext* redis = redisConnect(redis_host_.c_str(), redis_port_);
        if (!redis || redis->err) {
            if (redis) redisFree(redis);
            return {false, 500, "Failed to connect to Redis queue", nullptr};
        }

        std::string job_json = job.to_json().dump();
        redisReply* lpush = (redisReply*)redisCommand(redis, "LPUSH %s %s", "judge_queue", job_json.c_str());
        if (lpush) freeReplyObject(lpush);

        // Poll for result key job_result:<job_id> (up to 15 seconds)
        std::string result_key = "job_result:" + job_id;
        std::string result_str;
        for (int i = 0; i < 30; ++i) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            redisReply* get_res = (redisReply*)redisCommand(redis, "GET %s", result_key.c_str());
            if (get_res && get_res->type == REDIS_REPLY_STRING) {
                result_str = get_res->str;
                freeReplyObject(get_res);
                break;
            }
            if (get_res) freeReplyObject(get_res);
        }
        redisFree(redis);

        if (result_str.empty()) {
            return {false, 504, "Execution timed out waiting for worker", nullptr};
        }

        auto res_json = json::parse(result_str);
        json exec_data = {
            {"language", "C++ (GCC 13)"},
            {"allPassed", res_json.value("allPassed", false)},
            {"results", res_json.value("results", json::array())}
        };

        return {true, 200, "Code executed successfully", exec_data};
    }

    SubmitResult submit_code(const std::string& user_id, const std::string& problem_id, const std::string& source_code, const std::string& contest_code) {
        if (problem_id.empty() || source_code.empty()) {
            return {false, 400, "Missing problemId or sourceCode", nullptr, nullptr};
        }

        std::string problem_difficulty;
        std::vector<Testcase> hidden_testcases;

        {
            auto conn_guard = db_pool_.acquire();
            pqxx::work txn(conn_guard.get());
            auto prob_rows = txn.exec_params("SELECT difficulty, testcases FROM \"Problem\" WHERE id = $1", problem_id);
            if (prob_rows.empty()) {
                return {false, 404, "Problem not found", nullptr, nullptr};
            }
            problem_difficulty = prob_rows[0]["difficulty"].as<std::string>();
            auto tc_json = json::parse(prob_rows[0]["testcases"].as<std::string>());
            auto get_tc_str = [](const json& j, const std::string& key) -> std::string {
                if (!j.contains(key) || j[key].is_null()) return "";
                if (j[key].is_string()) return j[key].get<std::string>();
                return j[key].dump();
            };
            for (const auto& tc : tc_json) {
                hidden_testcases.push_back({
                    get_tc_str(tc, "input"),
                    get_tc_str(tc, "output")
                });
            }
        }

        std::string submission_id;
        {
            auto conn_guard = db_pool_.acquire();
            submission_id = SubmissionRepository::create_submission(conn_guard.get(), user_id, problem_id, source_code);
        }

        JudgeJob job;
        job.submission_id = submission_id;
        job.type = "SUBMIT";
        job.user_id = user_id;
        job.problem_id = problem_id;
        job.source_code = source_code;
        job.contest_code = contest_code;
        job.time_limit_sec = 1.0;
        job.memory_limit_kb = 262144;
        job.testcases = hidden_testcases;

        redisContext* redis = redisConnect(redis_host_.c_str(), redis_port_);
        if (!redis || redis->err) {
            if (redis) redisFree(redis);
            return {false, 500, "Failed to connect to Redis queue", nullptr, nullptr};
        }

        std::string job_json = job.to_json().dump();
        redisReply* lpush = (redisReply*)redisCommand(redis, "LPUSH %s %s", "judge_queue", job_json.c_str());
        if (lpush) freeReplyObject(lpush);

        // Wait for worker result (up to 20 seconds)
        std::string result_key = "job_result:" + submission_id;
        std::string result_str;
        for (int i = 0; i < 40; ++i) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            redisReply* get_res = (redisReply*)redisCommand(redis, "GET %s", result_key.c_str());
            if (get_res && get_res->type == REDIS_REPLY_STRING) {
                result_str = get_res->str;
                freeReplyObject(get_res);
                break;
            }
            if (get_res) freeReplyObject(get_res);
        }
        redisFree(redis);

        json submission_data;
        std::string status = "Pending";
        bool accepted = false;

        {
            auto conn_guard = db_pool_.acquire();
            pqxx::work fetch_txn(conn_guard.get());

            auto s_rows = fetch_txn.exec_params(
                "SELECT id, \"userId\" AS user_id, \"problemId\" AS problem_id, status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage, \"createdAt\"::text AS created_at "
                "FROM \"Submission\" WHERE id = $1",
                submission_id
            );

            auto tc_rows = fetch_txn.exec_params(
                "SELECT \"testCase\" AS testcase, passed, stdout, \"expectedOutput\" AS expected_output, status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage "
                "FROM \"TestCaseResult\" WHERE \"submissionId\" = $1 ORDER BY \"testCase\"::int ASC",
                submission_id
            );

            json testcases_arr = json::array();
            for (const auto& r : tc_rows) {
                testcases_arr.push_back({
                    {"testCase", r["testcase"].as<std::string>()},
                    {"passed", r["passed"].as<bool>()},
                    {"stdout", r["stdout"].is_null() ? nullptr : json(r["stdout"].as<std::string>())},
                    {"expectedOutput", r["expected_output"].is_null() ? nullptr : json(r["expected_output"].as<std::string>())},
                    {"status", r["status"].as<std::string>()},
                    {"timeTaken", r["time_taken"].is_null() ? nullptr : json(r["time_taken"].as<std::string>())},
                    {"memoryUsage", r["memory_usage"].is_null() ? nullptr : json(r["memory_usage"].as<std::string>())}
                });
            }

            status = s_rows.empty() ? "Pending" : s_rows[0]["status"].as<std::string>();
            accepted = (status == "Accepted");

            // Update contest standings if solved inside a contest
            if (accepted && !contest_code.empty()) {
                try {
                    auto c_rows = fetch_txn.exec_params(
                        "SELECT standings, \"endsAt\"::text AS ends_at, \"problemPoints\" AS problem_points "
                        "FROM \"ContestRoom\" WHERE code = $1",
                        contest_code
                    );
                    if (!c_rows.empty()) {
                        auto standings_json = json::parse(c_rows[0]["standings"].as<std::string>());
                        auto points_json = json::parse(c_rows[0]["problem_points"].as<std::string>());

                        int pts = 100;
                        if (points_json.contains(problem_id)) {
                            pts = points_json[problem_id].get<int>();
                        } else if (problem_difficulty == "MEDIUM") {
                            pts = 200;
                        } else if (problem_difficulty == "HARD") {
                            pts = 300;
                        }

                        if (!standings_json.contains(user_id)) {
                            standings_json[user_id] = {
                                {"score", 0},
                                {"solvedProblemIds", json::array()},
                                {"lastAcceptedAt", nullptr}
                            };
                        }

                        auto& user_standing = standings_json[user_id];
                        auto& solved_pids = user_standing["solvedProblemIds"];
                        bool already_solved = false;
                        for (const auto& p : solved_pids) {
                            if (p == problem_id) { already_solved = true; break; }
                        }

                        if (!already_solved) {
                            solved_pids.push_back(problem_id);
                            int cur_score = user_standing.value("score", 0);
                            user_standing["score"] = cur_score + pts;

                            auto now = std::chrono::system_clock::now();
                            auto in_time_t = std::chrono::system_clock::to_time_t(now);
                            char time_buf[64];
                            std::strftime(time_buf, sizeof(time_buf), "%Y-%m-%dT%H:%M:%SZ", std::gmtime(&in_time_t));
                            user_standing["lastAcceptedAt"] = std::string(time_buf);

                            fetch_txn.exec_params("UPDATE \"ContestRoom\" SET standings = $1 WHERE code = $2", standings_json.dump(), contest_code);
                        }
                    }
                } catch (const std::exception& e) {
                    std::cerr << "[ExecutionService] Error updating contest standing: " << e.what() << std::endl;
                }
            }
            fetch_txn.commit();

            std::string time_taken_val = (!s_rows.empty() && !s_rows[0]["time_taken"].is_null()) ? s_rows[0]["time_taken"].as<std::string>() : "";
            std::string mem_val = (!s_rows.empty() && !s_rows[0]["memory_usage"].is_null()) ? s_rows[0]["memory_usage"].as<std::string>() : "";

            submission_data = {
                {"id", submission_id},
                {"userId", user_id},
                {"problemId", problem_id},
                {"status", status},
                {"timeTaken", time_taken_val.empty() ? nullptr : json(time_taken_val)},
                {"memoryUsage", mem_val.empty() ? nullptr : json(mem_val)},
                {"testcases", testcases_arr}
            };
        }

        json exec_results = json::array();
        if (!result_str.empty()) {
            auto r_parsed = json::parse(result_str);
            exec_results = r_parsed.value("results", json::array());
        }

        json exec_data = {
            {"language", "C++ (GCC 13)"},
            {"allPassed", accepted},
            {"results", exec_results}
        };

        return {true, 201, accepted ? "Submission accepted" : "Submission evaluated", submission_data, exec_data};
    }

    json get_submission_by_id(const std::string& submission_id) {
        auto conn_guard = db_pool_.acquire();
        return SubmissionRepository::get_submission_by_id(conn_guard.get(), submission_id);
    }

    json get_user_submissions_for_problem(const std::string& user_id, const std::string& problem_id) {
        auto conn_guard = db_pool_.acquire();
        return SubmissionRepository::get_user_submissions_for_problem(conn_guard.get(), user_id, problem_id);
    }

private:
    DbConnectionPool& db_pool_;
    std::string redis_host_;
    int redis_port_;
};

} // namespace campuslab

#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <chrono>
#include <filesystem>
#include <json.hpp>
#include <pqxx/pqxx>
#include <hiredis/hiredis.h>
#include "types.hpp"
#include "../../judge/src/config/worker_config.hpp"
#include "../../judge/src/sandbox/isolate.hpp"
#include "../../judge/src/compiler/compiler.hpp"
#include "../../judge/src/storage/db_client.hpp"
#include "../../judge/src/queue/redis_consumer.hpp"
#include "../../judge/src/judge_worker.hpp"

using json = nlohmann::json;
using namespace campuslab;
namespace fs = std::filesystem;

#define TEST_ASSERT(cond, msg) \
    do { \
        if (!(cond)) { \
            std::cerr << "[-] FAILED: " << msg << " (" << #cond << ") at line " << __LINE__ << std::endl; \
            exit(1); \
        } else { \
            std::cout << "[+] PASSED: " << msg << std::endl; \
        } \
    } while(0)

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << "   Campus Lab - Judge Worker Lifecycle & Engine Tests     " << std::endl;
    std::cout << "==========================================================" << std::endl;

    WorkerConfig cfg = WorkerConfig::load_from_env();
    JudgeWorker worker(cfg);

    // Fetch valid seed User and Problem for SUBMIT mode tests
    std::string user_id, problem_id;
    {
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto u_res = txn.exec("SELECT id FROM \"User\" LIMIT 1");
        auto p_res = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
        TEST_ASSERT(!u_res.empty(), "Seed user exists");
        TEST_ASSERT(!p_res.empty(), "Seed problem exists");
        user_id = u_res[0][0].as<std::string>();
        problem_id = p_res[0][0].as<std::string>();
    }

    auto create_test_submission = [&](const std::string& sub_id) {
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
            "VALUES ($1, $2, $3, $4, 'C++ (GCC 13)', 'Pending', NOW(), NOW())",
            sub_id, user_id, problem_id, json("// worker test code").dump()
        );
        txn.commit();
    };

    // -------------------------------------------------------------
    // 1. Worker Lifecycle & State
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing JudgeWorker Lifecycle & State Control..." << std::endl;
    {
        TEST_ASSERT(worker.is_running(), "JudgeWorker starts in running state");
        JudgeWorker temp_worker(cfg);
        TEST_ASSERT(temp_worker.is_running(), "Temp worker is running");
        temp_worker.stop();
        TEST_ASSERT(!temp_worker.is_running(), "Temp worker stopped cleanly");
    }

    // -------------------------------------------------------------
    // 2. Malformed Payloads & Negative Job Inputs
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing Malformed Payloads & Missing Fields..." << std::endl;
    {
        // 2a. Completely invalid JSON syntax
        worker.process_job("{{{ not valid json");
        TEST_ASSERT(true, "Worker safely absorbed malformed JSON syntax without crash");

        // 2b. Empty JSON object
        worker.process_job("{}");
        TEST_ASSERT(true, "Worker safely absorbed empty JSON object without crash");

        // 2c. Valid JSON but wrong data types
        worker.process_job("{\"submissionId\": 12345, \"type\": true, \"testcases\": \"invalid\"}");
        TEST_ASSERT(true, "Worker safely absorbed invalid field types without crash");
    }

    // -------------------------------------------------------------
    // 3. Compilation Error Job Handling (SUBMIT mode)
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing Compilation Error Handling in Worker..." << std::endl;
    {
        std::string sub_ce = "worker_ce_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_ce);

        JudgeJob job;
        job.submission_id = sub_ce;
        job.user_id = user_id;
        job.problem_id = problem_id;
        job.type = "SUBMIT";
        job.source_code = "int main() { syntax error here }";
        job.testcases.push_back({"1", "1"});

        worker.process_job(job.to_json().dump());

        // Verify Redis cache
        redisContext* r_ctx = redisConnect(cfg.redis_host.c_str(), cfg.redis_port);
        redisReply* rep = (redisReply*)redisCommand(r_ctx, "GET job_result:%s", sub_ce.c_str());
        TEST_ASSERT(rep && rep->type == REDIS_REPLY_STRING, "Cached result found in Redis for CE");
        auto cache_j = json::parse(rep->str);
        TEST_ASSERT(cache_j["allPassed"] == false, "allPassed is false in Redis cache");
        TEST_ASSERT(cache_j["results"].size() == 1, "Results array contains 1 error entry");
        TEST_ASSERT(cache_j["results"][0]["status"] == "Compilation Error", "Cached result status is Compilation Error");
        freeReplyObject(rep);
        redisFree(r_ctx);

        // Verify DB update
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto s_res = txn.exec_params("SELECT status, \"compilationOutput\" AS comp_out FROM \"Submission\" WHERE id = $1", sub_ce);
        TEST_ASSERT(!s_res.empty(), "Submission found in DB");
        TEST_ASSERT(s_res[0]["status"].as<std::string>() == "Compilation Error", "DB submission status is Compilation Error");
        TEST_ASSERT(!s_res[0]["comp_out"].is_null(), "DB compilationOutput is populated");

        // Verify compilation work directory cleanup
        std::string work_dir = "/tmp/campuslab_judge/" + sub_ce;
        TEST_ASSERT(!fs::exists(work_dir), "Temporary compilation directory was cleaned up");
    }

    // -------------------------------------------------------------
    // 4. SUBMIT Mode Short-Circuiting on First Failure
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing SUBMIT Mode Short-Circuiting..." << std::endl;
    {
        std::string sub_sc = "worker_sc_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_sc);

        JudgeJob job;
        job.submission_id = sub_sc;
        job.user_id = user_id;
        job.problem_id = problem_id;
        job.type = "SUBMIT";
        // Program outputs "42" for all inputs
        job.source_code = R"(
        #include <iostream>
        int main() {
            std::cout << 42 << std::endl;
            return 0;
        }
        )";
        // Testcase 0 expects "100" (FAIL)
        // Testcase 1 expects "42"  (WOULD PASS)
        // Testcase 2 expects "42"  (WOULD PASS)
        job.testcases.push_back({"any_input_0", "100"});
        job.testcases.push_back({"any_input_1", "42"});
        job.testcases.push_back({"any_input_2", "42"});

        worker.process_job(job.to_json().dump());

        // Verify DB contains ONLY 1 TestCaseResult because it short-circuited
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto s_res = txn.exec_params("SELECT status FROM \"Submission\" WHERE id = $1", sub_sc);
        TEST_ASSERT(s_res[0]["status"].as<std::string>() == "Wrong Answer", "Verdict is Wrong Answer");

        auto tc_res = txn.exec_params("SELECT count(*) FROM \"TestCaseResult\" WHERE \"submissionId\" = $1", sub_sc);
        TEST_ASSERT(tc_res[0][0].as<int>() == 1, "Short-circuiting verified: evaluated only 1 testcase out of 3");

        // Verify work dir deleted
        std::string work_dir = "/tmp/campuslab_judge/" + sub_sc;
        TEST_ASSERT(!fs::exists(work_dir), "Compilation directory cleaned up after SUBMIT");
    }

    // -------------------------------------------------------------
    // 5. RUN Mode Non-Short-Circuiting (All Testcases Evaluated)
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing RUN Mode Full Evaluation (No Short-Circuit)..." << std::endl;
    {
        std::string sub_run = "worker_run_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());

        JudgeJob job;
        job.submission_id = sub_run;
        job.type = "RUN";
        job.source_code = R"(
        #include <iostream>
        int main() {
            int a, b;
            if (std::cin >> a >> b) {
                std::cout << (a + b) << std::endl;
            }
            return 0;
        }
        )";
        job.testcases.push_back({"2 3", "999"}); // FAILS
        job.testcases.push_back({"10 20", "30"}); // PASSES
        job.testcases.push_back({"5 -5", "0"});   // PASSES

        worker.process_job(job.to_json().dump());

        // In RUN mode, DB should NOT be touched, but Redis should have all 3 results
        redisContext* r_ctx = redisConnect(cfg.redis_host.c_str(), cfg.redis_port);
        redisReply* rep = (redisReply*)redisCommand(r_ctx, "GET job_result:%s", sub_run.c_str());
        TEST_ASSERT(rep && rep->type == REDIS_REPLY_STRING, "Cached result exists in Redis for RUN job");
        auto run_j = json::parse(rep->str);
        freeReplyObject(rep);
        redisFree(r_ctx);

        TEST_ASSERT(run_j["allPassed"] == false, "allPassed is false due to TC0");
        TEST_ASSERT(run_j["results"].size() == 3, "RUN mode evaluated all 3 testcases without short-circuiting");
        TEST_ASSERT(run_j["results"][0]["passed"] == false, "TC0 is failed");
        TEST_ASSERT(run_j["results"][1]["passed"] == true, "TC1 is passed");
        TEST_ASSERT(run_j["results"][2]["passed"] == true, "TC2 is passed");
    }

    // -------------------------------------------------------------
    // 6. SUBMIT Mode All Accepted
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing SUBMIT Mode All Testcases Accepted..." << std::endl;
    {
        std::string sub_all_ac = "worker_all_ac_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_all_ac);

        JudgeJob job;
        job.submission_id = sub_all_ac;
        job.user_id = user_id;
        job.problem_id = problem_id;
        job.type = "SUBMIT";
        job.source_code = R"(
        #include <iostream>
        int main() {
            int x;
            while (std::cin >> x) {
                std::cout << (x * x) << std::endl;
            }
            return 0;
        }
        )";
        job.testcases.push_back({"3", "9"});
        job.testcases.push_back({"5", "25"});
        job.testcases.push_back({"12", "144"});

        worker.process_job(job.to_json().dump());

        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto s_res = txn.exec_params("SELECT status, \"timeTaken\" AS time_taken FROM \"Submission\" WHERE id = $1", sub_all_ac);
        TEST_ASSERT(s_res[0]["status"].as<std::string>() == "Accepted", "Status is Accepted");
        TEST_ASSERT(!s_res[0]["time_taken"].is_null(), "timeTaken recorded");

        auto tc_res = txn.exec_params("SELECT count(*) FROM \"TestCaseResult\" WHERE \"submissionId\" = $1", sub_all_ac);
        TEST_ASSERT(tc_res[0][0].as<int>() == 3, "All 3 testcases recorded in DB");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL JUDGE WORKER UNIT TESTS PASSED (100%)!              " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

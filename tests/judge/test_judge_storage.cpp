#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <chrono>
#include <json.hpp>
#include <pqxx/pqxx>
#include "types.hpp"
#include "../../judge/src/config/worker_config.hpp"
#include "../../judge/src/storage/db_client.hpp"

using json = nlohmann::json;
using namespace campuslab;

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
    std::cout << "   Campus Lab - Judge DB Storage Tests (JudgeDbClient)    " << std::endl;
    std::cout << "==========================================================" << std::endl;

    WorkerConfig cfg = WorkerConfig::load_from_env();
    JudgeDbClient db_client(cfg.db_url);

    // Fetch valid seed User and Problem
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

    // Helper lambda to create a test submission in DB
    auto create_test_submission = [&](const std::string& sub_id) {
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
            "VALUES ($1, $2, $3, $4, 'C++ (GCC 13)', 'Pending', NOW(), NOW())",
            sub_id, user_id, problem_id, json("// storage test code").dump()
        );
        txn.commit();
    };

    // -------------------------------------------------------------
    // 1. Connection Lifecycle
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing JudgeDbClient Connection Lifecycle..." << std::endl;
    {
        TEST_ASSERT(db_client.ensure_connected(), "JudgeDbClient connects to PostgreSQL");
    }

    // -------------------------------------------------------------
    // 2. Updating Submission to Accepted & TestCaseResult Persistence
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing Submission Update to Accepted..." << std::endl;
    {
        // Clear ProblemSolved for this user & problem first to test clean insertion
        {
            pqxx::connection conn(cfg.db_url);
            pqxx::work txn(conn);
            txn.exec_params("DELETE FROM \"ProblemSolved\" WHERE \"userId\" = $1 AND \"problemId\" = $2", user_id, problem_id);
            txn.commit();
        }

        std::string sub_id = "test_sub_ac_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_id);

        JudgeJob job;
        job.submission_id = sub_id;
        job.user_id = user_id;
        job.problem_id = problem_id;
        job.type = "SUBMIT";

        ExecutionResponse resp;
        resp.all_passed = true;

        ExecutionResultItem item1;
        item1.testcase = 0;
        item1.passed = true;
        item1.status = "Accepted";
        item1.time = "0.005s";
        item1.memory = "2.1 MB";
        item1.stdout_output = "Hello\n";
        item1.expected_output = "Hello\n";
        resp.results.push_back(item1);

        ExecutionResultItem item2;
        item2.testcase = 1;
        item2.passed = true;
        item2.status = "Accepted";
        item2.time = "0.008s";
        item2.memory = "2.4 MB";
        item2.stdout_output = "World\n";
        item2.expected_output = "World\n";
        resp.results.push_back(item2);

        bool success = db_client.update_submission(job, resp, "Accepted", "0.013s", "2.4 MB", "");
        TEST_ASSERT(success, "Update to Accepted returns true");

        // Verify DB rows
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);

        auto s_res = txn.exec_params("SELECT status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage, \"compilationOutput\" AS compilation_output FROM \"Submission\" WHERE id = $1", sub_id);
        TEST_ASSERT(!s_res.empty(), "Submission row retrieved");
        TEST_ASSERT(s_res[0]["status"].as<std::string>() == "Accepted", "Submission status updated to Accepted");
        TEST_ASSERT(s_res[0]["time_taken"].as<std::string>() == "0.013s", "timeTaken recorded accurately");
        TEST_ASSERT(s_res[0]["memory_usage"].as<std::string>() == "2.4 MB", "memoryUsage recorded accurately");
        TEST_ASSERT(s_res[0]["compilation_output"].is_null(), "compilationOutput is null for clean compilation");

        auto tc_res = txn.exec_params("SELECT \"testCase\", passed, stdout, status FROM \"TestCaseResult\" WHERE \"submissionId\" = $1 ORDER BY \"testCase\" ASC", sub_id);
        TEST_ASSERT(tc_res.size() == 2, "2 TestCaseResult rows inserted");
        TEST_ASSERT(tc_res[0]["passed"].as<bool>() == true, "TC1 passed is true");
        TEST_ASSERT(tc_res[0]["stdout"].as<std::string>() == "Hello\n", "TC1 stdout persisted");
        TEST_ASSERT(tc_res[1]["passed"].as<bool>() == true, "TC2 passed is true");
        TEST_ASSERT(tc_res[1]["stdout"].as<std::string>() == "World\n", "TC2 stdout persisted");

        auto ps_res = txn.exec_params("SELECT count(*) FROM \"ProblemSolved\" WHERE \"userId\" = $1 AND \"problemId\" = $2", user_id, problem_id);
        TEST_ASSERT(ps_res[0][0].as<int>() == 1, "ProblemSolved record created for Accepted submission");
    }

    // -------------------------------------------------------------
    // 3. Idempotent ProblemSolved Insertion on Duplicate Accepted
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing ProblemSolved ON CONFLICT Idempotency..." << std::endl;
    {
        std::string sub_id2 = "test_sub_ac2_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_id2);

        JudgeJob job2;
        job2.submission_id = sub_id2;
        job2.user_id = user_id;
        job2.problem_id = problem_id;
        job2.type = "SUBMIT";

        ExecutionResponse resp2;
        resp2.all_passed = true;

        bool success = db_client.update_submission(job2, resp2, "Accepted", "0.010s", "2.0 MB", "");
        TEST_ASSERT(success, "Second Accepted submission handled gracefully without constraint violation");

        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto ps_cnt = txn.exec_params("SELECT count(*) FROM \"ProblemSolved\" WHERE \"userId\" = $1 AND \"problemId\" = $2", user_id, problem_id);
        TEST_ASSERT(ps_cnt[0][0].as<int>() == 1, "ProblemSolved count remains exactly 1 (no duplicates)");
    }

    // -------------------------------------------------------------
    // 4. Compilation Error Persistence (No TestCases, Error Output Saved)
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing Compilation Error Persistence..." << std::endl;
    {
        std::string sub_ce = "test_sub_ce_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_ce);

        JudgeJob job_ce;
        job_ce.submission_id = sub_ce;
        job_ce.user_id = user_id;
        job_ce.problem_id = problem_id;
        job_ce.type = "SUBMIT";

        ExecutionResponse resp_ce;
        resp_ce.all_passed = false;

        std::string compile_err = "error: 'cout' was not declared in this scope\n    cout << 10;\n    ^~~~\n";
        bool success = db_client.update_submission(job_ce, resp_ce, "Compilation Error", "", "", compile_err);
        TEST_ASSERT(success, "Compilation Error update succeeded");

        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto s_res = txn.exec_params("SELECT status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage, \"compilationOutput\" AS compilation_output FROM \"Submission\" WHERE id = $1", sub_ce);
        TEST_ASSERT(!s_res.empty(), "Submission retrieved");
        TEST_ASSERT(s_res[0]["status"].as<std::string>() == "Compilation Error", "Status is Compilation Error");
        TEST_ASSERT(s_res[0]["time_taken"].is_null(), "timeTaken is null for Compilation Error");
        TEST_ASSERT(s_res[0]["memory_usage"].is_null(), "memoryUsage is null for Compilation Error");
        TEST_ASSERT(s_res[0]["compilation_output"].as<std::string>() == compile_err, "compilationOutput stored compiler diagnostics");

        auto tc_res = txn.exec_params("SELECT count(*) FROM \"TestCaseResult\" WHERE \"submissionId\" = $1", sub_ce);
        TEST_ASSERT(tc_res[0][0].as<int>() == 0, "0 TestCaseResult rows inserted for Compilation Error");
    }

    // -------------------------------------------------------------
    // 5. Wrong Answer & Null Stdout Handling
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing Wrong Answer with Empty Stdout (SQL NULL)..." << std::endl;
    {
        std::string sub_wa = "test_sub_wa_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        create_test_submission(sub_wa);

        JudgeJob job_wa;
        job_wa.submission_id = sub_wa;
        job_wa.user_id = user_id;
        job_wa.problem_id = problem_id;
        job_wa.type = "SUBMIT";

        ExecutionResponse resp_wa;
        resp_wa.all_passed = false;

        ExecutionResultItem item_wa;
        item_wa.testcase = 0;
        item_wa.passed = false;
        item_wa.status = "Wrong Answer";
        item_wa.time = "0.010s";
        item_wa.memory = "2.0 MB";
        item_wa.stdout_output = ""; // Empty string should map to SQL NULL
        item_wa.expected_output = "Expected Result\n";
        item_wa.stderr_output = "";
        resp_wa.results.push_back(item_wa);

        bool success = db_client.update_submission(job_wa, resp_wa, "Wrong Answer", "0.010s", "2.0 MB", "");
        TEST_ASSERT(success, "Wrong Answer update succeeded");

        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto tc_res = txn.exec_params("SELECT passed, stdout, \"expectedOutput\" AS expected_output, status FROM \"TestCaseResult\" WHERE \"submissionId\" = $1", sub_wa);
        TEST_ASSERT(!tc_res.empty(), "TestCaseResult inserted");
        TEST_ASSERT(tc_res[0]["passed"].as<bool>() == false, "TC passed is false");
        TEST_ASSERT(tc_res[0]["stdout"].is_null(), "Empty stdout inserted as SQL NULL");
        TEST_ASSERT(tc_res[0]["expected_output"].as<std::string>() == "Expected Result\n", "expectedOutput intact");
        TEST_ASSERT(tc_res[0]["status"].as<std::string>() == "Wrong Answer", "status is Wrong Answer");
    }

    // -------------------------------------------------------------
    // 6. Non-Existent Submission ID Safety
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing Non-Existent Submission ID Safety..." << std::endl;
    {
        JudgeJob ghost_job;
        ghost_job.submission_id = "00000000-0000-0000-0000-000000000000";
        ExecutionResponse empty_resp;
        bool ok = db_client.update_submission(ghost_job, empty_resp, "Accepted", "0.01s", "1.0 MB", "");
        TEST_ASSERT(ok, "Updating non-existent submission commits gracefully without throwing");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL JUDGE STORAGE UNIT TESTS PASSED (100%)!             " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

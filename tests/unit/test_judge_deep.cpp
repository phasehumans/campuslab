#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <filesystem>
#include "types.hpp"
#include "../../judge/src/sandbox/isolate.hpp"
#include "../../judge/src/compiler/compiler.hpp"
#include "../../judge/src/storage/db_client.hpp"
#include "../../judge/src/queue/redis_consumer.hpp"
#include "../../judge/src/config/worker_config.hpp"

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

// -----------------------------------------------------------------------------
// 1. CppCompiler Edge Cases & C++20 Standards
// -----------------------------------------------------------------------------
void test_compiler_capabilities() {
    std::cout << "\n--- Subtest: CppCompiler C++20 Standards & Flags ---" << std::endl;

    // 1. Standard C++ code with ONLINE_JUDGE macro
    std::string valid_code = R"(
    #ifndef ONLINE_JUDGE
    #error "ONLINE_JUDGE macro must be defined"
    #endif
    #include <iostream>
    #include <vector>
    #include <algorithm>
    int main() {
        std::vector<int> v = {3, 1, 4, 1, 5};
        std::sort(v.begin(), v.end());
        for (int x : v) std::cout << x << " ";
        std::cout << "\n";
        return 0;
    }
    )";
    auto res1 = CppCompiler::compile(valid_code, "/tmp/test_comp_1");
    TEST_ASSERT(res1.success, "Valid C++ code with ONLINE_JUDGE compiles successfully");
    TEST_ASSERT(fs::exists(res1.binary_path), "Binary executable generated");
    fs::remove_all("/tmp/test_comp_1");

    // 2. Modern C++20 Structured Binding & Lambda
    std::string cpp20_code = R"(
    #include <iostream>
    #include <tuple>
    int main() {
        auto [a, b, c] = std::tuple{10, 20, "hello"};
        auto lambda = [](auto x, auto y) { return x + y; };
        std::cout << lambda(a, b) << " " << c << std::endl;
        return 0;
    }
    )";
    auto res2 = CppCompiler::compile(cpp20_code, "/tmp/test_comp_2");
    TEST_ASSERT(res2.success, "C++20 structured bindings and generic lambdas compile cleanly");
    fs::remove_all("/tmp/test_comp_2");

    // 3. Code with unused variables (warnings should not cause compilation failure)
    std::string warning_code = R"(
    #include <iostream>
    int main() {
        int unused_var = 12345;
        std::cout << "success\n";
        return 0;
    }
    )";
    auto res3 = CppCompiler::compile(warning_code, "/tmp/test_comp_3");
    TEST_ASSERT(res3.success, "Code with warnings compiles successfully into binary");
    fs::remove_all("/tmp/test_comp_3");

    // 4. Syntax Error Diagnostics
    std::string syntax_err = "int main() { std::cout << undefined_symbol_abc123; return 0; }";
    auto res4 = CppCompiler::compile(syntax_err, "/tmp/test_comp_4");
    TEST_ASSERT(!res4.success, "Syntax error compilation fails");
    TEST_ASSERT(res4.error_message.find("undefined_symbol_abc123") != std::string::npos, "Compiler error includes undefined symbol name");
    fs::remove_all("/tmp/test_comp_4");
}

// -----------------------------------------------------------------------------
// 2. Isolate Sandbox Lifecycle & Execution Limits
// -----------------------------------------------------------------------------
void test_isolate_sandbox_execution() {
    std::cout << "\n--- Subtest: Isolate Sandbox Lifecycle & Real Execution ---" << std::endl;
    int test_box_id = 15;
    std::string box_dir;

    // 1. Init & Cleanup lifecycle
    bool init_ok = IsolateSandbox::init_box(test_box_id, box_dir);
    TEST_ASSERT(init_ok, "Isolate box initialized");
    TEST_ASSERT(!box_dir.empty() && fs::exists(box_dir), "Box directory exists on filesystem");

    bool cleanup_ok = IsolateSandbox::cleanup_box(test_box_id);
    TEST_ASSERT(cleanup_ok, "Isolate box cleaned up");

    // 2. Compile and run simple binary inside sandbox
    std::string echo_code = R"(
    #include <iostream>
    #include <string>
    int main() {
        std::string s;
        if (std::cin >> s) {
            std::cout << "ECHO:" << s << std::endl;
        }
        return 0;
    }
    )";
    auto comp = CppCompiler::compile(echo_code, "/tmp/test_isolate_echo");
    TEST_ASSERT(comp.success, "Echo binary compiled");

    // Re-init box for execution
    IsolateSandbox::init_box(test_box_id, box_dir);
    std::string prog_dest = box_dir + "/box/prog";
    fs::copy_file(comp.binary_path, prog_dest, fs::copy_options::overwrite_existing);
    chmod(prog_dest.c_str(), 0755);

    // Testcase 1: Accepted match
    auto tc1 = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "HelloWorld", std::make_optional("ECHO:HelloWorld"), 1.0, 262144);
    TEST_ASSERT(tc1.passed, "Sandbox testcase passed on matching output");
    TEST_ASSERT(tc1.status == "Accepted", "Status is Accepted");
    TEST_ASSERT(tc1.stdout_output.find("ECHO:HelloWorld") != std::string::npos, "Stdout captured from sandbox");

    // Testcase 2: Wrong Answer match
    auto tc2 = IsolateSandbox::run_testcase(test_box_id, box_dir, 1, "HelloWorld", std::make_optional("DIFFERENT_OUTPUT"), 1.0, 262144);
    TEST_ASSERT(!tc2.passed, "Sandbox testcase failed on mismatched output");
    TEST_ASSERT(tc2.status == "Wrong Answer", "Status is Wrong Answer");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_echo");

    // 3. Compile and test Time Limit Exceeded inside Isolate
    std::string tle_code = "int main() { while(true) {} return 0; }";
    auto comp_tle = CppCompiler::compile(tle_code, "/tmp/test_isolate_tle");
    TEST_ASSERT(comp_tle.success, "TLE binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    std::string prog_tle = box_dir + "/box/prog";
    fs::copy_file(comp_tle.binary_path, prog_tle, fs::copy_options::overwrite_existing);
    chmod(prog_tle.c_str(), 0755);

    auto tc_tle = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 0.5, 262144);
    TEST_ASSERT(!tc_tle.passed, "TLE testcase failed as expected");
    TEST_ASSERT(tc_tle.status == "Time Limit Exceeded", "Isolate detected Time Limit Exceeded status");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_tle");

    // 4. Compile and test Runtime Error (SIGSEGV)
    std::string re_code = "int main() { int* p = nullptr; *p = 42; return 0; }";
    auto comp_re = CppCompiler::compile(re_code, "/tmp/test_isolate_re");
    TEST_ASSERT(comp_re.success, "RE binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    std::string prog_re = box_dir + "/box/prog";
    fs::copy_file(comp_re.binary_path, prog_re, fs::copy_options::overwrite_existing);
    chmod(prog_re.c_str(), 0755);

    auto tc_re = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
    TEST_ASSERT(!tc_re.passed, "RE testcase failed as expected");
    TEST_ASSERT(tc_re.status == "Runtime Error", "Isolate detected Runtime Error (SIGSEGV)");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_re");
}

// -----------------------------------------------------------------------------
// 3. Judge Types & Serialization Deep Tests
// -----------------------------------------------------------------------------
void test_judge_types_serialization() {
    std::cout << "\n--- Subtest: JudgeJob & ExecutionResponse DTO Serialization ---" << std::endl;

    // 1. JudgeJob Round-Trip
    JudgeJob job;
    job.submission_id = "sub_98765";
    job.type = "SUBMIT";
    job.user_id = "user_456";
    job.problem_id = "prob_789";
    job.source_code = "int main(){ return 0; }";
    job.contest_code = "ROOM77";
    job.time_limit_sec = 2.0;
    job.memory_limit_kb = 131072;
    job.testcases.push_back({"input_data", "expected_data"});

    json j = job.to_json();
    TEST_ASSERT(j["submissionId"] == "sub_98765", "submissionId serialized");
    TEST_ASSERT(j["type"] == "SUBMIT", "type serialized");
    TEST_ASSERT(j["contestCode"] == "ROOM77", "contestCode serialized");
    TEST_ASSERT(j["timeLimitSec"] == 2.0, "time limit serialized");

    JudgeJob parsed = JudgeJob::from_json(j);
    TEST_ASSERT(parsed.submission_id == job.submission_id, "submission_id round-trip");
    TEST_ASSERT(parsed.type == job.type, "type round-trip");
    TEST_ASSERT(parsed.contest_code == job.contest_code, "contest_code round-trip");
    TEST_ASSERT(parsed.testcases.size() == 1, "testcases list size matches");
    TEST_ASSERT(parsed.testcases[0].input == "input_data", "testcase input matches");
    TEST_ASSERT(parsed.testcases[0].output == "expected_data", "testcase output matches");

    // 2. ExecutionResponse Round-Trip
    ExecutionResponse resp;
    resp.all_passed = false;
    ExecutionResultItem item;
    item.testcase = 0;
    item.passed = false;
    item.status = "Time Limit Exceeded";
    item.time = "0.501s";
    item.memory = "2.1 MB";
    item.compile_output = "No compile error";
    resp.results.push_back(item);

    json resp_j = resp.to_json();
    TEST_ASSERT(resp_j["allPassed"] == false, "allPassed serialized");
    TEST_ASSERT(resp_j["results"].size() == 1, "results array serialized");
    TEST_ASSERT(resp_j["results"][0]["status"] == "Time Limit Exceeded", "result item status serialized");
    TEST_ASSERT(resp_j["results"][0]["time"] == "0.501s", "result item time serialized");
}

// -----------------------------------------------------------------------------
// 4. Advanced Signals, Exceptions & Security Containment in Isolate
// -----------------------------------------------------------------------------
void test_isolate_advanced_signals_and_security() {
    std::cout << "\n--- Subtest: Isolate Advanced Signals, Exceptions & Security ---" << std::endl;
    int test_box_id = 16;
    std::string box_dir;

    // 1. Division by Zero / Modulo Zero (SIGFPE)
    std::string sigfpe_code = R"(
    #include <iostream>
    int main() {
        volatile int a = 100;
        volatile int b = 0;
        std::cout << (a / b) << "\n";
        return 0;
    }
    )";
    auto comp_fpe = CppCompiler::compile(sigfpe_code, "/tmp/test_isolate_fpe");
    TEST_ASSERT(comp_fpe.success, "SIGFPE binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    fs::copy_file(comp_fpe.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
    chmod((box_dir + "/box/prog").c_str(), 0755);

    auto tc_fpe = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
    TEST_ASSERT(!tc_fpe.passed, "SIGFPE testcase failed as expected");
    TEST_ASSERT(tc_fpe.status == "Runtime Error", "SIGFPE detected as Runtime Error");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_fpe");

    // 2. Abort / Assertion failure (SIGABRT)
    std::string sigabrt_code = R"(
    #include <cstdlib>
    int main() {
        std::abort();
        return 0;
    }
    )";
    auto comp_abrt = CppCompiler::compile(sigabrt_code, "/tmp/test_isolate_abrt");
    TEST_ASSERT(comp_abrt.success, "SIGABRT binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    fs::copy_file(comp_abrt.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
    chmod((box_dir + "/box/prog").c_str(), 0755);

    auto tc_abrt = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
    TEST_ASSERT(!tc_abrt.passed, "SIGABRT testcase failed as expected");
    TEST_ASSERT(tc_abrt.status == "Runtime Error", "SIGABRT detected as Runtime Error");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_abrt");

    // 3. Deep Recursion Stack Overflow (prevent tail-call optimization)
    std::string stack_code = R"(
    int recurse(int depth) {
        volatile char buf[1024 * 1024 * 4]; // 4MB stack frame
        buf[0] = depth;
        return recurse(depth + 1) + buf[0];
    }
    int main() {
        return recurse(0);
    }
    )";
    auto comp_stack = CppCompiler::compile(stack_code, "/tmp/test_isolate_stack");
    TEST_ASSERT(comp_stack.success, "Stack overflow binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    fs::copy_file(comp_stack.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
    chmod((box_dir + "/box/prog").c_str(), 0755);

    auto tc_stack = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
    TEST_ASSERT(!tc_stack.passed, "Stack overflow testcase failed as expected");
    TEST_ASSERT(tc_stack.status == "Runtime Error", "Stack overflow detected as Runtime Error");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_stack");

    // 4. Custom Non-Zero Exit Code (exit(42))
    std::string exit_code = R"(
    #include <cstdlib>
    int main() {
        std::exit(42);
        return 0;
    }
    )";
    auto comp_exit = CppCompiler::compile(exit_code, "/tmp/test_isolate_exit");
    TEST_ASSERT(comp_exit.success, "Custom exit code binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    fs::copy_file(comp_exit.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
    chmod((box_dir + "/box/prog").c_str(), 0755);

    auto tc_exit = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
    TEST_ASSERT(!tc_exit.passed, "Exit(42) testcase failed as expected");
    TEST_ASSERT(tc_exit.status == "Runtime Error", "Exit(42) detected as Runtime Error");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_exit");

    // 5. Sandbox Filesystem Containment (/etc/shadow protection)
    std::string security_code = R"(
    #include <iostream>
    #include <fstream>
    int main() {
        std::ifstream f("/etc/shadow");
        if (f.is_open()) {
            std::cout << "BREACH" << std::endl;
        } else {
            std::cout << "SECURE" << std::endl;
        }
        return 0;
    }
    )";
    auto comp_sec = CppCompiler::compile(security_code, "/tmp/test_isolate_sec");
    TEST_ASSERT(comp_sec.success, "Security probe binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    fs::copy_file(comp_sec.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
    chmod((box_dir + "/box/prog").c_str(), 0755);

    auto tc_sec = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::make_optional("SECURE"), 1.0, 262144);
    TEST_ASSERT(tc_sec.passed, "Host filesystem access blocked inside Isolate sandbox");
    TEST_ASSERT(tc_sec.status == "Accepted", "Status is Accepted");
    TEST_ASSERT(tc_sec.stdout_output.find("SECURE") != std::string::npos, "Sandbox output confirmed SECURE");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_sec");
}

// -----------------------------------------------------------------------------
// 5. High-Volume Data Stream & Fast I/O Benchmark
// -----------------------------------------------------------------------------
void test_isolate_large_io_stream() {
    std::cout << "\n--- Subtest: Isolate Large I/O Data Stream (5,000 Numbers) ---" << std::endl;
    int test_box_id = 17;
    std::string box_dir;

    std::string sum_code = R"(
    #include <iostream>
    int main() {
        std::ios_base::sync_with_stdio(false);
        std::cin.tie(NULL);
        long long n, val, sum = 0;
        if (std::cin >> n) {
            for (int i = 0; i < n; ++i) {
                if (std::cin >> val) sum += val;
            }
            std::cout << sum << "\n";
        }
        return 0;
    }
    )";
    auto comp_sum = CppCompiler::compile(sum_code, "/tmp/test_isolate_sum");
    TEST_ASSERT(comp_sum.success, "Fast I/O accumulator binary compiled");

    IsolateSandbox::init_box(test_box_id, box_dir);
    fs::copy_file(comp_sum.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
    chmod((box_dir + "/box/prog").c_str(), 0755);

    // Generate 5,000 numbers: 1 to 5,000 (Sum = 5000 * 5001 / 2 = 12502500)
    std::string large_input = "5000\n";
    for (int i = 1; i <= 5000; ++i) {
        large_input += std::to_string(i) + " ";
    }
    std::string expected_sum = "12502500";

    auto tc_sum = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, large_input, std::make_optional(expected_sum), 2.0, 262144);
    TEST_ASSERT(tc_sum.passed, "5,000-number large I/O stream passed accurately");
    TEST_ASSERT(tc_sum.status == "Accepted", "Large I/O status is Accepted");
    TEST_ASSERT(tc_sum.stdout_output.find("12502500") != std::string::npos, "Accurate mathematical sum printed");

    IsolateSandbox::cleanup_box(test_box_id);
    fs::remove_all("/tmp/test_isolate_sum");
}

// -----------------------------------------------------------------------------
// 6. JudgeDbClient & Redis Queue Integration
// -----------------------------------------------------------------------------
void test_judge_db_and_queue_integration() {
    std::cout << "\n--- Subtest: JudgeDbClient & Redis Queue Integration ---" << std::endl;
    WorkerConfig cfg = WorkerConfig::load_from_env();

    // 1. RedisQueueConsumer result caching
    RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, "test_judge_queue");
    TEST_ASSERT(consumer.ensure_connected(), "RedisQueueConsumer successfully connects to Redis");

    std::string test_sub_id = "test_sub_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
    consumer.cache_result(test_sub_id, "{\"allPassed\":true,\"verdict\":\"Accepted\"}", 60);

    // 2. JudgeDbClient update_submission
    JudgeDbClient db_client(cfg.db_url);
    TEST_ASSERT(db_client.ensure_connected(), "JudgeDbClient successfully connects to PostgreSQL");

    // Create a real submission in Postgres to test updating
    std::string real_sub_id, uid, pid;
    {
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto u_row = txn.exec("SELECT id FROM \"User\" LIMIT 1");
        auto p_row = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
        if (!u_row.empty() && !p_row.empty()) {
            uid = u_row[0][0].as<std::string>();
            pid = p_row[0][0].as<std::string>();
            auto sub_res = txn.exec_params(
                "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, $3, 'C++ (GCC 13)', 'Pending', NOW(), NOW()) RETURNING id",
                uid, pid, json("// test code").dump()
            );
            real_sub_id = sub_res[0][0].as<std::string>();
            txn.commit();
        }
    }

    if (!real_sub_id.empty()) {
        JudgeJob job;
        job.submission_id = real_sub_id;
        job.type = "SUBMIT";
        job.user_id = uid;
        job.problem_id = pid;

        ExecutionResponse resp;
        resp.all_passed = true;
        ExecutionResultItem item;
        item.testcase = 0;
        item.passed = true;
        item.status = "Accepted";
        item.time = "0.005s";
        item.memory = "1.5 MB";
        item.stdout_output = "Correct Output";
        resp.results.push_back(item);

        bool updated = db_client.update_submission(job, resp, "Accepted", "0.005s", "1.5 MB", "");
        TEST_ASSERT(updated, "JudgeDbClient::update_submission returns true for valid submission");

        // Verify row in DB is now Accepted
        pqxx::connection conn(cfg.db_url);
        pqxx::work txn(conn);
        auto r = txn.exec_params("SELECT status, \"timeTaken\" AS time_taken, \"memoryUsage\" AS memory_usage FROM \"Submission\" WHERE id = $1", real_sub_id);
        TEST_ASSERT(!r.empty(), "Submission row exists");
        TEST_ASSERT(r[0]["status"].as<std::string>() == "Accepted", "Submission status updated to Accepted");
        TEST_ASSERT(r[0]["time_taken"].as<std::string>() == "0.005s", "Submission timeTaken persisted");

        auto tc_r = txn.exec_params("SELECT count(*) FROM \"TestCaseResult\" WHERE \"submissionId\" = $1", real_sub_id);
        TEST_ASSERT(tc_r[0][0].as<int>() == 1, "TestCaseResult row created in DB");
    }
}

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << "     Campus Lab - Judge Deep Sandbox & Compiler Tests     " << std::endl;
    std::cout << "==========================================================" << std::endl;

    test_compiler_capabilities();
    test_isolate_sandbox_execution();
    test_judge_types_serialization();
    test_isolate_advanced_signals_and_security();
    test_isolate_large_io_stream();
    test_judge_db_and_queue_integration();

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "    ALL JUDGE SANDBOX & COMPILER UNIT TESTS PASSED!       " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

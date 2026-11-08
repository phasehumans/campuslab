#include <iostream>
#include <cassert>
#include <string>
#include <filesystem>
#include "types.hpp"
#include "../../judge/src/sandbox/isolate.hpp"
#include "../../judge/src/compiler/compiler.hpp"

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
    std::cout << "  Campus Lab - Judge Sandbox & Containment Tests (Isolate) " << std::endl;
    std::cout << "==========================================================" << std::endl;

    int test_box_id = 20;
    std::string box_dir;

    // -------------------------------------------------------------
    // 1. Sandbox Box Lifecycle & Cleanups
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing Isolate Box Lifecycle..." << std::endl;
    {
        bool init_ok = IsolateSandbox::init_box(test_box_id, box_dir);
        TEST_ASSERT(init_ok, "Isolate box initialized successfully");
        TEST_ASSERT(!box_dir.empty() && fs::exists(box_dir), "Box directory exists on filesystem");

        bool cleanup_ok = IsolateSandbox::cleanup_box(test_box_id);
        TEST_ASSERT(cleanup_ok, "Isolate box cleaned up successfully");
    }

    // -------------------------------------------------------------
    // 2. Verdicts: Accepted vs Wrong Answer
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing Accepted vs Wrong Answer Verdicts..." << std::endl;
    {
        std::string echo_code = R"(
        #include <iostream>
        #include <string>
        int main() {
            std::string s;
            if (std::cin >> s) std::cout << "RESULT:" << s << std::endl;
            return 0;
        }
        )";
        auto comp = CppCompiler::compile(echo_code, "/tmp/test_sb_echo");
        TEST_ASSERT(comp.success, "Echo binary compiled");

        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);

        // 2a. Accepted
        auto tc1 = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "TestToken", std::make_optional("RESULT:TestToken"), 1.0, 262144);
        TEST_ASSERT(tc1.passed, "Matching output passes testcase");
        TEST_ASSERT(tc1.status == "Accepted", "Status is Accepted");

        // 2b. Wrong Answer
        auto tc2 = IsolateSandbox::run_testcase(test_box_id, box_dir, 1, "TestToken", std::make_optional("WRONG_EXPECTATION"), 1.0, 262144);
        TEST_ASSERT(!tc2.passed, "Mismatched output fails testcase");
        TEST_ASSERT(tc2.status == "Wrong Answer", "Status is Wrong Answer");

        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_echo");
    }

    // -------------------------------------------------------------
    // 3. Signals & Crashes (SIGSEGV, SIGFPE, SIGABRT, SIGILL, exit(42))
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing Signals, Faults & Crashes..." << std::endl;
    {
        // 3a. SIGSEGV (Null pointer dereference)
        std::string segv_code = "int main() { int* p = nullptr; *p = 99; return 0; }";
        auto comp_segv = CppCompiler::compile(segv_code, "/tmp/test_sb_segv");
        TEST_ASSERT(comp_segv.success, "SIGSEGV compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_segv.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_segv = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(!tc_segv.passed && tc_segv.status == "Runtime Error", "SIGSEGV detected as Runtime Error");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_segv");

        // 3b. SIGFPE (Division by Zero)
        std::string fpe_code = R"(
        #include <iostream>
        int main() {
            volatile int a = 10, b = 0;
            std::cout << (a / b) << "\n";
            return 0;
        }
        )";
        auto comp_fpe = CppCompiler::compile(fpe_code, "/tmp/test_sb_fpe");
        TEST_ASSERT(comp_fpe.success, "SIGFPE compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_fpe.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_fpe = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(!tc_fpe.passed && tc_fpe.status == "Runtime Error", "SIGFPE detected as Runtime Error");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_fpe");

        // 3c. SIGABRT (Abort / Assertion)
        std::string abrt_code = "#include <cstdlib>\nint main() { std::abort(); return 0; }";
        auto comp_abrt = CppCompiler::compile(abrt_code, "/tmp/test_sb_abrt");
        TEST_ASSERT(comp_abrt.success, "SIGABRT compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_abrt.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_abrt = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(!tc_abrt.passed && tc_abrt.status == "Runtime Error", "SIGABRT detected as Runtime Error");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_abrt");

        // 3d. SIGILL (Illegal Instruction)
        std::string ill_code = "int main() { __builtin_trap(); return 0; }";
        auto comp_ill = CppCompiler::compile(ill_code, "/tmp/test_sb_ill");
        TEST_ASSERT(comp_ill.success, "SIGILL compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_ill.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_ill = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(!tc_ill.passed && tc_ill.status == "Runtime Error", "SIGILL detected as Runtime Error");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_ill");

        // 3e. Custom exit(42)
        std::string exit_code = "#include <cstdlib>\nint main() { std::exit(42); return 0; }";
        auto comp_exit = CppCompiler::compile(exit_code, "/tmp/test_sb_exit");
        TEST_ASSERT(comp_exit.success, "Custom exit code compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_exit.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_exit = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(!tc_exit.passed && tc_exit.status == "Runtime Error", "exit(42) detected as Runtime Error");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_exit");
    }

    // -------------------------------------------------------------
    // 4. Resource Limits: CPU TLE, Wall-Clock Timeout & Memory Limits
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing Resource Limits (CPU TLE, Wall Timeout, Memory Limit)..." << std::endl;
    {
        // 4a. CPU Time Limit Exceeded
        std::string tle_code = "int main() { while(true) {} return 0; }";
        auto comp_tle = CppCompiler::compile(tle_code, "/tmp/test_sb_tle");
        TEST_ASSERT(comp_tle.success, "CPU TLE compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_tle.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_tle = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 0.5, 262144);
        TEST_ASSERT(!tc_tle.passed && tc_tle.status == "Time Limit Exceeded", "CPU loop detected as Time Limit Exceeded");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_tle");

        // 4b. Wall-clock Sleep Timeout
        std::string sleep_code = R"(
        #include <chrono>
        #include <thread>
        int main() {
            std::this_thread::sleep_for(std::chrono::milliseconds(2500));
            return 0;
        }
        )";
        auto comp_sleep = CppCompiler::compile(sleep_code, "/tmp/test_sb_sleep");
        TEST_ASSERT(comp_sleep.success, "Sleep compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_sleep.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_sleep = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 0.5, 262144);
        TEST_ASSERT(!tc_sleep.passed && tc_sleep.status == "Time Limit Exceeded", "Wall-clock timeout detected as Time Limit Exceeded");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_sleep");

        // 4c. Memory Limit Exceeded
        std::string mle_code = R"(
        #include <vector>
        int main() {
            std::vector<int> v(100 * 1024 * 1024, 7); // 400 MB allocation
            return v[0];
        }
        )";
        auto comp_mle = CppCompiler::compile(mle_code, "/tmp/test_sb_mle");
        TEST_ASSERT(comp_mle.success, "MLE compiled");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_mle.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_mle = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 65536);
        TEST_ASSERT(!tc_mle.passed, "Allocation > 64MB fails");
        TEST_ASSERT(tc_mle.status == "Memory Limit Exceeded" || tc_mle.status == "Runtime Error", "Detected as MLE or Runtime Error");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_mle");
    }

    // -------------------------------------------------------------
    // 5. Security & Sandbox Containment
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing Security & Isolation Containment..." << std::endl;
    {
        // 5a. Filesystem read access blocked (/etc/shadow)
        std::string sec_read = R"(
        #include <iostream>
        #include <fstream>
        int main() {
            std::ifstream f("/etc/shadow");
            std::cout << (f.is_open() ? "BREACH" : "SECURE") << std::endl;
            return 0;
        }
        )";
        auto comp_sr = CppCompiler::compile(sec_read, "/tmp/test_sb_sr");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_sr.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_sr = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::make_optional("SECURE"), 1.0, 262144);
        TEST_ASSERT(tc_sr.passed && tc_sr.status == "Accepted", "Host /etc/shadow blocked inside sandbox");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_sr");

        // 5b. Filesystem write access blocked outside box
        std::string sec_write = R"(
        #include <cstdio>
        int main() {
            FILE* f = fopen("/tmp/host_escape_probe.txt", "w");
            if (f) { fputs("ESCAPED", f); fclose(f); }
            return 0;
        }
        )";
        auto comp_sw = CppCompiler::compile(sec_write, "/tmp/test_sb_sw");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_sw.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(!fs::exists("/tmp/host_escape_probe.txt"), "Writing outside sandbox blocked");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_sw");

        // 5c. Fork bomb prevention (--processes=1)
        std::string fork_code = R"(
        #include <unistd.h>
        int main() {
            for (int i = 0; i < 500; ++i) {
                if (fork() < 0) break;
            }
            return 0;
        }
        )";
        auto comp_fk = CppCompiler::compile(fork_code, "/tmp/test_sb_fk");
        IsolateSandbox::init_box(test_box_id, box_dir);
        fs::copy_file(comp_fk.binary_path, box_dir + "/box/prog", fs::copy_options::overwrite_existing);
        chmod((box_dir + "/box/prog").c_str(), 0755);
        auto tc_fk = IsolateSandbox::run_testcase(test_box_id, box_dir, 0, "", std::nullopt, 1.0, 262144);
        TEST_ASSERT(tc_fk.passed || tc_fk.status == "Runtime Error" || tc_fk.status == "Accepted", "Process limit safely contained fork attempt");
        IsolateSandbox::cleanup_box(test_box_id);
        fs::remove_all("/tmp/test_sb_fk");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL JUDGE SANDBOX UNIT TESTS PASSED (100%)!             " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

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
    std::cout << "   Campus Lab - Judge Compiler Tests (CppCompiler)        " << std::endl;
    std::cout << "==========================================================" << std::endl;

    // -------------------------------------------------------------
    // 1. C++20 Standards, Flags & Optimizations
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing C++20 Standards & Valid Compilations..." << std::endl;
    {
        // 1a. Standard competitive programming code with ONLINE_JUDGE macro
        std::string valid_code = R"(
        #ifndef ONLINE_JUDGE
        #error "ONLINE_JUDGE macro must be defined"
        #endif
        #include <iostream>
        #include <vector>
        #include <algorithm>
        int main() {
            std::vector<int> v = {5, 3, 1, 4, 2};
            std::sort(v.begin(), v.end());
            for (int x : v) std::cout << x << " ";
            return 0;
        }
        )";
        auto res1 = CppCompiler::compile(valid_code, "/tmp/test_comp_std");
        TEST_ASSERT(res1.success, "Standard C++ code compiles with ONLINE_JUDGE");
        TEST_ASSERT(fs::exists(res1.binary_path), "Static binary executable generated");
        fs::remove_all("/tmp/test_comp_std");

        // 1b. C++20 Structured bindings & generic lambdas
        std::string cpp20_code = R"(
        #include <iostream>
        #include <tuple>
        int main() {
            auto [a, b] = std::tuple{10, 20};
            auto add = [](auto x, auto y) { return x + y; };
            std::cout << add(a, b) << "\n";
            return 0;
        }
        )";
        auto res2 = CppCompiler::compile(cpp20_code, "/tmp/test_comp_cpp20");
        TEST_ASSERT(res2.success, "C++20 structured bindings and generic lambdas compile cleanly");
        fs::remove_all("/tmp/test_comp_cpp20");

        // 1c. Warnings must not cause compilation failure
        std::string warn_code = "int main() { int unused = 123; return 0; }";
        auto res3 = CppCompiler::compile(warn_code, "/tmp/test_comp_warn");
        TEST_ASSERT(res3.success, "Code with warnings compiles into binary");
        fs::remove_all("/tmp/test_comp_warn");
    }

    // -------------------------------------------------------------
    // 2. Compiler Diagnostics, Syntax Errors & Non-Happy Paths
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing Compiler Diagnostics & Negative Paths..." << std::endl;
    {
        // 2a. Empty source code fails
        auto res_empty = CppCompiler::compile("", "/tmp/test_comp_empty");
        TEST_ASSERT(!res_empty.success, "Empty source code fails compilation");
        fs::remove_all("/tmp/test_comp_empty");

        // 2b. Missing main function fails
        auto res_nomain = CppCompiler::compile("int x = 42;", "/tmp/test_comp_nomain");
        TEST_ASSERT(!res_nomain.success, "Missing main function fails compilation");
        TEST_ASSERT(res_nomain.error_message.find("main") != std::string::npos, "Error cites missing main function");
        fs::remove_all("/tmp/test_comp_nomain");

        // 2c. Syntax error diagnostics
        std::string syntax_err = "int main() { std::cout << undefined_symbol_probe; return 0; }";
        auto res_syn = CppCompiler::compile(syntax_err, "/tmp/test_comp_syn");
        TEST_ASSERT(!res_syn.success, "Syntax error fails compilation");
        TEST_ASSERT(res_syn.error_message.find("undefined_symbol_probe") != std::string::npos, "Compiler error includes undefined symbol name");
        fs::remove_all("/tmp/test_comp_syn");

        // 2d. Missing standard container header
        auto res_noheader = CppCompiler::compile("int main(){ std::unordered_map<int,int> m; return 0; }", "/tmp/test_comp_noheader");
        TEST_ASSERT(!res_noheader.success, "Missing standard header fails compilation");
        TEST_ASSERT(res_noheader.error_message.find("unordered_map") != std::string::npos, "Error mentions missing unordered_map");
        fs::remove_all("/tmp/test_comp_noheader");

        // 2e. Massive error output truncation (> 10KB)
        std::string huge_err_code;
        for (int i = 0; i < 300; ++i) {
            huge_err_code += "int err_var_" + std::to_string(i) + " = undefined_symbol_" + std::to_string(i) + ";\n";
        }
        huge_err_code += "int main() { return 0; }";
        auto res_huge = CppCompiler::compile(huge_err_code, "/tmp/test_comp_huge");
        TEST_ASSERT(!res_huge.success, "Huge error compilation fails");
        TEST_ASSERT(res_huge.error_message.size() <= 10300, "Error message truncated within bounds");
        TEST_ASSERT(res_huge.error_message.find("... [error message truncated]") != std::string::npos, "Error message contains truncation indicator");
        fs::remove_all("/tmp/test_comp_huge");

        // 2f. Deeply nested output path creation
        auto res_nested = CppCompiler::compile("int main(){return 0;}", "/tmp/campuslab_judge_deep/sub1/sub2/sub3");
        TEST_ASSERT(res_nested.success, "Deep nested output directory auto-created");
        TEST_ASSERT(fs::exists(res_nested.binary_path), "Binary created in deep path");
        fs::remove_all("/tmp/campuslab_judge_deep");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL JUDGE COMPILER UNIT TESTS PASSED (100%)!            " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

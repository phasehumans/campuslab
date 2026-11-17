#pragma once

#include <map>
#include <optional>
#include <string>
#include <vector>

namespace campuslab {

// How the judge builds and runs each language inside the isolate sandbox.
// Paths are as seen from inside the box (isolate binds /usr, /bin and /lib by default).
struct LanguageSpec {
    std::string id;
    std::string source_file;                // written to /box
    std::vector<std::string> compile_argv;  // compile or syntax-check step; empty = none
    std::vector<std::string> run_argv;
    double time_multiplier = 1.0;           // fairness vs C++ (per test case)
    double time_extra_sec = 0.0;            // added after the multiplier (interpreter start-up)
    int run_processes = 1;                  // threads count as processes in isolate
    int extra_memory_kb = 0;                // runtime baseline on top of the problem's limit
    long long no_cgroup_address_space_kb = 0;  // address-space cap when cgroups are unavailable (0 = memory limit)
    std::vector<std::string> env;           // extra environment variables (KEY=VALUE)
    int stack_kb = 0;                       // 0 = up to the memory limit (deep recursion allowed).
                                            // Ruby touches its whole stack at start-up, so it must be capped.
};

inline const std::map<std::string, LanguageSpec>& language_specs() {
    static const std::map<std::string, LanguageSpec> specs = {
        {"cpp", {
            "cpp", "main.cpp",
            {"/usr/bin/g++", "-O2", "-std=c++20", "-pipe", "-static", "-DONLINE_JUDGE", "-o", "main", "main.cpp"},
            {"/box/main"},
            1.0, 0.0, 1, 0, 0, {}
        }},
        {"c", {
            "c", "main.c",
            {"/usr/bin/gcc", "-O2", "-std=c17", "-pipe", "-static", "-DONLINE_JUDGE", "-o", "main", "main.c", "-lm"},
            {"/box/main"},
            1.0, 0.0, 1, 0, 0, {}
        }},
        {"python", {
            "python", "main.py",
            {"/usr/bin/python3", "-m", "py_compile", "main.py"},
            {"/usr/bin/python3", "main.py"},
            3.0, 0.5, 1, 16384, 0, {"PYTHONDONTWRITEBYTECODE=1", "PYTHONIOENCODING=utf-8"}
        }},
        {"javascript", {
            "javascript", "main.js",
            {"/usr/local/bin/node", "--check", "main.js"},
            {"/usr/local/bin/node", "--max-old-space-size=256", "--stack-size=4000", "--v8-pool-size=0", "main.js"},
            1.5, 0.3, 32, 65536, 8LL * 1024 * 1024, {"UV_THREADPOOL_SIZE=1"}
        }},
        // No check step: `node --check` doesn't strip types, so it rejects valid TypeScript.
        // Syntax errors surface when the code runs. Type stripping uses WebAssembly, which
        // reserves a large address space; that only matters in the no-cgroup fallback.
        {"typescript", {
            "typescript", "main.ts",
            {},
            {"/usr/local/bin/node", "--experimental-strip-types", "--no-warnings", "--max-old-space-size=256",
             "--stack-size=4000", "--v8-pool-size=0", "main.ts"},
            1.5, 0.3, 32, 65536, 64LL * 1024 * 1024, {"UV_THREADPOOL_SIZE=1"}
        }},
        {"lua", {
            "lua", "main.lua",
            {"/usr/bin/luac5.4", "-p", "main.lua"},
            {"/usr/bin/lua5.4", "main.lua"},
            2.0, 0.3, 1, 8192, 0, {}
        }},
        {"perl", {
            "perl", "main.pl",
            {"/usr/bin/perl", "-c", "main.pl"},
            {"/usr/bin/perl", "main.pl"},
            3.0, 0.5, 1, 8192, 0, {}
        }},
        {"ruby", {
            "ruby", "main.rb",
            {"/usr/bin/ruby", "-c", "main.rb"},
            {"/usr/bin/ruby", "main.rb"},
            3.0, 0.5, 16, 32768, 1024LL * 1024, {}, 65536
        }},
    };
    return specs;
}

inline std::optional<LanguageSpec> find_language_spec(const std::string& id) {
    const auto& specs = language_specs();
    auto it = specs.find(id);
    if (it == specs.end()) return std::nullopt;
    return it->second;
}

} // namespace campuslab

#pragma once

#include <string>
#include <fstream>
#include <sstream>
#include <filesystem>
#include <cstdlib>
#include <iostream>
#include "../sandbox/isolate.hpp"
#include "../languages.hpp"

namespace campuslab {

namespace fs = std::filesystem;

// Host-side C++ compile. Only used by the judge test suites to build fixtures;
// the worker compiles student code inside the sandbox (SandboxCompiler below).
class CppCompiler {
public:
    struct CompileResult {
        bool success;
        std::string binary_path;
        std::string error_message;
    };

    static CompileResult compile(const std::string& source_code, const std::string& work_dir) {
        CompileResult res;
        res.success = false;

        fs::create_directories(work_dir);
        std::string src_path = work_dir + "/solution.cpp";
        std::string bin_path = work_dir + "/prog";

        // Write source code
        {
            std::ofstream ofs(src_path);
            ofs << source_code;
        }

        // Compilation command with:
        // -O2 optimization (standard for competitive programming)
        // -std=c++20
        // -static for self-contained binary execution inside sandbox
        // -DONLINE_JUDGE definition
        // timeout 10 seconds to prevent template bomb infinite loops
        std::string cmd = "timeout 10 g++ -O2 -std=c++20 -pipe -static -DONLINE_JUDGE \"" + 
                          src_path + "\" -o \"" + bin_path + "\"";

        int exit_code = 0;
        std::string out = IsolateSandbox::exec_cmd(cmd, exit_code);

        if (exit_code == 0 && fs::exists(bin_path)) {
            res.success = true;
            res.binary_path = bin_path;
        } else {
            res.success = false;
            std::string err_output = out;
            if (err_output.empty()) {
                if (exit_code == 124) {
                    err_output = "Compilation timed out after 10 seconds (check for infinite constexpr or template recursion).";
                } else {
                    err_output = "Compilation failed with exit code " + std::to_string(exit_code);
                }
            }
            // Truncate error message if larger than 10KB
            if (err_output.size() > 10240) {
                err_output = err_output.substr(0, 10240) + "\n... [error message truncated]";
            }
            res.error_message = err_output;
        }

        return res;
    }
};

// Compiles (or syntax-checks) student code inside an already-initialised isolate box,
// so the compiler can't read server files or the judge's environment.
class SandboxCompiler {
public:
    struct Result {
        bool success = false;
        std::string error_message;
    };

    static Result compile(int box_id, const std::string& box_dir, const LanguageSpec& spec,
                          const std::string& source_code, bool use_cg) {
        Result res;
        {
            std::ofstream ofs(box_dir + "/box/" + spec.source_file);
            ofs << source_code;
        }
        if (spec.compile_argv.empty()) {
            res.success = true;
            return res;
        }

        IsolateSandbox::RunLimits lim;
        lim.argv = spec.compile_argv;
        lim.time_sec = 10.0;                     // CPU time
        lim.memory_kb = 786432;                  // 768 MB for the compiler (cgroups)
        lim.address_space_kb = 4LL * 1024 * 1024; // compilers/runtimes reserve lots of address space
        lim.processes = 64;                      // g++ spawns cc1plus, as, ld
        lim.use_cg = use_cg;
        lim.env = spec.env;

        int exit_code = 0;
        auto meta = IsolateSandbox::run_in_box(box_id, lim, 20.0, 65536, "", "compile.txt", "", exit_code);
        std::string output = IsolateSandbox::read_file_contents(box_dir + "/box/compile.txt");

        std::string status = meta["status"];
        bool ok = status.empty() && (meta["exitcode"].empty() || meta["exitcode"] == "0");
        if (ok) {
            res.success = true;
            return res;
        }

        if (status == "TO") {
            output = "Compilation timed out after 10 seconds.\n" + output;
        } else if (output.empty()) {
            output = "Compilation failed" + (meta["message"].empty() ? std::string() : (": " + meta["message"]));
        }
        if (output.size() > 10240) {
            output = output.substr(0, 10240) + "\n... [compiler output truncated]";
        }
        res.error_message = output;
        return res;
    }
};

} // namespace campuslab

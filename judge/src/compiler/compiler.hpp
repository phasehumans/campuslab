#pragma once

#include <string>
#include <fstream>
#include <sstream>
#include <filesystem>
#include <cstdlib>
#include <iostream>
#include "../sandbox/isolate.hpp"

namespace campuslab {

namespace fs = std::filesystem;

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

} // namespace campuslab

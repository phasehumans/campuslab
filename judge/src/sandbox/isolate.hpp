#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <map>
#include <cstdlib>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <filesystem>
#include <array>
#include <optional>
#include "types.hpp"

namespace campuslab {

namespace fs = std::filesystem;

class IsolateSandbox {
public:
    static std::string exec_cmd(const std::string& cmd, int& exit_code) {
        std::array<char, 256> buffer;
        std::string result;
        FILE* pipe = popen((cmd + " 2>&1").c_str(), "r");
        if (!pipe) {
            exit_code = -1;
            return "Failed to run command";
        }
        while (fgets(buffer.data(), buffer.size(), pipe) != nullptr) {
            result += buffer.data();
        }
        int status = pclose(pipe);
        if (WIFEXITED(status)) {
            exit_code = WEXITSTATUS(status);
        } else {
            exit_code = -1;
        }
        return result;
    }

    static bool init_box(int box_id, std::string& box_dir) {
        int exit_code = 0;
        std::string cmd = "isolate --box-id=" + std::to_string(box_id) + " --init";
        std::string out = exec_cmd(cmd, exit_code);
        if (exit_code != 0) {
            std::cerr << "[Sandbox] isolate --init failed: " << out << std::endl;
            return false;
        }
        while (!out.empty() && (out.back() == '\n' || out.back() == '\r' || out.back() == ' ')) {
            out.pop_back();
        }
        box_dir = out;
        return true;
    }

    static bool cleanup_box(int box_id) {
        int exit_code = 0;
        std::string cmd = "isolate --box-id=" + std::to_string(box_id) + " --cleanup";
        exec_cmd(cmd, exit_code);
        return exit_code == 0;
    }

    static std::map<std::string, std::string> parse_meta(const std::string& meta_path) {
        std::map<std::string, std::string> meta;
        std::ifstream file(meta_path);
        if (!file.is_open()) return meta;

        std::string line;
        while (std::getline(file, line)) {
            auto colon = line.find(':');
            if (colon != std::string::npos) {
                std::string key = line.substr(0, colon);
                std::string val = line.substr(colon + 1);
                meta[key] = val;
            }
        }
        return meta;
    }

    static std::string read_file_contents(const std::string& path) {
        std::ifstream file(path);
        if (!file.is_open()) return "";
        std::stringstream ss;
        ss << file.rdbuf();
        return ss.str();
    }

    static bool normalize_and_compare(const std::string& actual, const std::string& expected) {
        std::istringstream iss_actual(actual);
        std::istringstream iss_expected(expected);

        std::string tok_a, tok_b;
        while (iss_actual >> tok_a) {
            if (!(iss_expected >> tok_b)) {
                return false;
            }
            if (tok_a != tok_b) {
                return false;
            }
        }
        if (iss_expected >> tok_b) {
            return false;
        }
        return true;
    }

    static ExecutionResultItem run_testcase(
        int box_id,
        const std::string& box_dir,
        int tc_index,
        const std::string& input,
        const std::optional<std::string>& expected_output,
        double time_limit_sec,
        int memory_limit_kb
    ) {
        ExecutionResultItem item;
        item.testcase = tc_index;
        item.input = input;
        item.expected_output = expected_output;

        // Write stdin to box
        std::string stdin_file = box_dir + "/box/stdin.txt";
        {
            std::ofstream ofs(stdin_file);
            ofs << input;
        }

        std::string meta_path = "/tmp/meta_" + std::to_string(box_id) + ".txt";
        fs::remove(meta_path);

        double wall_time = time_limit_sec * 2.0 + 1.0;
        std::string run_cmd = "isolate --box-id=" + std::to_string(box_id) +
            " --time=" + std::to_string(time_limit_sec) +
            " --wall-time=" + std::to_string(wall_time) +
            " --mem=" + std::to_string(memory_limit_kb) +
            " --fsize=10240" +
            " --processes=1" +
            " --silent" +
            " --meta=" + meta_path +
            " --stdin=stdin.txt" +
            " --stdout=stdout.txt" +
            " --stderr=stderr.txt" +
            " --run -- /box/prog";

        int exit_code = 0;
        exec_cmd(run_cmd, exit_code);

        auto meta = parse_meta(meta_path);
        fs::remove(meta_path);

        std::string status_code = meta["status"];
        std::string time_str = meta["time"];
        std::string memory_str = meta["max-rss"];
        std::string isolate_exitcode = meta["exitcode"];
        std::string isolate_message = meta["message"];

        if (!time_str.empty()) {
            item.time = time_str + "s";
        }
        if (!memory_str.empty()) {
            try {
                int kb = std::stoi(memory_str);
                double mb = kb / 1024.0;
                char buf[32];
                snprintf(buf, sizeof(buf), "%.1f MB", mb);
                item.memory = std::string(buf);
            } catch (...) {
                item.memory = memory_str + " KB";
            }
        }

        std::string stdout_txt = read_file_contents(box_dir + "/box/stdout.txt");
        std::string stderr_txt = read_file_contents(box_dir + "/box/stderr.txt");
        item.stdout_output = stdout_txt;
        if (!stderr_txt.empty()) {
            item.stderr_output = stderr_txt;
        }

        // Determine verdict
        if (status_code == "TO") {
            item.status = "Time Limit Exceeded";
            item.passed = false;
        } else if (status_code == "SG" || status_code == "RE" || (!isolate_exitcode.empty() && isolate_exitcode != "0")) {
            if (isolate_message.find("Memory") != std::string::npos || 
                (!memory_str.empty() && std::stoi(memory_str) >= memory_limit_kb)) {
                item.status = "Memory Limit Exceeded";
            } else {
                item.status = "Runtime Error";
            }
            item.passed = false;
        } else {
            if (expected_output.has_value()) {
                if (normalize_and_compare(stdout_txt, *expected_output)) {
                    item.status = "Accepted";
                    item.passed = true;
                } else {
                    item.status = "Wrong Answer";
                    item.passed = false;
                }
            } else {
                item.status = "Accepted";
                item.passed = true;
            }
        }

        return item;
    }
};

} // namespace campuslab

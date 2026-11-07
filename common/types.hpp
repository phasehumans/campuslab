#pragma once

#include <string>
#include <vector>
#include <optional>
#include "json.hpp"

namespace campuslab {

using json = nlohmann::json;

struct Testcase {
    std::string input;
    std::string output;
};

struct ExecutionResultItem {
    int testcase;
    std::string input;
    std::string stdout_output;
    std::optional<std::string> expected_output;
    bool passed;
    std::optional<std::string> compile_output;
    std::optional<std::string> stderr_output;
    std::string status;
    std::optional<std::string> memory;
    std::optional<std::string> time;

    json to_json() const {
        json j;
        j["testcase"] = testcase;
        j["input"] = input;
        j["stdout"] = stdout_output;
        if (expected_output.has_value()) {
            j["expectedOutput"] = *expected_output;
        } else {
            j["expectedOutput"] = nullptr;
        }
        j["passed"] = passed;
        if (compile_output.has_value()) {
            j["compileOutput"] = *compile_output;
        } else {
            j["compileOutput"] = nullptr;
        }
        if (stderr_output.has_value()) {
            j["stderr"] = *stderr_output;
        } else {
            j["stderr"] = nullptr;
        }
        j["status"] = status;
        if (memory.has_value()) {
            j["memory"] = *memory;
        } else {
            j["memory"] = nullptr;
        }
        if (time.has_value()) {
            j["time"] = *time;
        } else {
            j["time"] = nullptr;
        }
        return j;
    }
};

struct ExecutionResponse {
    bool all_passed;
    std::vector<ExecutionResultItem> results;

    json to_json() const {
        json j;
        j["allPassed"] = all_passed;
        j["results"] = json::array();
        for (const auto& item : results) {
            j["results"].push_back(item.to_json());
        }
        return j;
    }
};

struct JudgeJob {
    std::string submission_id;
    std::string type; // "RUN" or "SUBMIT"
    std::string user_id;
    std::string problem_id;
    std::string source_code;
    std::string contest_code;
    double time_limit_sec = 1.0;
    int memory_limit_kb = 262144; // 256 MB
    std::vector<Testcase> testcases;

    static JudgeJob from_json(const json& j) {
        JudgeJob job;
        job.submission_id = j.value("submissionId", "");
        job.type = j.value("type", "SUBMIT");
        job.user_id = j.value("userId", "");
        job.problem_id = j.value("problemId", "");
        job.source_code = j.value("sourceCode", "");
        job.contest_code = j.value("contestCode", "");
        job.time_limit_sec = j.value("timeLimitSec", 1.0);
        job.memory_limit_kb = j.value("memoryLimitKb", 262144);
        if (j.contains("testcases") && j["testcases"].is_array()) {
            for (const auto& tc : j["testcases"]) {
                Testcase t;
                t.input = tc.value("input", "");
                t.output = tc.value("output", "");
                job.testcases.push_back(t);
            }
        }
        return job;
    }

    json to_json() const {
        json j;
        j["submissionId"] = submission_id;
        j["type"] = type;
        j["userId"] = user_id;
        j["problemId"] = problem_id;
        j["sourceCode"] = source_code;
        j["contestCode"] = contest_code;
        j["timeLimitSec"] = time_limit_sec;
        j["memoryLimitKb"] = memory_limit_kb;
        j["testcases"] = json::array();
        for (const auto& tc : testcases) {
            j["testcases"].push_back({{"input", tc.input}, {"output", tc.output}});
        }
        return j;
    }
};

} // namespace campuslab

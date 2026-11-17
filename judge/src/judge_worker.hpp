#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <atomic>
#include <chrono>
#include <filesystem>
#include "json.hpp"
#include "types.hpp"
#include "config/worker_config.hpp"
#include "sandbox/isolate.hpp"
#include "compiler/compiler.hpp"
#include "languages.hpp"
#include "storage/db_client.hpp"
#include "queue/redis_consumer.hpp"

namespace campuslab {

namespace fs = std::filesystem;
using json = nlohmann::json;

class JudgeWorker {
public:
    explicit JudgeWorker(const WorkerConfig& config)
        : config_(config),
          db_client_(config.db_url),
          queue_consumer_(config.redis_host, config.redis_port, config.queue_name),
          running_(true) {}

    void stop() {
        running_ = false;
    }

    bool is_running() const {
        return running_;
    }

    void run() {
        std::cout << "[JudgeWorker] Worker loop started. Listening on queue '" 
                  << config_.queue_name << "' with box ID " << config_.box_id << "..." << std::endl;

        while (running_) {
            auto job_opt = queue_consumer_.pop_job(2);
            if (!job_opt.has_value()) {
                continue;
            }

            process_job(*job_opt);
        }

        std::cout << "[JudgeWorker] Worker loop stopped gracefully." << std::endl;
    }

    void process_job(const std::string& job_json_str) {
        std::cout << "\n[JudgeWorker] Received job!" << std::endl;
        try {
            auto j = json::parse(job_json_str);
            JudgeJob job = JudgeJob::from_json(j);

            std::cout << "[JudgeWorker] Submission ID: " << job.submission_id 
                      << " | Type: " << job.type 
                      << " | Language: " << job.language
                      << " | Testcases: " << job.testcases.size() << std::endl;

            ExecutionResponse response;
            std::string final_status;
            std::string total_time = "0.0s";
            std::string max_memory = "0.0 MB";
            std::string compile_error;
            bool compiled = false;
            bool internal_error = false;

            // One sandbox box per job: write source, compile/check inside it, run every test, clean up.
            auto spec_opt = find_language_spec(job.language);
            std::string box_dir;
            bool box_ready = false;
            if (!spec_opt) {
                compile_error = "Unsupported language: " + job.language;
            } else if (!IsolateSandbox::init_box(config_.box_id, box_dir, config_.use_cgroups)) {
                std::cerr << "[JudgeWorker] Failed to init isolate sandbox box " << config_.box_id << std::endl;
                internal_error = true;
            } else {
                box_ready = true;
                auto c = SandboxCompiler::compile(config_.box_id, box_dir, *spec_opt, job.source_code,
                                                  config_.use_cgroups);
                compiled = c.success;
                compile_error = c.error_message;
            }

            if (internal_error) {
                response.all_passed = false;
                final_status = "Internal Error";
                ExecutionResultItem item;
                item.testcase = 0;
                item.passed = false;
                item.status = "Internal Error";
                item.stderr_output = "The judge sandbox is unavailable right now. Please try again.";
                response.results.push_back(item);
            } else if (!compiled) {
                std::cout << "[JudgeWorker] Compilation failed (" << job.language << ")" << std::endl;
                response.all_passed = false;
                final_status = "Compilation Error";

                ExecutionResultItem item;
                item.testcase = 0;
                item.input = "";
                item.stdout_output = "";
                item.passed = false;
                item.compile_output = compile_error;
                item.status = "Compilation Error";
                response.results.push_back(item);
            } else {
                const LanguageSpec& spec = *spec_opt;
                IsolateSandbox::RunLimits lim;
                lim.argv = spec.run_argv;
                lim.time_sec = job.time_limit_sec * spec.time_multiplier + spec.time_extra_sec;
                lim.memory_kb = job.memory_limit_kb + spec.extra_memory_kb;
                lim.address_space_kb = spec.no_cgroup_address_space_kb;
                lim.processes = spec.run_processes;
                lim.use_cg = config_.use_cgroups;
                // Deep recursion allowed up to the memory limit, unless the language caps its stack
                lim.stack_kb = spec.stack_kb > 0 ? spec.stack_kb : lim.memory_kb;
                lim.env = spec.env;

                bool all_passed = true;
                final_status = "Accepted";

                for (size_t i = 0; i < job.testcases.size(); ++i) {
                    const auto& tc = job.testcases[i];
                    std::optional<std::string> exp = tc.output.empty() ? std::nullopt : std::make_optional(tc.output);

                    auto item = IsolateSandbox::run_testcase(
                        config_.box_id, box_dir, static_cast<int>(i), tc.input, exp, lim);

                    response.results.push_back(item);
                    if (!item.passed) {
                        all_passed = false;
                        if (final_status == "Accepted") {
                            final_status = item.status;
                        }
                        if (job.type == "SUBMIT") {
                            // Short-circuit: stop evaluating on first failure like Codeforces
                            break;
                        }
                    }
                }

                response.all_passed = all_passed;

                // Peak time and memory across the tests that ran
                double max_tc_time = 0.0;
                double max_tc_mem = 0.0;
                for (const auto& r : response.results) {
                    if (r.time.has_value()) {
                        try { max_tc_time = std::max(max_tc_time, std::stod(r.time->substr(0, r.time->find('s')))); } catch (...) {}
                    }
                    if (r.memory.has_value()) {
                        try { max_tc_mem = std::max(max_tc_mem, std::stod(r.memory->substr(0, r.memory->find(' ')))); } catch (...) {}
                    }
                }
                char time_buf[32];
                snprintf(time_buf, sizeof(time_buf), "%.3fs", max_tc_time);
                total_time = std::string(time_buf);
                char mem_buf[32];
                snprintf(mem_buf, sizeof(mem_buf), "%.1f MB", max_tc_mem);
                max_memory = std::string(mem_buf);
            }

            if (box_ready) {
                IsolateSandbox::cleanup_box(config_.box_id, config_.use_cgroups);
            }

            // If SUBMIT, update PostgreSQL
            if (job.type == "SUBMIT") {
                db_client_.update_submission(
                    job,
                    response,
                    final_status,
                    total_time,
                    max_memory,
                    compiled ? "" : compile_error
                );
            }

            // Cache result in Redis for polling (TTL: 120s)
            std::string resp_json = response.to_json().dump();
            queue_consumer_.cache_result(job.submission_id, resp_json, 120);

            // Publish update event to Redis Pub/Sub
            queue_consumer_.publish_update(job.submission_id, resp_json);

            std::cout << "[JudgeWorker] Finished job " << job.submission_id 
                      << " with verdict: " << final_status << std::endl;
        } catch (const std::exception& e) {
            std::cerr << "[JudgeWorker] Error processing job: " << e.what() << std::endl;
        }
    }

private:
    WorkerConfig config_;
    JudgeDbClient db_client_;
    RedisQueueConsumer queue_consumer_;
    std::atomic<bool> running_;
};

} // namespace campuslab

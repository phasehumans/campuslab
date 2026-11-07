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
                      << " | Testcases: " << job.testcases.size() << std::endl;

            std::string work_dir = "/tmp/campuslab_judge/" + job.submission_id;
            auto compile_res = CppCompiler::compile(job.source_code, work_dir);

            ExecutionResponse response;
            std::string final_status;
            std::string total_time = "0.0s";
            std::string max_memory = "0.0 MB";

            if (!compile_res.success) {
                std::cout << "[JudgeWorker] Compilation failed!" << std::endl;
                response.all_passed = false;
                final_status = "Compilation Error";

                ExecutionResultItem item;
                item.testcase = 0;
                item.input = "";
                item.stdout_output = "";
                item.passed = false;
                item.compile_output = compile_res.error_message;
                item.status = "Compilation Error";
                response.results.push_back(item);
            } else {
                std::cout << "[JudgeWorker] Compilation succeeded! Initializing isolate sandbox..." << std::endl;
                std::string box_dir;
                if (!IsolateSandbox::init_box(config_.box_id, box_dir)) {
                    std::cerr << "[JudgeWorker] Failed to init isolate sandbox box " << config_.box_id << std::endl;
                    return;
                }

                // Copy compiled binary to sandbox
                std::string prog_dest = box_dir + "/box/prog";
                fs::copy_file(compile_res.binary_path, prog_dest, fs::copy_options::overwrite_existing);
                chmod(prog_dest.c_str(), 0755);

                bool all_passed = true;
                final_status = "Accepted";
                double max_tc_time = 0.0;

                for (size_t i = 0; i < job.testcases.size(); ++i) {
                    const auto& tc = job.testcases[i];
                    std::optional<std::string> exp = tc.output.empty() ? std::nullopt : std::make_optional(tc.output);

                    auto item = IsolateSandbox::run_testcase(
                        config_.box_id,
                        box_dir,
                        static_cast<int>(i),
                        tc.input,
                        exp,
                        job.time_limit_sec,
                        job.memory_limit_kb
                    );

                    if (!item.passed) {
                        all_passed = false;
                        if (final_status == "Accepted") {
                            final_status = item.status;
                        }
                        response.results.push_back(item);
                        if (job.type == "SUBMIT") {
                            // Short-circuit: stop evaluating on first failure like Codeforces
                            break;
                        }
                        continue;
                    }

                    response.results.push_back(item);
                }

                response.all_passed = all_passed;

                // Cleanup sandbox box
                IsolateSandbox::cleanup_box(config_.box_id);

                // Compute overall time/memory from results
                for (const auto& r : response.results) {
                    if (r.time.has_value()) {
                        try {
                            double t = std::stod(r.time->substr(0, r.time->find('s')));
                            if (t > max_tc_time) max_tc_time = t;
                        } catch (...) {}
                    }
                }
                char time_buf[32];
                snprintf(time_buf, sizeof(time_buf), "%.3fs", max_tc_time);
                total_time = std::string(time_buf);
            }

            // If SUBMIT, update PostgreSQL
            if (job.type == "SUBMIT") {
                db_client_.update_submission(
                    job,
                    response,
                    final_status,
                    total_time,
                    max_memory,
                    compile_res.success ? "" : compile_res.error_message
                );
            }

            // Cache result in Redis for polling (TTL: 120s)
            std::string resp_json = response.to_json().dump();
            queue_consumer_.cache_result(job.submission_id, resp_json, 120);

            // Publish update event to Redis Pub/Sub
            queue_consumer_.publish_update(job.submission_id, resp_json);

            // Clean up temporary compilation directory
            fs::remove_all(work_dir);

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

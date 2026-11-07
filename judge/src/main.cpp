#include <iostream>
#include <csignal>
#include <memory>
#include "config/worker_config.hpp"
#include "judge_worker.hpp"

using namespace campuslab;

static std::unique_ptr<JudgeWorker> g_worker;

void signal_handler(int signum) {
    std::cout << "\n[Worker] Caught signal " << signum << ", shutting down gracefully..." << std::endl;
    if (g_worker) {
        g_worker->stop();
    }
}

int main() {
    std::cout << "==============================================" << std::endl;
    std::cout << "   Campus Lab - C++ Judge Worker Starting     " << std::endl;
    std::cout << "==============================================" << std::endl;

    WorkerConfig cfg = WorkerConfig::load_from_env();
    std::cout << "[Worker] Config: BoxID=" << cfg.box_id
              << ", Redis=" << cfg.redis_host << ":" << cfg.redis_port
              << ", Queue=" << cfg.queue_name << std::endl;

    // Register signal handlers for graceful shutdown
    std::signal(SIGINT, signal_handler);
    std::signal(SIGTERM, signal_handler);

    try {
        g_worker = std::make_unique<JudgeWorker>(cfg);
        g_worker->run();
    } catch (const std::exception& e) {
        std::cerr << "[Worker] Fatal error: " << e.what() << std::endl;
        return 1;
    }

    std::cout << "[Worker] Exited cleanly." << std::endl;
    return 0;
}

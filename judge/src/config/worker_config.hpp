#pragma once

#include <string>
#include <cstdlib>

namespace campuslab {

struct WorkerConfig {
    std::string redis_host = "campuslab-redis";
    int redis_port = 6379;
    std::string db_url = "postgresql://myuser:mypassword@campuslab-postgres:5432/campus_lab";
    int box_id = 1;
    std::string queue_name = "judge_queue";

    static WorkerConfig load_from_env() {
        WorkerConfig cfg;
        if (const char* v = std::getenv("REDIS_HOST")) cfg.redis_host = v;
        if (const char* v = std::getenv("REDIS_PORT")) cfg.redis_port = std::stoi(v);
        if (const char* v = std::getenv("DATABASE_URL")) cfg.db_url = v;
        if (const char* v = std::getenv("ISOLATE_BOX_ID")) cfg.box_id = std::stoi(v);
        if (const char* v = std::getenv("JUDGE_QUEUE")) cfg.queue_name = v;
        return cfg;
    }
};

} // namespace campuslab

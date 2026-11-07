#pragma once

#include <string>
#include <cstdlib>

namespace campuslab {

struct AppConfig {
    int port = 3000;
    std::string jwt_secret = "supersecret";
    std::string db_url = "postgresql://myuser:mypassword@campuslab-postgres:5432/campus_lab";
    std::string redis_host = "campuslab-redis";
    int redis_port = 6379;
    size_t db_pool_size = 10;
    std::string client_origin = "http://localhost:5173";
    std::string github_client_id = "";
    std::string github_client_secret = "";
    std::string google_client_id = "";
    std::string google_client_secret = "";

    static AppConfig load_from_env() {
        AppConfig cfg;
        if (const char* v = std::getenv("PORT")) cfg.port = std::stoi(v);
        if (const char* v = std::getenv("JWT_SECRET")) cfg.jwt_secret = v;
        if (const char* v = std::getenv("DATABASE_URL")) cfg.db_url = v;
        if (const char* v = std::getenv("REDIS_HOST")) cfg.redis_host = v;
        if (const char* v = std::getenv("REDIS_PORT")) cfg.redis_port = std::stoi(v);
        if (const char* v = std::getenv("DB_POOL_SIZE")) cfg.db_pool_size = std::stoul(v);
        if (const char* v = std::getenv("CLIENT_ORIGIN")) cfg.client_origin = v;
        if (const char* v = std::getenv("GITHUB_CLIENT_ID")) cfg.github_client_id = v;
        if (const char* v = std::getenv("GITHUB_CLIENT_SECRET")) cfg.github_client_secret = v;
        if (const char* v = std::getenv("GOOGLE_CLIENT_ID")) cfg.google_client_id = v;
        if (const char* v = std::getenv("GOOGLE_CLIENT_SECRET")) cfg.google_client_secret = v;
        return cfg;
    }
};

} // namespace campuslab

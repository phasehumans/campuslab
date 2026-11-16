#define CROW_MAIN
#include "crow_all.h"
#include <iostream>
#include <cstdlib>
#include <memory>
#include "config/app_config.hpp"
#include "db/connection_pool.hpp"
#include "db/migrations.hpp"
#include "middleware/cors.hpp"
#include "services/auth_service.hpp"
#include "services/problem_service.hpp"
#include "services/execution_service.hpp"
#include "services/contest_service.hpp"
#include "services/profile_service.hpp"
#include "services/potd_service.hpp"
#include "services/duel_service.hpp"
#include "services/contest_ws_manager.hpp"
#include "controllers/auth_controller.hpp"
#include "controllers/problem_controller.hpp"
#include "controllers/execution_controller.hpp"
#include "controllers/contest_controller.hpp"
#include "controllers/profile_controller.hpp"
#include "controllers/potd_controller.hpp"
#include "controllers/duel_controller.hpp"

using namespace campuslab;

int main() {
    std::cout << "===============================================" << std::endl;
    std::cout << "   Campus Lab - C++ REST API Server Starting   " << std::endl;
    std::cout << "===============================================" << std::endl;

    // Load environment configuration
    AppConfig cfg = AppConfig::load_from_env();
    std::cout << "[API] Config loaded: Port=" << cfg.port
              << ", Redis=" << cfg.redis_host << ":" << cfg.redis_port
              << ", DB Pool Size=" << cfg.db_pool_size << std::endl;

    // Initialize thread-safe RAII PostgreSQL connection pool
    std::cout << "[API] Initializing PostgreSQL connection pool..." << std::endl;
    DbConnectionPool db_pool(cfg.db_url, cfg.db_pool_size);
    std::cout << "[API] PostgreSQL connection pool initialized (" << db_pool.available_count() << " connections)." << std::endl;

    Migrations::run(db_pool);

    // Initialize business services
    AuthService auth_service(db_pool, cfg.jwt_secret);
    ProblemService problem_service(db_pool);
    ExecutionService execution_service(db_pool, cfg.redis_host, cfg.redis_port);
    ContestService contest_service(db_pool);
    ProfileService profile_service(db_pool);
    PotdService potd_service(db_pool);
    DuelService duel_service(db_pool, [](const std::string& code, const json& msg) {
        ContestWsManager::instance().broadcast_to_room(code, msg);
    });
    execution_service.on_contest_submission = [&duel_service](const std::string& code, const std::string& user_id, const json& submission) {
        duel_service.on_submission_judged(code, user_id, submission);
    };

    // Initialize API controllers
    AuthController auth_controller(auth_service, cfg.jwt_secret, cfg.github_client_id, cfg.github_client_secret, cfg.google_client_id, cfg.google_client_secret, cfg.client_origin);
    ProblemController problem_controller(problem_service, cfg.jwt_secret);
    ExecutionController execution_controller(execution_service, cfg.jwt_secret);
    ContestController contest_controller(contest_service, db_pool, cfg.jwt_secret);
    ProfileController profile_controller(profile_service, cfg.jwt_secret);
    PotdController potd_controller(potd_service, cfg.jwt_secret);
    DuelController duel_controller(duel_service, cfg.jwt_secret);

    // Setup Crow application with CORS middleware
    AppType app;

    // LOG_LEVEL=warning (production) stops Crow from logging every request
    if (const char* level = std::getenv("LOG_LEVEL")) {
        std::string lv(level);
        if (lv == "warning") app.loglevel(crow::LogLevel::Warning);
        else if (lv == "error") app.loglevel(crow::LogLevel::Error);
    }

    // Health check endpoints
    auto health_handler = []() {
        return crow::response(200, json({
            {"success", true},
            {"status", "healthy"},
            {"message", "Campus Lab C++ API server is running"},
            {"version", "2.0.0"},
            {"engine", "C++ (GCC 13) Isolate Sandbox"}
        }).dump());
    };

    CROW_ROUTE(app, "/")(health_handler);
    CROW_ROUTE(app, "/health")(health_handler);
    CROW_ROUTE(app, "/api/v1/health")(health_handler);

    // Client log endpoint (from web ErrorBoundary)
    CROW_ROUTE(app, "/api/v1/client-log").methods(crow::HTTPMethod::POST)([](const crow::request& req) {
        std::cerr << "[CLIENT LOG] " << req.body << std::endl;
        return crow::response(200, json({{"success", true}}).dump());
    });

    // Register modular controllers
    auth_controller.register_routes(app);
    problem_controller.register_routes(app);
    execution_controller.register_routes(app);
    contest_controller.register_routes(app);
    profile_controller.register_routes(app);
    potd_controller.register_routes(app);
    duel_controller.register_routes(app);

    std::cout << "[API] All routes registered successfully." << std::endl;
    std::cout << "[API] Server listening on port " << cfg.port << "..." << std::endl;

    app.port(cfg.port).multithreaded().run();

    return 0;
}

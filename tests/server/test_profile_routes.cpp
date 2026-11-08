#include <iostream>
#include <cassert>
#include <string>
#include <chrono>
#include <pqxx/pqxx>
#include "crow_all.h"
#include "json.hpp"
#include "types.hpp"
#include "auth_helper.hpp"
#include "../../server/src/config/app_config.hpp"
#include "../../server/src/db/connection_pool.hpp"
#include "../../server/src/models/models.hpp"
#include "../../server/src/repositories/user_repository.hpp"
#include "../../server/src/services/profile_service.hpp"
#include "../../server/src/controllers/profile_controller.hpp"
#include "../../server/src/middleware/cors.hpp"

using namespace campuslab;
using json = nlohmann::json;

#define TEST_ASSERT(cond, msg) \
    do { \
        if (!(cond)) { \
            std::cerr << "[-] FAILED: " << msg << " (" << #cond << ") at line " << __LINE__ << std::endl; \
            exit(1); \
        } else { \
            std::cout << "[+] PASSED: " << msg << std::endl; \
        } \
    } while(0)

static crow::request make_get_req(const std::string& path, const std::string& token = "") {
    crow::request req;
    req.method = crow::HTTPMethod::GET;
    req.url = path;
    req.raw_url = path;
    if (!token.empty()) {
        req.add_header("Authorization", "Bearer " + token);
    }
    return req;
}

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << " Campus Lab - Profile Feature & Route Tests (/api/v1/profile) " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    DbConnectionPool pool(cfg.db_url, 4);
    ProfileService profile_service(pool);

    AppType app;
    ProfileController controller(profile_service, cfg.jwt_secret);
    controller.register_routes(app);
    app.validate();

    // -------------------------------------------------------------
    // 1. GET /api/v1/profile/me - Unauthenticated & Non-Existent User
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/profile/me Error Cases..." << std::endl;
    {
        // 1a. Unauthenticated request -> 401
        auto r_unauth = make_get_req("/api/v1/profile/me");
        crow::response res_unauth;
        app.handle_full(r_unauth, res_unauth);
        TEST_ASSERT(res_unauth.code == 401, "Unauthenticated profile request returns 401");
        TEST_ASSERT(json::parse(res_unauth.body)["message"] == "Unauthorized", "Confirms Unauthorized message");

        // 1b. Valid JWT token for non-existent user in DB -> 404
        std::string non_user_tok = AuthHelper::sign_jwt("00000000-0000-0000-0000-000000000000", "USER", cfg.jwt_secret);
        auto r_non = make_get_req("/api/v1/profile/me", non_user_tok);
        crow::response res_non;
        app.handle_full(r_non, res_non);
        TEST_ASSERT(res_non.code == 404, "Profile for non-existent user returns 404");
        TEST_ASSERT(json::parse(res_non.body)["message"] == "User not found", "Confirms User not found message");
    }

    // -------------------------------------------------------------
    // 2. GET /api/v1/profile/me - Authenticated Success & Analytics
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing GET /api/v1/profile/me Authenticated Analytics..." << std::endl;
    {
        int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
        OAuthUser test_user;
        std::string sample_pid;
        {
            auto g = pool.acquire();
            test_user = UserRepository::find_or_create_oauth_user(g.get(), "prof_rt_" + std::to_string(ts) + "@test.dev", "Profile Route Tester", "https://avatar.dev/p.png", "github");
            pqxx::work txn(g.get());
            auto p_row = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
            sample_pid = p_row[0][0].as<std::string>();

            // Mark problem solved
            txn.exec_params(
                "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT (\"userId\", \"problemId\") DO NOTHING",
                test_user.id, sample_pid
            );
            txn.commit();
        }
        std::string user_tok = AuthHelper::sign_jwt(test_user.id, test_user.role, cfg.jwt_secret);

        auto r_auth = make_get_req("/api/v1/profile/me", user_tok);
        crow::response res_auth;
        app.handle_full(r_auth, res_auth);
        TEST_ASSERT(res_auth.code == 200, "Authenticated profile returns 200 OK");
        auto body = json::parse(res_auth.body);
        TEST_ASSERT(body["success"] == true, "Success is true");
        TEST_ASSERT(body["profile"]["user"]["id"] == test_user.id, "Returned user ID matches");
        TEST_ASSERT(body["profile"]["user"]["name"] == "Profile Route Tester", "Returned user name matches");

        // Verify stats breakdown
        auto stats = body["profile"]["stats"];
        TEST_ASSERT(stats.contains("byDifficulty"), "Stats contains byDifficulty");
        TEST_ASSERT(stats["byDifficulty"].is_array() && stats["byDifficulty"].size() == 3, "byDifficulty has 3 tiers (Easy, Medium, Hard)");

        int total_catalog = 0;
        for (const auto& item : stats["byDifficulty"]) {
            total_catalog += item["total"].get<int>();
        }
        TEST_ASSERT(total_catalog == 250, "Total catalog size across difficulties equals 250 DSA problems");
        TEST_ASSERT(stats["totalSolved"].get<int>() >= 1, "totalSolved reflects at least 1 solved problem");
    }

    // -------------------------------------------------------------
    // 3. ProfileService Direct Edge Cases
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing ProfileService Edge Cases..." << std::endl;
    {
        auto non_opt = profile_service.get_profile("00000000-0000-0000-0000-000000000000");
        TEST_ASSERT(!non_opt.has_value(), "Direct service lookup for missing UUID returns nullopt");

        auto malformed_opt = profile_service.get_profile("not_a_valid_uuid_format");
        TEST_ASSERT(!malformed_opt.has_value(), "Direct service lookup for malformed ID safely returns nullopt");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL PROFILE FEATURE & ROUTE UNIT TESTS PASSED (100%)!   " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

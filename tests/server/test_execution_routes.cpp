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
#include "../../server/src/repositories/submission_repository.hpp"
#include "../../server/src/services/execution_service.hpp"
#include "../../server/src/controllers/execution_controller.hpp"
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

static crow::request make_post_req(const std::string& path, const std::string& body, const std::string& token = "") {
    crow::request req;
    req.method = crow::HTTPMethod::POST;
    req.url = path;
    req.raw_url = path;
    req.body = body;
    if (!token.empty()) {
        req.add_header("Authorization", "Bearer " + token);
    }
    return req;
}

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
    std::cout << " Campus Lab - Execution Feature & Route Tests (/api/v1/..)  " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    DbConnectionPool pool(cfg.db_url, 4);
    ExecutionService exec_service(pool, cfg.redis_host, cfg.redis_port);

    AppType app;
    ExecutionController controller(exec_service, cfg.jwt_secret);
    controller.register_routes(app);
    app.validate();

    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    OAuthUser test_user;
    {
        auto g = pool.acquire();
        test_user = UserRepository::find_or_create_oauth_user(g.get(), "exec_user_" + std::to_string(ts) + "@test.dev", "Exec User", "", "github");
    }
    std::string user_token = AuthHelper::sign_jwt(test_user.id, test_user.role, cfg.jwt_secret);

    // -------------------------------------------------------------
    // 1. POST /api/v1/code-execution/run - Validation & Rejections
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing POST /api/v1/code-execution/run Validation..." << std::endl;
    {
        // 1a. Unauthenticated -> 401
        auto r_unauth = make_post_req("/api/v1/code-execution/run", "{\"sourceCode\":\"int main(){}\"}");
        crow::response res_unauth;
        app.handle_full(r_unauth, res_unauth);
        TEST_ASSERT(res_unauth.code == 401, "Unauthenticated run returns 401");

        // 1b. Malformed JSON -> 400
        auto r_malformed = make_post_req("/api/v1/code-execution/run", "{invalid", user_token);
        crow::response res_malformed;
        app.handle_full(r_malformed, res_malformed);
        TEST_ASSERT(res_malformed.code == 400, "Malformed JSON returns 400");
        TEST_ASSERT(json::parse(res_malformed.body)["message"] == "Invalid JSON payload", "Confirms invalid JSON payload");

        // 1c. Empty sourceCode -> 400
        auto r_empty = make_post_req("/api/v1/code-execution/run", "{\"sourceCode\":\"\"}", user_token);
        crow::response res_empty;
        app.handle_full(r_empty, res_empty);
        TEST_ASSERT(res_empty.code == 400, "Empty sourceCode returns 400");
        TEST_ASSERT(json::parse(res_empty.body)["message"] == "Source code is required", "Confirms source code required");

        // 1d. Source code exceeding 64KB -> 413
        std::string huge_code(70000, 'x');
        json huge_body = {{"sourceCode", huge_code}};
        auto r_huge = make_post_req("/api/v1/code-execution/run", huge_body.dump(), user_token);
        crow::response res_huge;
        app.handle_full(r_huge, res_huge);
        TEST_ASSERT(res_huge.code == 413, "Source code > 64KB returns 413 Payload Too Large");
        TEST_ASSERT(json::parse(res_huge.body)["message"].get<std::string>().find("exceeds maximum") != std::string::npos, "Confirms exceeds 64KB message");
    }

    // -------------------------------------------------------------
    // 2. POST /api/v1/submission/submit - Validation & Missing Fields
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing POST /api/v1/submission/submit Validation..." << std::endl;
    {
        // 2a. Unauthenticated submit -> 401
        auto r_unauth = make_post_req("/api/v1/submission/submit", "{\"problemId\":\"pid\",\"sourceCode\":\"code\"}");
        crow::response res_unauth;
        app.handle_full(r_unauth, res_unauth);
        TEST_ASSERT(res_unauth.code == 401, "Unauthenticated submit returns 401");

        // 2b. Missing problemId -> 400
        auto r_nopid = make_post_req("/api/v1/submission/submit", "{\"sourceCode\":\"int main(){}\"}", user_token);
        crow::response res_nopid;
        app.handle_full(r_nopid, res_nopid);
        TEST_ASSERT(res_nopid.code == 400, "Missing problemId returns 400");
        TEST_ASSERT(json::parse(res_nopid.body)["message"] == "Missing problemId or sourceCode", "Confirms missing fields");

        // 2c. Empty sourceCode -> 400
        auto r_nosrc = make_post_req("/api/v1/submission/submit", "{\"problemId\":\"pid\",\"sourceCode\":\"\"}", user_token);
        crow::response res_nosrc;
        app.handle_full(r_nosrc, res_nosrc);
        TEST_ASSERT(res_nosrc.code == 400, "Empty sourceCode returns 400");

        // 2d. Non-existent problemId -> 404
        auto r_badpid = make_post_req("/api/v1/submission/submit", "{\"problemId\":\"00000000-0000-0000-0000-000000000000\",\"sourceCode\":\"int main(){}\"}", user_token);
        crow::response res_badpid;
        app.handle_full(r_badpid, res_badpid);
        TEST_ASSERT(res_badpid.code == 404, "Non-existent problemId returns 404");
        TEST_ASSERT(json::parse(res_badpid.body)["message"] == "Problem not found", "Confirms Problem not found message");
    }

    // -------------------------------------------------------------
    // 3. GET /api/v1/submission/:id - Retrieval & 404
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing GET /api/v1/submission/:id..." << std::endl;
    {
        // 3a. Non-existent submission ID -> 404
        auto r_404 = make_get_req("/api/v1/submission/00000000-0000-0000-0000-000000000000");
        crow::response res_404;
        app.handle_full(r_404, res_404);
        TEST_ASSERT(res_404.code == 404, "Non-existent submission returns 404");
        TEST_ASSERT(json::parse(res_404.body)["message"] == "Submission not found", "Confirms Submission not found");

        // 3b. Create submission directly in DB and retrieve via route
        std::string sample_pid;
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            auto r = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
            sample_pid = r[0][0].as<std::string>();
        }
        std::string sub_id;
        {
            auto g = pool.acquire();
            sub_id = SubmissionRepository::create_submission(g.get(), test_user.id, sample_pid, "int main(){ return 0; }");
        }
        TEST_ASSERT(!sub_id.empty(), "Submission row created");

        auto r_get = make_get_req("/api/v1/submission/" + sub_id);
        crow::response res_get;
        app.handle_full(r_get, res_get);
        TEST_ASSERT(res_get.code == 200, "Existing submission ID returns 200 OK");
        auto body_get = json::parse(res_get.body);
        TEST_ASSERT(body_get["success"] == true, "Success is true");
        TEST_ASSERT(body_get["submission"]["id"] == sub_id, "Returned submission ID matches");
        TEST_ASSERT(body_get["submission"]["status"] == "Pending", "Initial status is Pending");
    }

    // -------------------------------------------------------------
    // 4. GET /api/v1/submission/problem/:id - History & Unauthenticated
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing GET /api/v1/submission/problem/:id..." << std::endl;
    {
        std::string sample_pid;
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            auto r = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
            sample_pid = r[0][0].as<std::string>();
        }

        // 4a. Unauthenticated -> 401
        auto r_unauth = make_get_req("/api/v1/submission/problem/" + sample_pid);
        crow::response res_unauth;
        app.handle_full(r_unauth, res_unauth);
        TEST_ASSERT(res_unauth.code == 401, "Unauthenticated history request returns 401");

        // 4b. Authenticated -> 200 with list
        auto r_auth = make_get_req("/api/v1/submission/problem/" + sample_pid, user_token);
        crow::response res_auth;
        app.handle_full(r_auth, res_auth);
        TEST_ASSERT(res_auth.code == 200, "Authenticated history request returns 200");
        auto body_auth = json::parse(res_auth.body);
        TEST_ASSERT(body_auth["success"] == true, "Success is true");
        TEST_ASSERT(body_auth["submissions"].is_array(), "Submissions is an array");
        TEST_ASSERT(body_auth["submissions"].size() >= 1, "Contains at least 1 submission created above");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL EXECUTION FEATURE & ROUTE UNIT TESTS PASSED (100%)! " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

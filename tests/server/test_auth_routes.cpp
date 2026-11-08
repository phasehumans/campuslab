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
#include "../../server/src/services/auth_service.hpp"
#include "../../server/src/controllers/auth_controller.hpp"
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

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << "  Campus Lab - Auth Feature & Route Tests (/api/v1/auth)  " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    DbConnectionPool pool(cfg.db_url, 4);
    AuthService auth_service(pool, cfg.jwt_secret);

    AppType app;
    AuthController controller(auth_service, cfg.jwt_secret, cfg.github_client_id, cfg.github_client_secret, cfg.google_client_id, cfg.google_client_secret);
    controller.register_routes(app);
    app.validate();

    // -------------------------------------------------------------
    // 1. GET /api/v1/auth/me - Unauthenticated & Malformed Token Rejection
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/auth/me Unauthenticated & Malformed Rejections..." << std::endl;
    {
        // 1a. Missing token entirely
        crow::request req;
        req.url = "/api/v1/auth/me";
        req.method = crow::HTTPMethod::GET;
        crow::response res;
        app.handle_full(req, res);
        TEST_ASSERT(res.code == 401, "No auth header returns 401 Unauthorized");
        auto body = json::parse(res.body);
        TEST_ASSERT(body["success"] == false, "Body indicates failure");
        TEST_ASSERT(body["message"] == "Unauthorized", "Message confirms Unauthorized");

        // 1b. Malformed token (garbage string)
        crow::request req2;
        req2.url = "/api/v1/auth/me";
        req2.method = crow::HTTPMethod::GET;
        req2.add_header("Authorization", "Bearer not_a_real_jwt_token_garbage");
        crow::response res2;
        app.handle_full(req2, res2);
        TEST_ASSERT(res2.code == 401, "Garbage token returns 401");

        // 1c. Expired token
        json exp_payload = {{"id", "user_test_exp"}, {"role", "USER"}, {"exp", 1000000000}};
        json jwt_hdr = {{"alg", "HS256"}, {"typ", "JWT"}};
        std::string exp_to_sign = AuthHelper::base64_url_encode(jwt_hdr.dump()) + "." + AuthHelper::base64_url_encode(exp_payload.dump());
        std::string exp_token = exp_to_sign + "." + AuthHelper::base64_url_encode(AuthHelper::hmac_sha256(exp_to_sign, cfg.jwt_secret));

        crow::request req3;
        req3.url = "/api/v1/auth/me";
        req3.method = crow::HTTPMethod::GET;
        req3.add_header("Authorization", "Bearer " + exp_token);
        crow::response res3;
        app.handle_full(req3, res3);
        TEST_ASSERT(res3.code == 401, "Expired token returns 401");

        // 1d. Token signed with wrong secret key
        std::string bad_secret_token = AuthHelper::sign_jwt("user_attacker", "ADMIN", "wrong_secret_key_123");
        crow::request req4;
        req4.url = "/api/v1/auth/me";
        req4.method = crow::HTTPMethod::GET;
        req4.add_header("Authorization", "Bearer " + bad_secret_token);
        crow::response res4;
        app.handle_full(req4, res4);
        TEST_ASSERT(res4.code == 401, "Token with wrong secret returns 401");

        // 1e. Valid JWT token but non-existent user in DB -> 404
        std::string non_user_token = AuthHelper::sign_jwt("00000000-0000-0000-0000-000000000000", "USER", cfg.jwt_secret);
        crow::request req5;
        req5.url = "/api/v1/auth/me";
        req5.method = crow::HTTPMethod::GET;
        req5.add_header("Authorization", "Bearer " + non_user_token);
        crow::response res5;
        app.handle_full(req5, res5);
        TEST_ASSERT(res5.code == 404, "Valid token for non-existent user returns 404 User not found");
    }

    // -------------------------------------------------------------
    // 2. GET /api/v1/auth/me - Authenticated Success (Header vs Cookie)
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing GET /api/v1/auth/me Authenticated Success..." << std::endl;
    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    std::string test_email = "auth_route_test_" + std::to_string(ts) + "@test.dev";
    std::string test_name = "Auth Route Tester";
    OAuthUser test_user;
    {
        auto g = pool.acquire();
        test_user = UserRepository::find_or_create_oauth_user(g.get(), test_email, test_name, "https://avatar.dev/me.png", "github");
    }
    std::string valid_token = AuthHelper::sign_jwt(test_user.id, test_user.role, cfg.jwt_secret);

    // 2a. Via Authorization: Bearer header
    {
        crow::request req;
        req.url = "/api/v1/auth/me";
        req.method = crow::HTTPMethod::GET;
        req.add_header("Authorization", "Bearer " + valid_token);
        crow::response res;
        app.handle_full(req, res);
        TEST_ASSERT(res.code == 200, "Valid bearer token returns 200 OK");
        auto body = json::parse(res.body);
        TEST_ASSERT(body["success"] == true, "Body indicates success");
        TEST_ASSERT(body["user"]["id"] == test_user.id, "Returned user ID matches");
        TEST_ASSERT(body["user"]["email"] == test_email, "Returned email matches");
        TEST_ASSERT(body["user"]["name"] == test_name, "Returned name matches");
    }

    // 2b. Via Cookie header
    {
        crow::request req;
        req.url = "/api/v1/auth/me";
        req.method = crow::HTTPMethod::GET;
        req.add_header("Cookie", "session=xyz; token=" + valid_token + "; theme=dark");
        crow::response res;
        app.handle_full(req, res);
        TEST_ASSERT(res.code == 200, "Valid cookie token returns 200 OK");
        auto body = json::parse(res.body);
        TEST_ASSERT(body["user"]["id"] == test_user.id, "Cookie user matches");
    }

    // -------------------------------------------------------------
    // 3. POST /api/v1/auth/logout - Invalidate Cookie
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing POST /api/v1/auth/logout..." << std::endl;
    {
        crow::request req;
        req.url = "/api/v1/auth/logout";
        req.method = crow::HTTPMethod::POST;
        crow::response res;
        app.handle_full(req, res);
        TEST_ASSERT(res.code == 200, "Logout returns 200 OK");
        auto body = json::parse(res.body);
        TEST_ASSERT(body["success"] == true, "Logout success true");
        std::string set_cookie = res.get_header_value("Set-Cookie");
        TEST_ASSERT(set_cookie.find("Max-Age=0") != std::string::npos || set_cookie.find("token=;") != std::string::npos, "Set-Cookie clears token");
    }

    // -------------------------------------------------------------
    // 4. POST /api/v1/auth/signup & /api/v1/auth/login - 410 Retired Endpoints
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing Retired 410 Password Endpoints..." << std::endl;
    {
        crow::request req_signup;
        req_signup.url = "/api/v1/auth/signup";
        req_signup.method = crow::HTTPMethod::POST;
        crow::response res_signup;
        app.handle_full(req_signup, res_signup);
        TEST_ASSERT(res_signup.code == 410, "Signup endpoint returns 410 Gone");

        crow::request req_login;
        req_login.url = "/api/v1/auth/login";
        req_login.method = crow::HTTPMethod::POST;
        crow::response res_login;
        app.handle_full(req_login, res_login);
        TEST_ASSERT(res_login.code == 410, "Login endpoint returns 410 Gone");
    }

    // -------------------------------------------------------------
    // 5. POST /api/v1/auth/oauth - Input Validation & Error Handling
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing POST /api/v1/auth/oauth Input Validation & Error Responses..." << std::endl;
    {
        // 5a. Empty body
        crow::request req1;
        req1.url = "/api/v1/auth/oauth";
        req1.method = crow::HTTPMethod::POST;
        req1.body = "";
        crow::response res1;
        app.handle_full(req1, res1);
        TEST_ASSERT(res1.code == 400, "Empty POST body returns 400");
        TEST_ASSERT(json::parse(res1.body)["message"] == "Invalid JSON payload", "Confirms invalid JSON payload");

        // 5b. Invalid JSON syntax
        crow::request req2;
        req2.url = "/api/v1/auth/oauth";
        req2.method = crow::HTTPMethod::POST;
        req2.body = "{not_json";
        crow::response res2;
        app.handle_full(req2, res2);
        TEST_ASSERT(res2.code == 400, "Malformed JSON returns 400");
        TEST_ASSERT(json::parse(res2.body)["message"] == "Invalid JSON payload", "Confirms invalid JSON payload");

        // 5c. Empty GitHub authorization code
        crow::request req3;
        req3.url = "/api/v1/auth/oauth";
        req3.method = crow::HTTPMethod::POST;
        req3.body = "{\"provider\":\"github\",\"code\":\"\"}";
        crow::response res3;
        app.handle_full(req3, res3);
        TEST_ASSERT(res3.code == 400, "Empty GitHub code returns 400");
        TEST_ASSERT(json::parse(res3.body)["message"] == "GitHub authorization code is required", "Confirms GitHub authorization code is required");

        // 5d. Empty Google credential
        crow::request req4;
        req4.url = "/api/v1/auth/oauth";
        req4.method = crow::HTTPMethod::POST;
        req4.body = "{\"provider\":\"google\",\"credential\":\"\"}";
        crow::response res4;
        app.handle_full(req4, res4);
        TEST_ASSERT(res4.code == 400, "Empty Google credential returns 400");
        TEST_ASSERT(json::parse(res4.body)["message"] == "Google credential token is required", "Confirms Google credential token is required");

        // 5e. Empty Google authorization code
        crow::request req5;
        req5.url = "/api/v1/auth/oauth";
        req5.method = crow::HTTPMethod::POST;
        req5.body = "{\"provider\":\"google\",\"code\":\"\"}";
        crow::response res5;
        app.handle_full(req5, res5);
        TEST_ASSERT(res5.code == 400, "Empty Google authorization code returns 400");
        TEST_ASSERT(json::parse(res5.body)["message"] == "Google authorization code is required", "Confirms Google authorization code is required");
    }

    // -------------------------------------------------------------
    // 6. AuthService Edge Cases & Fallbacks
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing AuthService Edge Cases & OAuth Fallbacks..." << std::endl;
    {
        // 6a. Fallback naming when email and name are empty
        auto fb = auth_service.handle_oauth("github", "", "", "");
        TEST_ASSERT(fb.success, "Fallback oauth handles empty email and name");
        TEST_ASSERT(fb.user.email == "github_user@campuslab.dev", "Default github email assigned");
        TEST_ASSERT(fb.user.name == "GitHub User", "Default github name assigned");

        // 6b. Idempotency: re-login with same credentials
        auto fb_again = auth_service.handle_oauth("github", fb.user.email, fb.user.name, "");
        TEST_ASSERT(fb_again.user.id == fb.user.id, "Subsequent login returns existing user ID");

        // 6c. Unicode characters in user name
        std::string uni_name = "José María Álvarez 🚀";
        std::string uni_email = "jose_" + std::to_string(ts) + "@campuslab.dev";
        auto uni_user = auth_service.handle_oauth("google", uni_email, uni_name, "");
        TEST_ASSERT(uni_user.success, "Unicode name handled safely");
        TEST_ASSERT(uni_user.user.name == uni_name, "Unicode name preserved accurately");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL AUTH FEATURE & ROUTE UNIT TESTS PASSED (100%)!      " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

#include <iostream>
#include <cassert>
#include <string>
#include <chrono>
#include <vector>
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

    // Helper lambda to dispatch requests
    auto dispatch = [&](crow::HTTPMethod method, const std::string& path, const std::string& body = "", const std::vector<std::pair<std::string, std::string>>& headers = {}) {
        crow::request req;
        req.url = path;
        req.method = method;
        req.body = body;
        for (const auto& h : headers) {
            req.add_header(h.first, h.second);
        }
        crow::response res;
        app.handle_full(req, res);
        return res;
    };

    // -------------------------------------------------------------
    // Part 1: GET /api/v1/auth/me - Unauthenticated & Malformed Token Rejection
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/auth/me Unauthenticated & Malformed Rejections..." << std::endl;
    {
        // 1a. Missing token entirely
        auto res = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me");
        TEST_ASSERT(res.code == 401, "No auth header returns 401 Unauthorized");
        auto body = json::parse(res.body);
        TEST_ASSERT(body["success"] == false, "Body indicates failure");
        TEST_ASSERT(body["message"] == "Unauthorized", "Message confirms Unauthorized");

        // 1b. Garbage token string
        auto res2 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer not_a_real_jwt_token_garbage"}});
        TEST_ASSERT(res2.code == 401, "Garbage token returns 401");

        // 1c. Expired token
        json exp_payload = {{"id", "user_test_exp"}, {"role", "USER"}, {"exp", 1000000000}};
        json jwt_hdr = {{"alg", "HS256"}, {"typ", "JWT"}};
        std::string exp_to_sign = AuthHelper::base64_url_encode(jwt_hdr.dump()) + "." + AuthHelper::base64_url_encode(exp_payload.dump());
        std::string exp_token = exp_to_sign + "." + AuthHelper::base64_url_encode(AuthHelper::hmac_sha256(exp_to_sign, cfg.jwt_secret));
        auto res3 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + exp_token}});
        TEST_ASSERT(res3.code == 401, "Expired token returns 401");

        // 1d. Token signed with wrong secret key
        std::string bad_secret_token = AuthHelper::sign_jwt("user_attacker", "ADMIN", "wrong_secret_key_123");
        auto res4 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + bad_secret_token}});
        TEST_ASSERT(res4.code == 401, "Token with wrong secret returns 401");

        // 1e. Valid JWT token but non-existent user in DB -> 404
        std::string non_user_token = AuthHelper::sign_jwt("00000000-0000-0000-0000-000000000000", "USER", cfg.jwt_secret);
        auto res5 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + non_user_token}});
        TEST_ASSERT(res5.code == 404, "Valid token for non-existent user returns 404");
        auto body5 = json::parse(res5.body);
        TEST_ASSERT(body5["message"] == "User not found", "Message confirms user not found");
    }

    // -------------------------------------------------------------
    // Part 2: GET /api/v1/auth/me - Header Formatting Edge Cases (50+ Route Tests Expansion)
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing GET /api/v1/auth/me Header Variations & Token Formats..." << std::endl;
    {
        // 2.1 Empty Bearer token
        auto r1 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer "}});
        TEST_ASSERT(r1.code == 401, "Empty Bearer token returns 401");

        // 2.2 Bearer without trailing space
        auto r2 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer"}});
        TEST_ASSERT(r2.code == 401, "Bearer without token returns 401");

        // 2.3 Basic auth header
        auto r3 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Basic dXNlcjpwYXNz"}});
        TEST_ASSERT(r3.code == 401, "Basic auth header rejected with 401");

        // 2.4 Token prefix without Bearer
        auto r4 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Token abcdef12345"}});
        TEST_ASSERT(r4.code == 401, "Token prefix rejected with 401");

        // 2.5 Only one dot in JWT
        auto r5 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer header.payload"}});
        TEST_ASSERT(r5.code == 401, "JWT with 1 dot rejected with 401");

        // 2.6 Three dots in JWT
        auto r6 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer a.b.c.d"}});
        TEST_ASSERT(r6.code == 401, "JWT with 3 dots rejected with 401");

        // 2.7 Empty payload JWT
        auto r7 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9..sig"}});
        TEST_ASSERT(r7.code == 401, "JWT with empty payload rejected with 401");

        // 2.8 Invalid base64 characters in header
        auto r8 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer @#$%.eyJpZCI6IjEifQ.sig"}});
        TEST_ASSERT(r8.code == 401, "Invalid base64 header rejected with 401");

        // 2.9 Invalid base64 characters in signature
        auto r9 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEifQ.***!!!"}});
        TEST_ASSERT(r9.code == 401, "Invalid base64 signature rejected with 401");

        // 2.10 Cookie with empty value
        auto r10 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Cookie", "token="}});
        TEST_ASSERT(r10.code == 401, "Empty token cookie returns 401");

        // 2.11 Cookie with spaces
        auto r10b = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Cookie", "token=   "}});
        TEST_ASSERT(r10b.code == 401, "Whitespace token cookie returns 401");

        // 2.12 Cookie with multiple attributes but no token
        auto r11 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Cookie", "theme=dark; session_id=xyz123; lang=en"}});
        TEST_ASSERT(r11.code == 401, "Cookie without token returns 401");

        // 2.13 SQL Injection attempt in JWT user_id
        std::string sqli_token = AuthHelper::sign_jwt("' OR 1=1 --", "USER", cfg.jwt_secret);
        auto r12 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + sqli_token}});
        TEST_ASSERT(r12.code == 404, "SQLi in JWT user ID safely handled and returns 404");

        // 2.14 XSS attempt in JWT user_id
        std::string xss_token = AuthHelper::sign_jwt("<script>alert(1)</script>", "USER", cfg.jwt_secret);
        auto r13 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + xss_token}});
        TEST_ASSERT(r13.code == 404, "XSS in JWT user ID safely handled and returns 404");

        // 2.15 Malformed UUID format in JWT
        std::string malformed_uuid_token = AuthHelper::sign_jwt("not-a-valid-uuid-1234", "USER", cfg.jwt_secret);
        auto r14 = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + malformed_uuid_token}});
        TEST_ASSERT(r14.code == 404, "Non-UUID string safely handled without crash");
    }

    // -------------------------------------------------------------
    // Part 3: Authenticated User Lookup & Cookie Authentication
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing GET /api/v1/auth/me Authenticated Profiles..." << std::endl;
    {
        // Fetch a real seeded user from DB
        std::string real_user_id, real_user_email;
        {
            auto conn = pool.acquire();
            pqxx::work txn(conn.get());
            auto r = txn.exec("SELECT id, email FROM \"User\" LIMIT 1");
            TEST_ASSERT(!r.empty(), "Seeded user found in DB");
            real_user_id = r[0]["id"].as<std::string>();
            real_user_email = r[0]["email"].as<std::string>();
        }

        std::string valid_token = AuthHelper::sign_jwt(real_user_id, "USER", cfg.jwt_secret);

        // 3.1 Bearer Authorization header
        auto r_bearer = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + valid_token}});
        TEST_ASSERT(r_bearer.code == 200, "Valid Bearer token returns 200 OK");
        auto body_b = json::parse(r_bearer.body);
        TEST_ASSERT(body_b["success"] == true, "success is true");
        TEST_ASSERT(body_b["user"]["id"] == real_user_id, "User ID matches in body");
        TEST_ASSERT(body_b["user"]["email"] == real_user_email, "User email matches in body");

        // 3.2 Cookie Authorization
        auto r_cookie = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Cookie", "token=" + valid_token}});
        TEST_ASSERT(r_cookie.code == 200, "Valid token in Cookie returns 200 OK");
        auto body_c = json::parse(r_cookie.body);
        TEST_ASSERT(body_c["user"]["id"] == real_user_id, "User ID matches via cookie");

        // 3.3 Multiple cookies with token embedded in the middle
        auto r_multi_c = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Cookie", "lang=en; token=" + valid_token + "; analytics=false"}});
        TEST_ASSERT(r_multi_c.code == 200, "Token embedded among other cookies succeeds");

        // 3.4 Invalid Bearer takes precedence over valid Cookie -> 401
        auto r_prec = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {
            {"Authorization", "Bearer invalid_token"},
            {"Cookie", "token=" + valid_token}
        });
        TEST_ASSERT(r_prec.code == 401, "Invalid Bearer takes precedence and returns 401");

        // 3.5 Content-Type header on /me response
        TEST_ASSERT(r_bearer.get_header_value("Content-Type") == "application/json", "/me returns application/json");
    }

    // -------------------------------------------------------------
    // Part 4: Retired Endpoints (/signup & /login) - Negative Exhaustive Checks
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing Retired Endpoints (/signup & /login) Exhaustive Payloads..." << std::endl;
    {
        // 4.1-4.5 POST /signup with various payloads
        auto r_s1 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/signup", "");
        TEST_ASSERT(r_s1.code == 410, "Empty signup payload returns 410 Gone");

        auto r_s2 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/signup", "{\"email\":\"test@test.com\",\"password\":\"123456\"}");
        TEST_ASSERT(r_s2.code == 410, "Standard signup returns 410");
        auto b_s2 = json::parse(r_s2.body);
        TEST_ASSERT(b_s2["success"] == false, "Signup body indicates failure");
        TEST_ASSERT(b_s2["message"].get<std::string>().find("retired") != std::string::npos, "Signup message mentions retired");

        auto r_s3 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/signup", "{{invalid_json");
        TEST_ASSERT(r_s3.code == 410, "Malformed json signup returns 410");

        auto r_s4 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/signup", std::string(50000, 'x'));
        TEST_ASSERT(r_s4.code == 410, "Large payload signup returns 410");

        // 4.6-4.10 POST /login with various payloads
        auto r_l1 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/login", "");
        TEST_ASSERT(r_l1.code == 410, "Empty login payload returns 410 Gone");

        auto r_l2 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/login", "{\"email\":\"admin@test.com\",\"password\":\"secret\"}");
        TEST_ASSERT(r_l2.code == 410, "Standard login returns 410");
        auto b_l2 = json::parse(r_l2.body);
        TEST_ASSERT(b_l2["success"] == false, "Login body indicates failure");
        TEST_ASSERT(b_l2["message"].get<std::string>().find("retired") != std::string::npos, "Login message mentions retired");

        auto r_l3 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/login", "['array_not_object']");
        TEST_ASSERT(r_l3.code == 410, "Array json login returns 410");

        auto r_l4 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/login", "{\"email\":\"' OR 1=1 --\"}");
        TEST_ASSERT(r_l4.code == 410, "SQLi login payload returns 410");
    }

    // -------------------------------------------------------------
    // Part 5: POST /api/v1/auth/logout - Comprehensive Cookie Clearance
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing POST /api/v1/auth/logout..." << std::endl;
    {
        // 5.1 Simple logout
        auto r_out = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/logout");
        TEST_ASSERT(r_out.code == 200, "Logout returns 200 OK");
        auto b_out = json::parse(r_out.body);
        TEST_ASSERT(b_out["success"] == true, "Logout success is true");
        TEST_ASSERT(b_out["message"] == "Logged out successfully", "Logout message confirmed");

        // 5.2 Verify Set-Cookie header parameters
        std::string set_cookie = r_out.get_header_value("Set-Cookie");
        TEST_ASSERT(set_cookie.find("token=") != std::string::npos, "Set-Cookie clears token");
        TEST_ASSERT(set_cookie.find("Max-Age=0") != std::string::npos, "Set-Cookie has Max-Age=0");
        TEST_ASSERT(set_cookie.find("Path=/") != std::string::npos, "Set-Cookie has Path=/");
        TEST_ASSERT(set_cookie.find("HttpOnly") != std::string::npos, "Set-Cookie is HttpOnly");
        TEST_ASSERT(set_cookie.find("Secure") != std::string::npos, "Set-Cookie is Secure");
        TEST_ASSERT(set_cookie.find("SameSite=None") != std::string::npos, "Set-Cookie is SameSite=None");

        // 5.3 Logout with existing bearer token
        auto r_out_tok = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/logout", "", {{"Authorization", "Bearer some_active_token"}});
        TEST_ASSERT(r_out_tok.code == 200, "Logout with active token returns 200");

        // 5.4 Logout with body provided (ignored safely)
        auto r_out_body = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/logout", "{\"reason\":\"user_quit\"}");
        TEST_ASSERT(r_out_body.code == 200, "Logout with body returns 200");
    }

    // -------------------------------------------------------------
    // Part 6: POST /api/v1/auth/oauth - Validation, Bad Payloads & Error Handling
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing POST /api/v1/auth/oauth Validation & Rejections..." << std::endl;
    {
        // 6.1 Empty body -> 400
        auto r_o1 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "");
        TEST_ASSERT(r_o1.code == 400, "Empty body to /oauth returns 400");
        auto b_o1 = json::parse(r_o1.body);
        TEST_ASSERT(b_o1["message"] == "Invalid JSON payload", "Correct error message on empty payload");

        // 6.2 Malformed JSON syntax -> 400
        auto r_o2 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{provider: github");
        TEST_ASSERT(r_o2.code == 400, "Malformed JSON returns 400");

        // 6.3 Empty string JSON
        auto r_o3 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "\"plain string\"");
        TEST_ASSERT(r_o3.code == 400 || r_o3.code == 500, "Non-object JSON handled safely");

        // 6.4 Numeric JSON
        auto r_o4 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "12345");
        TEST_ASSERT(r_o4.code == 400 || r_o4.code == 500, "Numeric JSON handled safely");

        // 6.5 Array JSON
        auto r_o5 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "[]");
        TEST_ASSERT(r_o5.code == 400 || r_o5.code == 500, "Array JSON handled safely");

        // 6.6 GitHub OAuth with empty code -> 400
        auto r_o6 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{\"provider\":\"github\",\"code\":\"\"}");
        TEST_ASSERT(r_o6.code == 400, "Empty GitHub code returns 400");
        auto b_o6 = json::parse(r_o6.body);
        TEST_ASSERT(b_o6["message"] == "GitHub authorization code is required", "Confirmed code required message");

        // 6.7 GitHub OAuth with whitespace code -> 400
        auto r_o7 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{\"provider\":\"github\",\"code\":\"   \"}");
        TEST_ASSERT(r_o7.code == 400 || r_o7.code == 502, "Whitespace GitHub code handled safely");

        // 6.8 Google OAuth with empty credential -> 400
        auto r_o8 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{\"provider\":\"google\",\"credential\":\"\"}");
        TEST_ASSERT(r_o8.code == 400, "Empty Google credential returns 400");
        auto b_o8 = json::parse(r_o8.body);
        TEST_ASSERT(b_o8["message"] == "Google credential token is required", "Confirmed credential required message");

        // 6.9 Google OAuth with whitespace credential -> 400
        auto r_o9 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{\"provider\":\"google\",\"credential\":\"   \"}");
        TEST_ASSERT(r_o9.code == 400 || r_o9.code == 502, "Whitespace Google credential handled safely");

        // 6.10 Google OAuth with empty code -> 400
        auto r_o10 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{\"provider\":\"google\",\"code\":\"\"}");
        TEST_ASSERT(r_o10.code == 400, "Empty Google code returns 400");
        auto b_o10 = json::parse(r_o10.body);
        TEST_ASSERT(b_o10["message"] == "Google authorization code is required", "Confirmed code required message");

        // 6.11 Google OAuth with whitespace code -> 400
        auto r_o11 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", "{\"provider\":\"google\",\"code\":\"   \"}");
        TEST_ASSERT(r_o11.code == 400 || r_o11.code == 502, "Whitespace Google code handled safely");
    }

    // -------------------------------------------------------------
    // Part 7: POST /api/v1/auth/oauth - Fallback User Creation & Roundtrip Authentication
    // -------------------------------------------------------------
    std::cout << "\n[7] Testing POST /api/v1/auth/oauth Direct & Fallback Flows..." << std::endl;
    {
        // 7.1 Direct custom OAuth fallback
        std::string ts = std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        std::string test_email = "test_oauth_" + ts + "@campuslab.io";
        json oauth_payload = {
            {"provider", "custom_provider"},
            {"email", test_email},
            {"name", "Test Oauth User"},
            {"avatar", "https://example.com/avatar.png"}
        };
        auto r_fb = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", oauth_payload.dump());
        TEST_ASSERT(r_fb.code == 200, "Direct OAuth returns 200 OK");
        auto b_fb = json::parse(r_fb.body);
        TEST_ASSERT(b_fb["success"] == true, "success is true");
        TEST_ASSERT(b_fb["user"]["email"] == test_email, "User email returned");
        TEST_ASSERT(b_fb["user"]["name"] == "Test Oauth User", "User name returned");
        TEST_ASSERT(b_fb["user"]["provider"] == "custom_provider", "Provider recorded");
        TEST_ASSERT(!b_fb["token"].get<std::string>().empty(), "Token returned");

        // 7.2 Verify cookie is set on successful oauth
        std::string cookie_hdr = r_fb.get_header_value("Set-Cookie");
        TEST_ASSERT(cookie_hdr.find("token=" + b_fb["token"].get<std::string>()) != std::string::npos, "Returned token set in Cookie");
        TEST_ASSERT(cookie_hdr.find("Max-Age=604800") != std::string::npos, "Cookie has 7-day TTL (604800)");

        // 7.3 Immediate use of returned token in /api/v1/auth/me
        std::string new_token = b_fb["token"].get<std::string>();
        auto r_me_new = dispatch(crow::HTTPMethod::GET, "/api/v1/auth/me", "", {{"Authorization", "Bearer " + new_token}});
        TEST_ASSERT(r_me_new.code == 200, "Newly issued OAuth token immediately authenticates /me");
        auto b_me_new = json::parse(r_me_new.body);
        TEST_ASSERT(b_me_new["user"]["email"] == test_email, "Email matches on /me");

        // 7.4 Subsequent OAuth with same email -> returns existing user idempotently
        auto r_fb2 = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", oauth_payload.dump());
        TEST_ASSERT(r_fb2.code == 200, "Subsequent OAuth returns 200 OK");
        auto b_fb2 = json::parse(r_fb2.body);
        TEST_ASSERT(b_fb2["user"]["id"] == b_fb["user"]["id"], "Subsequent OAuth returns identical existing user ID");

        // 7.5 OAuth with empty name and email generates fallback
        json empty_info = {{"provider", "github"}};
        auto r_empty = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", empty_info.dump());
        TEST_ASSERT(r_empty.code == 200, "OAuth without email/name generates fallbacks with 200 OK");
        auto b_empty = json::parse(r_empty.body);
        TEST_ASSERT(!b_empty["user"]["id"].get<std::string>().empty(), "User ID generated");
        std::string gen_email = b_empty["user"]["email"].get<std::string>();
        TEST_ASSERT(gen_email.find("campuslab.dev") != std::string::npos, "Default github email generated");

        // 7.6 OAuth with Unicode and special characters
        std::string ts_u = std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        json unicode_payload = {
            {"provider", "gitlab"},
            {"email", "unicode_" + ts_u + "@campuslab.io"},
            {"name", "⚡ Chaitanya 🚀 程序员"},
            {"avatar", "https://cdn.example.com/🚀.png"}
        };
        auto r_uni = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", unicode_payload.dump());
        TEST_ASSERT(r_uni.code == 200, "Unicode characters in OAuth handled with 200 OK");
        auto b_uni = json::parse(r_uni.body);
        TEST_ASSERT(b_uni["user"]["name"] == "⚡ Chaitanya 🚀 程序员", "Unicode name intact");

        // 7.7 Very long email boundary check
        std::string long_email = std::string(100, 'a') + "@domain.com";
        json long_payload = {{"provider", "custom"}, {"email", long_email}, {"name", "Long Email"}};
        auto r_long = dispatch(crow::HTTPMethod::POST, "/api/v1/auth/oauth", long_payload.dump());
        TEST_ASSERT(r_long.code == 200, "Long email handled successfully");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL AUTH FEATURE & ROUTE UNIT TESTS PASSED (100%)!      " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

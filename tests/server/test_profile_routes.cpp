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

static crow::request make_get_req(const std::string& path, const std::string& token = "", const std::string& cookie = "") {
    crow::request req;
    req.method = crow::HTTPMethod::GET;
    req.url = path;
    req.raw_url = path;
    if (!token.empty()) {
        req.add_header("Authorization", "Bearer " + token);
    }
    if (!cookie.empty()) {
        req.add_header("Cookie", cookie);
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

    auto get_resp = [&](const std::string& path, const std::string& token = "", const std::string& cookie = "") {
        auto req = make_get_req(path, token, cookie);
        crow::response res;
        app.handle_full(req, res);
        return res;
    };

    // -------------------------------------------------------------
    // Part 1: GET /api/v1/profile/me - Unauthenticated & Malformed Token Rejections
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/profile/me Unauthenticated & Malformed Rejections..." << std::endl;
    {
        // 1.1 Unauthenticated request -> 401
        auto r_unauth = get_resp("/api/v1/profile/me");
        TEST_ASSERT(r_unauth.code == 401, "Unauthenticated profile request returns 401");
        auto b_unauth = json::parse(r_unauth.body);
        TEST_ASSERT(b_unauth["message"] == "Unauthorized", "Confirms Unauthorized message");

        // 1.2 Garbage token -> 401
        auto r_garbage = get_resp("/api/v1/profile/me", "garbage_jwt_token_string");
        TEST_ASSERT(r_garbage.code == 401, "Garbage token returns 401");

        // 1.3 Empty Bearer token -> 401
        crow::request req_eb;
        req_eb.url = "/api/v1/profile/me";
        req_eb.method = crow::HTTPMethod::GET;
        req_eb.add_header("Authorization", "Bearer ");
        crow::response res_eb;
        app.handle_full(req_eb, res_eb);
        TEST_ASSERT(res_eb.code == 401, "Empty Bearer token returns 401");

        // 1.4 Basic Auth -> 401
        crow::request req_ba;
        req_ba.url = "/api/v1/profile/me";
        req_ba.method = crow::HTTPMethod::GET;
        req_ba.add_header("Authorization", "Basic user:pass");
        crow::response res_ba;
        app.handle_full(req_ba, res_ba);
        TEST_ASSERT(res_ba.code == 401, "Basic Auth returns 401");

        // 1.5 Expired token -> 401
        json exp_payload = {{"id", "user_exp"}, {"role", "USER"}, {"exp", 1000000000}};
        json jwt_hdr = {{"alg", "HS256"}, {"typ", "JWT"}};
        std::string exp_to_sign = AuthHelper::base64_url_encode(jwt_hdr.dump()) + "." + AuthHelper::base64_url_encode(exp_payload.dump());
        std::string exp_token = exp_to_sign + "." + AuthHelper::base64_url_encode(AuthHelper::hmac_sha256(exp_to_sign, cfg.jwt_secret));
        auto r_exp = get_resp("/api/v1/profile/me", exp_token);
        TEST_ASSERT(r_exp.code == 401, "Expired token returns 401");

        // 1.6 Token signed with wrong secret -> 401
        std::string bad_secret_token = AuthHelper::sign_jwt("user_xyz", "USER", "wrong_key_123");
        auto r_bad_sec = get_resp("/api/v1/profile/me", bad_secret_token);
        TEST_ASSERT(r_bad_sec.code == 401, "Wrong secret token returns 401");

        // 1.7 Valid JWT token for non-existent user in DB -> 404
        std::string non_user_tok = AuthHelper::sign_jwt("00000000-0000-0000-0000-000000000000", "USER", cfg.jwt_secret);
        auto r_non = get_resp("/api/v1/profile/me", non_user_tok);
        TEST_ASSERT(r_non.code == 404, "Profile for non-existent user returns 404");
        auto b_non = json::parse(r_non.body);
        TEST_ASSERT(b_non["message"] == "User not found", "Confirms User not found message");

        // 1.8 Malformed non-UUID user in JWT -> 404
        std::string malformed_uid_tok = AuthHelper::sign_jwt("not_a_valid_uuid", "USER", cfg.jwt_secret);
        auto r_mal_u = get_resp("/api/v1/profile/me", malformed_uid_tok);
        TEST_ASSERT(r_mal_u.code == 404, "Malformed UUID in JWT returns 404");

        // 1.9 SQLi in JWT user ID -> 404
        std::string sqli_uid_tok = AuthHelper::sign_jwt("' OR 1=1 --", "USER", cfg.jwt_secret);
        auto r_sqli_u = get_resp("/api/v1/profile/me", sqli_uid_tok);
        TEST_ASSERT(r_sqli_u.code == 404, "SQLi in JWT user ID returns 404 safely");

        // 1.10 Empty cookie token -> 401
        auto r_empty_c = get_resp("/api/v1/profile/me", "", "token=");
        TEST_ASSERT(r_empty_c.code == 401, "Empty token cookie returns 401");
    }

    // -------------------------------------------------------------
    // Part 2: GET /api/v1/profile/me - Fresh User with 0 Solved Problems
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing GET /api/v1/profile/me Fresh User (0 Solved)..." << std::endl;
    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    OAuthUser fresh_user;
    {
        auto g = pool.acquire();
        fresh_user = UserRepository::find_or_create_oauth_user(g.get(), "fresh_prof_" + std::to_string(ts) + "@campuslab.io", "Fresh Dev", "https://img.dev/avatar.jpg", "github");
    }
    std::string fresh_token = AuthHelper::sign_jwt(fresh_user.id, fresh_user.role, cfg.jwt_secret);

    {
        // 2.1 Fetch profile via Bearer
        auto r_fresh = get_resp("/api/v1/profile/me", fresh_token);
        TEST_ASSERT(r_fresh.code == 200, "Fresh user profile returns 200 OK");
        auto b_fresh = json::parse(r_fresh.body);
        TEST_ASSERT(b_fresh["success"] == true, "success is true");
        TEST_ASSERT(b_fresh["profile"]["user"]["id"] == fresh_user.id, "User ID matches");
        TEST_ASSERT(b_fresh["profile"]["user"]["name"] == "Fresh Dev", "User name matches");
        TEST_ASSERT(b_fresh["profile"]["user"]["avatar"] == "https://img.dev/avatar.jpg", "User avatar matches");
        TEST_ASSERT(b_fresh["profile"]["user"]["provider"] == "github", "Provider matches");
        TEST_ASSERT(b_fresh["profile"]["user"]["role"] == fresh_user.role, "Role matches");
        TEST_ASSERT(b_fresh["profile"]["stats"]["totalSolved"] == 0, "totalSolved is 0 for fresh user");
        TEST_ASSERT(b_fresh["profile"]["recentSubmissions"].empty(), "recentSubmissions is empty for fresh user");
        TEST_ASSERT(r_fresh.get_header_value("Content-Type") == "application/json", "Header is application/json");

        // 2.2 Verify 3 difficulty tiers present
        auto diffs = b_fresh["profile"]["stats"]["byDifficulty"];
        TEST_ASSERT(diffs.size() == 3, "byDifficulty has 3 tiers");
        TEST_ASSERT(diffs[0]["name"] == "Easy", "Tier 0 is Easy");
        TEST_ASSERT(diffs[0]["value"] == 0, "Easy solved is 0");
        TEST_ASSERT(diffs[1]["name"] == "Medium", "Tier 1 is Medium");
        TEST_ASSERT(diffs[1]["value"] == 0, "Medium solved is 0");
        TEST_ASSERT(diffs[2]["name"] == "Hard", "Tier 2 is Hard");
        TEST_ASSERT(diffs[2]["value"] == 0, "Hard solved is 0");

        int catalog_sum = diffs[0]["total"].get<int>() + diffs[1]["total"].get<int>() + diffs[2]["total"].get<int>();
        TEST_ASSERT(catalog_sum == 250, "Total catalog size equals 250 problems");

        // 2.3 Fetch profile via Cookie authentication
        auto r_cookie = get_resp("/api/v1/profile/me", "", "token=" + fresh_token);
        TEST_ASSERT(r_cookie.code == 200, "Cookie authentication returns 200 OK");
        auto b_cookie = json::parse(r_cookie.body);
        TEST_ASSERT(b_cookie["profile"]["user"]["id"] == fresh_user.id, "User ID matches via cookie");

        // 2.4 Invalid Bearer takes precedence over valid Cookie -> 401
        auto r_prec = get_resp("/api/v1/profile/me", "bad_token", "token=" + fresh_token);
        TEST_ASSERT(r_prec.code == 401, "Invalid Bearer takes precedence and returns 401");
    }

    // -------------------------------------------------------------
    // Part 3: GET /api/v1/profile/me - Solved Problems Progression & Analytics
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing Problem Solved Analytics Progression..." << std::endl;
    {
        std::string easy_pid, med_pid, hard_pid;
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            auto e_row = txn.exec("SELECT id FROM \"Problem\" WHERE difficulty = 'EASY' LIMIT 1");
            auto m_row = txn.exec("SELECT id FROM \"Problem\" WHERE difficulty = 'MEDIUM' LIMIT 1");
            auto h_row = txn.exec("SELECT id FROM \"Problem\" WHERE difficulty = 'HARD' LIMIT 1");
            TEST_ASSERT(!e_row.empty(), "Easy problem found");
            TEST_ASSERT(!m_row.empty(), "Medium problem found");
            TEST_ASSERT(!h_row.empty(), "Hard problem found");
            easy_pid = e_row[0][0].as<std::string>();
            med_pid = m_row[0][0].as<std::string>();
            hard_pid = h_row[0][0].as<std::string>();

            // Solve Easy problem
            txn.exec_params(
                "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT DO NOTHING",
                fresh_user.id, easy_pid
            );
            txn.commit();
        }

        // 3.1 Verify totalSolved == 1 and Easy solved == 1
        auto r_s1 = get_resp("/api/v1/profile/me", fresh_token);
        auto b_s1 = json::parse(r_s1.body);
        TEST_ASSERT(b_s1["profile"]["stats"]["totalSolved"] == 1, "totalSolved incremented to 1");
        TEST_ASSERT(b_s1["profile"]["stats"]["byDifficulty"][0]["value"] == 1, "Easy solved is 1");
        TEST_ASSERT(b_s1["profile"]["stats"]["byDifficulty"][1]["value"] == 0, "Medium solved is 0");
        TEST_ASSERT(b_s1["profile"]["stats"]["byDifficulty"][2]["value"] == 0, "Hard solved is 0");

        // 3.2 Solve Medium and Hard problems
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params(
                "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT DO NOTHING",
                fresh_user.id, med_pid
            );
            txn.exec_params(
                "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT DO NOTHING",
                fresh_user.id, hard_pid
            );
            txn.commit();
        }

        // 3.3 Verify totalSolved == 3 and all tiers incremented
        auto r_s3 = get_resp("/api/v1/profile/me", fresh_token);
        auto b_s3 = json::parse(r_s3.body);
        TEST_ASSERT(b_s3["profile"]["stats"]["totalSolved"] == 3, "totalSolved is 3");
        TEST_ASSERT(b_s3["profile"]["stats"]["byDifficulty"][0]["value"] == 1, "Easy solved is 1");
        TEST_ASSERT(b_s3["profile"]["stats"]["byDifficulty"][1]["value"] == 1, "Medium solved is 1");
        TEST_ASSERT(b_s3["profile"]["stats"]["byDifficulty"][2]["value"] == 1, "Hard solved is 1");
    }

    // -------------------------------------------------------------
    // Part 4: GET /api/v1/profile/me - Recent Submissions Tracking
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing Recent Submissions in Profile..." << std::endl;
    {
        // Insert 3 submissions for fresh_user
        std::string sample_pid;
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            auto p_row = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
            sample_pid = p_row[0][0].as<std::string>();

            txn.exec_params(
                "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, '\"code1\"'::jsonb, 'C++ (GCC 13)', 'Accepted', NOW() - INTERVAL '5 minutes', NOW())",
                fresh_user.id, sample_pid
            );
            txn.exec_params(
                "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, '\"code2\"'::jsonb, 'C++ (GCC 13)', 'Wrong Answer', NOW() - INTERVAL '2 minutes', NOW())",
                fresh_user.id, sample_pid
            );
            txn.exec_params(
                "INSERT INTO \"Submission\" (\"id\", \"userId\", \"problemId\", \"sourceCode\", \"language\", \"status\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, '\"code3\"'::jsonb, 'C++ (GCC 13)', 'Compilation Error', NOW(), NOW())",
                fresh_user.id, sample_pid
            );
            txn.commit();
        }

        // 4.1 Verify recentSubmissions array contains 3 entries
        auto r_rec = get_resp("/api/v1/profile/me", fresh_token);
        auto b_rec = json::parse(r_rec.body);
        const auto& subs = b_rec["profile"]["recentSubmissions"];
        TEST_ASSERT(subs.size() == 3, "recentSubmissions has 3 entries");

        // 4.2 Verify ordering (most recent first)
        TEST_ASSERT(subs[0]["status"] == "Compilation Error", "First item is most recent (Compilation Error)");
        TEST_ASSERT(subs[1]["status"] == "Wrong Answer", "Second item is Wrong Answer");
        TEST_ASSERT(subs[2]["status"] == "Accepted", "Third item is Accepted");

        // 4.3 Verify submission fields schema
        TEST_ASSERT(!subs[0]["id"].get<std::string>().empty(), "Submission has ID");
        TEST_ASSERT(!subs[0]["problemId"].get<std::string>().empty(), "Submission has problemId");
        TEST_ASSERT(!subs[0]["title"].get<std::string>().empty(), "Submission has problem title");
        TEST_ASSERT(!subs[0]["difficulty"].get<std::string>().empty(), "Submission has problem difficulty");
        TEST_ASSERT(subs[0]["language"] == "C++ (GCC 13)", "Language matches");
    }

    // -------------------------------------------------------------
    // Part 5: ProfileService Direct Lookup Edge Cases
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing ProfileService Direct Edge Cases..." << std::endl;
    {
        // 5.1 Non-existent UUID
        auto opt1 = profile_service.get_profile("00000000-0000-0000-0000-000000000000");
        TEST_ASSERT(!opt1.has_value(), "Direct service lookup for missing UUID returns nullopt");

        // 5.2 Malformed ID
        auto opt2 = profile_service.get_profile("invalid-user-id");
        TEST_ASSERT(!opt2.has_value(), "Direct service lookup for malformed ID safely returns nullopt");

        // 5.3 Empty ID
        auto opt3 = profile_service.get_profile("");
        TEST_ASSERT(!opt3.has_value(), "Direct service lookup for empty ID safely returns nullopt");

        // 5.4 SQLi ID
        auto opt4 = profile_service.get_profile("' OR 1=1 --");
        TEST_ASSERT(!opt4.has_value(), "Direct service lookup for SQLi ID safely returns nullopt");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << " ALL PROFILE FEATURE & ROUTE UNIT TESTS PASSED (100%)!    " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

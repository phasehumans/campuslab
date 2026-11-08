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
#include "../../server/src/repositories/problem_repository.hpp"
#include "../../server/src/repositories/submission_repository.hpp"
#include "../../server/src/services/problem_service.hpp"
#include "../../server/src/controllers/problem_controller.hpp"
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

static crow::request make_get_req(const std::string& path_and_qs, const std::string& token = "") {
    crow::request req;
    req.method = crow::HTTPMethod::GET;
    req.raw_url = path_and_qs;
    auto q_pos = path_and_qs.find('?');
    if (q_pos != std::string::npos) {
        req.url = path_and_qs.substr(0, q_pos);
        req.url_params = crow::query_string(path_and_qs);
    } else {
        req.url = path_and_qs;
    }
    if (!token.empty()) {
        req.add_header("Authorization", "Bearer " + token);
    }
    return req;
}

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << " Campus Lab - Problem Feature & Route Tests (/api/v1/problems) " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    DbConnectionPool pool(cfg.db_url, 4);
    ProblemService problem_service(pool);

    AppType app;
    ProblemController controller(problem_service, cfg.jwt_secret);
    controller.register_routes(app);
    app.validate();

    // -------------------------------------------------------------
    // 1. GET /api/v1/problems - Default Pagination & Boundaries
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/problems Pagination & Boundary Limits..." << std::endl;
    {
        // 1a. Default pagination
        auto req = make_get_req("/api/v1/problems");
        crow::response res;
        app.handle_full(req, res);
        TEST_ASSERT(res.code == 200, "Default problems list returns 200 OK");
        auto body = json::parse(res.body);
        TEST_ASSERT(body["success"] == true, "Success is true");
        TEST_ASSERT(body["count"] == 25, "Default count is 25");
        TEST_ASSERT(body["total"] == 250, "Total count is 250");
        TEST_ASSERT(body["page"] == 1, "Default page is 1");
        TEST_ASSERT(body["limit"] == 25, "Default limit is 25");
        TEST_ASSERT(body["totalPages"] == 10, "Total pages is 10");
        TEST_ASSERT(!body["allTags"].empty(), "allTags is populated");

        // 1b. Negative page and limit clamped
        auto req_neg = make_get_req("/api/v1/problems?page=-5&limit=-2");
        crow::response res_neg;
        app.handle_full(req_neg, res_neg);
        TEST_ASSERT(res_neg.code == 200, "Negative params handled safely with 200 OK");
        auto body_neg = json::parse(res_neg.body);
        TEST_ASSERT(body_neg["page"] == 1, "Negative page clamped to 1");
        TEST_ASSERT(body_neg["limit"] == 1, "Negative limit clamped to 1");
        TEST_ASSERT(body_neg["count"] == 1, "Returns 1 problem on clamped limit");

        // 1c. Out of bounds page beyond total
        auto req_far = make_get_req("/api/v1/problems?page=9999&limit=25");
        crow::response res_far;
        app.handle_full(req_far, res_far);
        TEST_ASSERT(res_far.code == 200, "Out-of-range page returns 200 OK");
        auto body_far = json::parse(res_far.body);
        TEST_ASSERT(body_far["count"] == 0, "Out-of-range page returns 0 problems");
        TEST_ASSERT(body_far["total"] == 250, "Total count still 250");

        // 1d. Excessive limit clamped to 100
        auto req_max = make_get_req("/api/v1/problems?limit=999");
        crow::response res_max;
        app.handle_full(req_max, res_max);
        TEST_ASSERT(res_max.code == 200, "Excessive limit returns 200 OK");
        auto body_max = json::parse(res_max.body);
        TEST_ASSERT(body_max["limit"] == 100, "Limit clamped to maximum 100");
        TEST_ASSERT(body_max["count"] == 100, "Returns exactly 100 items");
    }

    // -------------------------------------------------------------
    // 2. GET /api/v1/problems - Filtering by Difficulty & Topic
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing GET /api/v1/problems Difficulty & Topic Filters..." << std::endl;
    {
        // 2a. Filter by difficulty Easy
        auto req_easy = make_get_req("/api/v1/problems?difficulty=Easy&limit=50");
        crow::response res_easy;
        app.handle_full(req_easy, res_easy);
        TEST_ASSERT(res_easy.code == 200, "Easy difficulty query returns 200");
        auto body_easy = json::parse(res_easy.body);
        for (const auto& p : body_easy["problems"]) {
            TEST_ASSERT(p["difficulty"] == "Easy", "All filtered problems have difficulty Easy");
        }

        // 2b. Filter by difficulty Medium
        auto req_med = make_get_req("/api/v1/problems?difficulty=Medium&limit=50");
        crow::response res_med;
        app.handle_full(req_med, res_med);
        TEST_ASSERT(res_med.code == 200, "Medium difficulty query returns 200");
        auto body_med = json::parse(res_med.body);
        for (const auto& p : body_med["problems"]) {
            TEST_ASSERT(p["difficulty"] == "Medium", "All filtered problems have difficulty Medium");
        }

        // 2c. Filter by difficulty Hard
        auto req_hard = make_get_req("/api/v1/problems?difficulty=Hard&limit=50");
        crow::response res_hard;
        app.handle_full(req_hard, res_hard);
        TEST_ASSERT(res_hard.code == 200, "Hard difficulty query returns 200");
        auto body_hard = json::parse(res_hard.body);
        for (const auto& p : body_hard["problems"]) {
            TEST_ASSERT(p["difficulty"] == "Hard", "All filtered problems have difficulty Hard");
        }

        // 2d. Filter by non-existent topic
        auto req_topic = make_get_req("/api/v1/problems?topic=non_existent_topic_xyz_404");
        crow::response res_topic;
        app.handle_full(req_topic, res_topic);
        TEST_ASSERT(res_topic.code == 200, "Non-existent topic returns 200 with empty array");
        auto body_topic = json::parse(res_topic.body);
        TEST_ASSERT(body_topic["count"] == 0, "Non-existent topic count is 0");
        TEST_ASSERT(body_topic["total"] == 0, "Non-existent topic total is 0");
    }

    // -------------------------------------------------------------
    // 3. GET /api/v1/problems - Search & SQL Injection Immunity
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing GET /api/v1/problems Search & SQLi Protection..." << std::endl;
    {
        // 3a. Search with matching title
        auto req_s1 = make_get_req("/api/v1/problems?search=Two+Sum");
        crow::response res_s1;
        app.handle_full(req_s1, res_s1);
        TEST_ASSERT(res_s1.code == 200, "Search query returns 200");
        auto body_s1 = json::parse(res_s1.body);
        TEST_ASSERT(body_s1["total"] > 0, "Search finds matching problem");

        // 3b. Search with zero matches
        auto req_s2 = make_get_req("/api/v1/problems?search=UNMATCHABLE_STRING_99999_XYZ");
        crow::response res_s2;
        app.handle_full(req_s2, res_s2);
        TEST_ASSERT(res_s2.code == 200, "Empty search result returns 200");
        auto body_s2 = json::parse(res_s2.body);
        TEST_ASSERT(body_s2["total"] == 0, "Zero matches confirmed");

        // 3c. Search SQL injection probe
        auto req_sqli = make_get_req("/api/v1/problems?search=%25%27+OR+1%3D1+--");
        crow::response res_sqli;
        app.handle_full(req_sqli, res_sqli);
        TEST_ASSERT(res_sqli.code == 200, "SQL injection in search escaped safely");
        auto body_sqli = json::parse(res_sqli.body);
        TEST_ASSERT(body_sqli["total"] == 0, "SQL injection probe does not return all problems");
    }

    // -------------------------------------------------------------
    // 4. GET /api/v1/problems/:id - Success, 404 & Lifecycle Status
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing GET /api/v1/problems/:id Valid & Error Cases..." << std::endl;
    {
        // 4a. Get a real problem ID
        std::string sample_pid;
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            auto r = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
            sample_pid = r[0][0].as<std::string>();
        }

        // 4b. Fetch existing problem details
        auto req_p = make_get_req("/api/v1/problems/" + sample_pid);
        crow::response res_p;
        app.handle_full(req_p, res_p);
        TEST_ASSERT(res_p.code == 200, "Existing problem ID returns 200 OK");
        auto body_p = json::parse(res_p.body);
        TEST_ASSERT(body_p["success"] == true, "Success is true");
        TEST_ASSERT(body_p["problem"]["id"] == sample_pid, "Problem ID matches");
        TEST_ASSERT(body_p["problem"]["starterCodes"].is_object(), "Starter codes is an object");
        TEST_ASSERT(body_p["problem"]["examples"].is_array(), "Examples is an array");
        TEST_ASSERT(body_p["problem"]["testcases"].is_array(), "Testcases is an array");

        // 4c. Non-existent UUID -> 404
        auto req_404 = make_get_req("/api/v1/problems/00000000-0000-0000-0000-000000000000");
        crow::response res_404;
        app.handle_full(req_404, res_404);
        TEST_ASSERT(res_404.code == 404, "Non-existent problem UUID returns 404");
        TEST_ASSERT(json::parse(res_404.body)["message"] == "Problem not found", "Confirms problem not found message");

        // 4d. Malformed string ID -> 404
        auto req_bad = make_get_req("/api/v1/problems/invalid_id_not_uuid");
        crow::response res_bad;
        app.handle_full(req_bad, res_bad);
        TEST_ASSERT(res_bad.code == 404, "Malformed ID safely returns 404 without crashing");

        // 4e. Authenticated problem status: Solved vs Unsolved
        int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
        OAuthUser test_user;
        {
            auto g = pool.acquire();
            test_user = UserRepository::find_or_create_oauth_user(g.get(), "prob_user_" + std::to_string(ts) + "@test.dev", "Prob User", "", "github");
            pqxx::work txn(g.get());
            txn.exec_params(
                "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT (\"userId\", \"problemId\") DO NOTHING",
                test_user.id, sample_pid
            );
            txn.commit();
        }
        std::string user_token = AuthHelper::sign_jwt(test_user.id, test_user.role, cfg.jwt_secret);

        auto req_solved = make_get_req("/api/v1/problems/" + sample_pid, user_token);
        crow::response res_solved;
        app.handle_full(req_solved, res_solved);
        TEST_ASSERT(res_solved.code == 200, "Authenticated request returns 200");
        auto body_solved = json::parse(res_solved.body);
        TEST_ASSERT(body_solved["problem"]["status"] == "Solved", "Authenticated user receives Solved status for problem");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL PROBLEM FEATURE & ROUTE UNIT TESTS PASSED (100%)!   " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

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

    // Helper lambda to dispatch GET requests
    auto get_resp = [&](const std::string& path_and_qs, const std::string& token = "") {
        auto req = make_get_req(path_and_qs, token);
        crow::response res;
        app.handle_full(req, res);
        return res;
    };

    // -------------------------------------------------------------
    // Part 1: GET /api/v1/problems - Default Pagination & Boundaries
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/problems Pagination & Boundary Limits..." << std::endl;
    {
        // 1.1 Default pagination
        auto res1 = get_resp("/api/v1/problems");
        TEST_ASSERT(res1.code == 200, "Default problems list returns 200 OK");
        auto b1 = json::parse(res1.body);
        TEST_ASSERT(b1["success"] == true, "Success is true");
        TEST_ASSERT(b1["count"] == 25, "Default count is 25");
        TEST_ASSERT(b1["total"] == 250, "Total count is 250");
        TEST_ASSERT(b1["page"] == 1, "Default page is 1");
        TEST_ASSERT(b1["limit"] == 25, "Default limit is 25");
        TEST_ASSERT(b1["totalPages"] == 10, "Total pages is 10");
        TEST_ASSERT(!b1["allTags"].empty(), "allTags is populated");

        // 1.2 Negative page and limit clamped
        auto res_neg = get_resp("/api/v1/problems?page=-5&limit=-2");
        TEST_ASSERT(res_neg.code == 200, "Negative params handled safely with 200 OK");
        auto b_neg = json::parse(res_neg.body);
        TEST_ASSERT(b_neg["page"] == 1, "Negative page clamped to 1");
        TEST_ASSERT(b_neg["limit"] == 1, "Negative limit clamped to 1");
        TEST_ASSERT(b_neg["count"] == 1, "Returns 1 problem on clamped limit");

        // 1.3 Out of bounds page beyond total
        auto res_far = get_resp("/api/v1/problems?page=9999&limit=25");
        TEST_ASSERT(res_far.code == 200, "Out-of-range page returns 200 OK");
        auto b_far = json::parse(res_far.body);
        TEST_ASSERT(b_far["count"] == 0, "Out-of-range page returns 0 problems");
        TEST_ASSERT(b_far["total"] == 250, "Total count still 250");

        // 1.4 Max limit clamping
        auto res_max = get_resp("/api/v1/problems?page=1&limit=500");
        TEST_ASSERT(res_max.code == 200, "Over-limit clamped with 200 OK");
        auto b_max = json::parse(res_max.body);
        TEST_ASSERT(b_max["limit"] == 100, "Limit clamped to max 100");
        TEST_ASSERT(b_max["count"] == 100, "Returns exactly 100 items on clamped limit");

        // 1.5 Limit='all' alias
        auto res_all = get_resp("/api/v1/problems?page=1&limit=all");
        TEST_ASSERT(res_all.code == 200, "limit=all returns 200 OK");
        auto b_all = json::parse(res_all.body);
        TEST_ASSERT(b_all["limit"] == 100, "limit=all capped at 100");

        // 1.6 Malformed non-numeric page string
        auto res_nan_p = get_resp("/api/v1/problems?page=not_a_number&limit=10");
        TEST_ASSERT(res_nan_p.code == 200, "Non-numeric page safely defaults to page 1");
        auto b_nan_p = json::parse(res_nan_p.body);
        TEST_ASSERT(b_nan_p["page"] == 1, "Clamped to page 1");

        // 1.7 Malformed non-numeric limit string
        auto res_nan_l = get_resp("/api/v1/problems?page=1&limit=not_a_number");
        TEST_ASSERT(res_nan_l.code == 200, "Non-numeric limit safely defaults");

        // 1.8 Page 10 (last page with default limit 25)
        auto res_last = get_resp("/api/v1/problems?page=10&limit=25");
        TEST_ASSERT(res_last.code == 200, "Page 10 returns 200 OK");
        auto b_last = json::parse(res_last.body);
        TEST_ASSERT(b_last["count"] == 25, "Page 10 contains 25 items");

        // 1.9 Page 11 (one past last page)
        auto res_p11 = get_resp("/api/v1/problems?page=11&limit=25");
        TEST_ASSERT(res_p11.code == 200, "Page 11 returns 200 OK");
        auto b_p11 = json::parse(res_p11.body);
        TEST_ASSERT(b_p11["count"] == 0, "Page 11 contains 0 items");

        // 1.10 Limit = 1 (minimal boundary)
        auto res_l1 = get_resp("/api/v1/problems?page=1&limit=1");
        TEST_ASSERT(res_l1.code == 200, "limit=1 returns 200 OK");
        auto b_l1 = json::parse(res_l1.body);
        TEST_ASSERT(b_l1["count"] == 1, "Returned count is 1");
        TEST_ASSERT(b_l1["totalPages"] == 250, "totalPages is 250 when limit=1");
    }

    // -------------------------------------------------------------
    // Part 2: GET /api/v1/problems - Difficulty Filters & Exhaustive Tiers
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing GET /api/v1/problems Difficulty Filters..." << std::endl;
    {
        // 2.1 Easy difficulty
        auto res_e = get_resp("/api/v1/problems?difficulty=Easy&limit=100");
        TEST_ASSERT(res_e.code == 200, "Easy difficulty returns 200 OK");
        auto b_e = json::parse(res_e.body);
        int easy_total = b_e["total"].get<int>();
        TEST_ASSERT(easy_total > 0, "Easy problems total > 0");
        for (const auto& item : b_e["problems"]) {
            TEST_ASSERT(item["difficulty"] == "Easy", "Problem difficulty is strictly Easy");
        }

        // 2.2 Medium difficulty
        auto res_m = get_resp("/api/v1/problems?difficulty=Medium&limit=100");
        TEST_ASSERT(res_m.code == 200, "Medium difficulty returns 200 OK");
        auto b_m = json::parse(res_m.body);
        int med_total = b_m["total"].get<int>();
        TEST_ASSERT(med_total > 0, "Medium problems total > 0");
        for (const auto& item : b_m["problems"]) {
            TEST_ASSERT(item["difficulty"] == "Medium", "Problem difficulty is strictly Medium");
        }

        // 2.3 Hard difficulty
        auto res_h = get_resp("/api/v1/problems?difficulty=Hard&limit=100");
        TEST_ASSERT(res_h.code == 200, "Hard difficulty returns 200 OK");
        auto b_h = json::parse(res_h.body);
        int hard_total = b_h["total"].get<int>();
        TEST_ASSERT(hard_total > 0, "Hard problems total > 0");
        for (const auto& item : b_h["problems"]) {
            TEST_ASSERT(item["difficulty"] == "Hard", "Problem difficulty is strictly Hard");
        }

        // 2.4 Difficulty total sum validation
        TEST_ASSERT(easy_total + med_total + hard_total == 250, "Easy (" + std::to_string(easy_total) + ") + Medium (" + std::to_string(med_total) + ") + Hard (" + std::to_string(hard_total) + ") == 250");

        // 2.5 Unknown difficulty tier falls back safely to full catalog
        auto res_inv_d = get_resp("/api/v1/problems?difficulty=ImpossibleTier");
        TEST_ASSERT(res_inv_d.code == 200, "Unknown difficulty tier returns 200 OK");
        auto b_inv_d = json::parse(res_inv_d.body);
        TEST_ASSERT(b_inv_d["total"] == 250, "Unknown difficulty safely falls back to full catalog without crash");

        // 2.6 SQL Injection attempt in difficulty safely handled
        auto res_sqli_d = get_resp("/api/v1/problems?difficulty=Easy'%20OR%201=1%20--");
        TEST_ASSERT(res_sqli_d.code == 200, "SQLi in difficulty handled safely without SQL error");
        auto b_sqli_d = json::parse(res_sqli_d.body);
        TEST_ASSERT(b_sqli_d["total"] == 250, "SQLi difficulty safely treated as unrecognized without injecting");
    }

    // -------------------------------------------------------------
    // Part 3: GET /api/v1/problems - Search Filtering & Edge Cases
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing GET /api/v1/problems Search Edge Cases..." << std::endl;
    {
        // 3.1 Known problem title substring
        auto res_s1 = get_resp("/api/v1/problems?search=Two%20Sum");
        TEST_ASSERT(res_s1.code == 200, "Search 'Two Sum' returns 200 OK");
        auto b_s1 = json::parse(res_s1.body);
        TEST_ASSERT(b_s1["count"].get<int>() >= 1, "At least 1 problem found for 'Two Sum'");

        // 3.2 Case-insensitive search
        auto res_s2 = get_resp("/api/v1/problems?search=two%20sum");
        TEST_ASSERT(res_s2.code == 200, "Lowercase search returns 200 OK");
        auto b_s2 = json::parse(res_s2.body);
        TEST_ASSERT(b_s2["count"].get<int>() >= 1, "Case-insensitive search found matches");

        // 3.3 Empty search query
        auto res_s3 = get_resp("/api/v1/problems?search=");
        TEST_ASSERT(res_s3.code == 200, "Empty search query returns 200 OK");
        auto b_s3 = json::parse(res_s3.body);
        TEST_ASSERT(b_s3["total"] == 250, "Empty search returns full catalog");

        // 3.4 Whitespace only search
        auto res_s4 = get_resp("/api/v1/problems?search=%20%20%20");
        TEST_ASSERT(res_s4.code == 200, "Whitespace search returns 200 OK");

        // 3.5 SQL Wildcard '%' in search
        auto res_s5 = get_resp("/api/v1/problems?search=%25");
        TEST_ASSERT(res_s5.code == 200, "Wildcard '%' handled safely");

        // 3.6 Single quote in search
        auto res_s6 = get_resp("/api/v1/problems?search=%27");
        TEST_ASSERT(res_s6.code == 200, "Single quote handled safely");

        // 3.7 SQL Injection payload
        auto res_s7 = get_resp("/api/v1/problems?search=%27%20UNION%20SELECT%20NULL--");
        TEST_ASSERT(res_s7.code == 200, "SQLi union injection handled safely");
        auto b_s7 = json::parse(res_s7.body);
        TEST_ASSERT(b_s7["count"] == 0, "SQLi search returned 0 items safely");

        // 3.8 Non-existent text
        auto res_s8 = get_resp("/api/v1/problems?search=xyz_completely_nonexistent_string_12345");
        TEST_ASSERT(res_s8.code == 200, "Non-existent search returns 200 OK");
        auto b_s8 = json::parse(res_s8.body);
        TEST_ASSERT(b_s8["count"] == 0, "0 results for nonexistent search");
        TEST_ASSERT(b_s8["total"] == 0, "0 total for nonexistent search");

        // 3.9 Special Unicode characters in search
        auto res_s9 = get_resp("/api/v1/problems?search=%E2%9A%A1%F0%9F%9A%80");
        TEST_ASSERT(res_s9.code == 200, "Unicode emoji search returns 200 OK");
    }

    // -------------------------------------------------------------
    // Part 4: GET /api/v1/problems - Topic Filtering
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing GET /api/v1/problems Topic Filters..." << std::endl;
    {
        // 4.1 Topic 'dynamic-programming'
        auto res_t1 = get_resp("/api/v1/problems?topic=dynamic-programming&limit=10");
        TEST_ASSERT(res_t1.code == 200, "Topic 'dynamic-programming' returns 200 OK");
        auto b_t1 = json::parse(res_t1.body);
        TEST_ASSERT(b_t1["count"].get<int>() > 0, "Problems returned for topic 'dynamic-programming'");

        // 4.2 Topic 'string'
        auto res_t2 = get_resp("/api/v1/problems?topic=string&limit=10");
        TEST_ASSERT(res_t2.code == 200, "Topic 'string' returns 200 OK");
        auto b_t2 = json::parse(res_t2.body);
        TEST_ASSERT(b_t2["count"].get<int>() > 0, "Problems returned for topic 'string'");

        // 4.3 Non-existent topic
        auto res_t3 = get_resp("/api/v1/problems?topic=quantum_machine_learning");
        TEST_ASSERT(res_t3.code == 200, "Non-existent topic returns 200 OK");
        auto b_t3 = json::parse(res_t3.body);
        TEST_ASSERT(b_t3["count"] == 0, "0 problems for non-existent topic");

        // 4.4 SQLi in topic
        auto res_t4 = get_resp("/api/v1/problems?topic=array%27%20OR%201=1%20--");
        TEST_ASSERT(res_t4.code == 200, "SQLi in topic returns 200 OK");
        auto b_t4 = json::parse(res_t4.body);
        TEST_ASSERT(b_t4["count"] == 0, "0 problems for SQLi topic");
    }

    // -------------------------------------------------------------
    // Part 5: GET /api/v1/problems - Combined Multi-Param Filtering
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing GET /api/v1/problems Combined Filters..." << std::endl;
    {
        // 5.1 Difficulty + Topic
        auto res_c1 = get_resp("/api/v1/problems?difficulty=Medium&topic=dynamic-programming&limit=5");
        TEST_ASSERT(res_c1.code == 200, "Difficulty + Topic returns 200 OK");
        auto b_c1 = json::parse(res_c1.body);
        for (const auto& item : b_c1["problems"]) {
            TEST_ASSERT(item["difficulty"] == "Medium", "Each item is Medium");
        }

        // 5.2 Difficulty + Search
        auto res_c2 = get_resp("/api/v1/problems?difficulty=Hard&search=Median");
        TEST_ASSERT(res_c2.code == 200, "Difficulty + Search returns 200 OK");

        // 5.3 Contradictory filters (e.g. Hard difficulty + Easy-only title)
        auto res_c3 = get_resp("/api/v1/problems?difficulty=Hard&search=Two%20Sum");
        TEST_ASSERT(res_c3.code == 200, "Contradictory filters return 200 OK");
        auto b_c3 = json::parse(res_c3.body);
        TEST_ASSERT(b_c3["count"] == 0, "0 results for contradictory filter");

        // 5.4 Difficulty + Topic + Search + Pagination
        auto res_c4 = get_resp("/api/v1/problems?difficulty=Medium&topic=dynamic-programming&search=a&page=1&limit=3");
        TEST_ASSERT(res_c4.code == 200, "All 4 filters together return 200 OK");
        auto b_c4 = json::parse(res_c4.body);
        TEST_ASSERT(b_c4["limit"] == 3, "Limit is 3");
        TEST_ASSERT(b_c4["page"] == 1, "Page is 1");
    }

    // -------------------------------------------------------------
    // Part 6: GET /api/v1/problems/:id - Detail Lookups & Boundary Cases
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing GET /api/v1/problems/:id Detail Lookups..." << std::endl;
    {
        // Fetch a real problem ID from DB
        std::string real_pid;
        {
            auto conn = pool.acquire();
            pqxx::work txn(conn.get());
            auto r = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
            TEST_ASSERT(!r.empty(), "Problem found in DB");
            real_pid = r[0]["id"].as<std::string>();
        }

        // 6.1 Valid Problem Detail
        auto res_d1 = get_resp("/api/v1/problems/" + real_pid);
        TEST_ASSERT(res_d1.code == 200, "Valid problem detail returns 200 OK");
        auto b_d1 = json::parse(res_d1.body);
        TEST_ASSERT(b_d1["success"] == true, "success is true");
        TEST_ASSERT(b_d1["problem"]["id"] == real_pid, "Problem ID matches requested ID");
        TEST_ASSERT(!b_d1["problem"]["title"].get<std::string>().empty(), "Problem has title");
        TEST_ASSERT(!b_d1["problem"]["difficulty"].get<std::string>().empty(), "Problem has difficulty");
        TEST_ASSERT(!b_d1["problem"]["description"].get<std::string>().empty(), "Problem has description");
        TEST_ASSERT(b_d1["problem"]["examples"].is_array(), "Examples is an array");
        TEST_ASSERT(b_d1["problem"]["tags"].is_array(), "Tags is an array");
        TEST_ASSERT(b_d1["problem"]["starterCodes"].is_object(), "StarterCodes is an object");
        TEST_ASSERT(res_d1.get_header_value("Content-Type") == "application/json", "Header is application/json");

        // 6.2 Non-existent UUID
        auto res_d2 = get_resp("/api/v1/problems/00000000-0000-0000-0000-000000000000");
        TEST_ASSERT(res_d2.code == 404, "Non-existent UUID returns 404 Not Found");
        auto b_d2 = json::parse(res_d2.body);
        TEST_ASSERT(b_d2["success"] == false, "success is false");
        TEST_ASSERT(b_d2["message"] == "Problem not found", "Message confirms not found");

        // 6.3 Malformed non-UUID problem ID
        auto res_d3 = get_resp("/api/v1/problems/not_a_valid_uuid_string");
        TEST_ASSERT(res_d3.code == 404, "Malformed non-UUID ID returns 404");

        // 6.4 SQLi in problem ID path parameter
        auto res_d4 = get_resp("/api/v1/problems/'%20OR%201=1%20--");
        TEST_ASSERT(res_d4.code == 404, "SQLi in path parameter safely returns 404");

        // 6.5 Path traversal in problem ID
        auto res_d5 = get_resp("/api/v1/problems/..%2F..%2Fetc%2Fpasswd");
        TEST_ASSERT(res_d5.code == 404, "Path traversal attempt safely returns 404");

        // 6.6 Numeric string problem ID
        auto res_d6 = get_resp("/api/v1/problems/12345678");
        TEST_ASSERT(res_d6.code == 404, "Numeric string ID returns 404");

        // 6.7 UUID with trailing space
        auto res_d7 = get_resp("/api/v1/problems/" + real_pid + "%20");
        TEST_ASSERT(res_d7.code == 404, "ID with trailing whitespace returns 404");
    }

    // -------------------------------------------------------------
    // Part 7: Authenticated Problem Status Tracking ("Solved" / "Todo")
    // -------------------------------------------------------------
    std::cout << "\n[7] Testing Authenticated Problem Status Tracking..." << std::endl;
    {
        int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
        OAuthUser test_user;
        std::string test_pid;
        {
            auto g = pool.acquire();
            test_user = UserRepository::find_or_create_oauth_user(g.get(), "status_test_" + std::to_string(ts) + "@campuslab.io", "Status User", "", "github");
            auto r = pqxx::work(g.get()).exec("SELECT id FROM \"Problem\" LIMIT 1");
            test_pid = r[0]["id"].as<std::string>();
        }
        std::string user_token = AuthHelper::sign_jwt(test_user.id, test_user.role, cfg.jwt_secret);

        // 7.1 Initially problem is "Unsolved"
        auto res_todo = get_resp("/api/v1/problems/" + test_pid, user_token);
        TEST_ASSERT(res_todo.code == 200, "Authenticated detail lookup returns 200 OK");
        auto b_todo = json::parse(res_todo.body);
        TEST_ASSERT(b_todo["problem"]["status"] == "Unsolved", "Initial status is Unsolved");

        // 7.2 Insert ProblemSolved entry
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params(
                "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW())",
                test_user.id, test_pid
            );
            txn.commit();
        }

        // 7.3 Status flips to "Solved"
        auto res_solved = get_resp("/api/v1/problems/" + test_pid, user_token);
        TEST_ASSERT(res_solved.code == 200, "Authenticated detail returns 200 OK");
        auto b_solved = json::parse(res_solved.body);
        TEST_ASSERT(b_solved["problem"]["status"] == "Solved", "Status updated to Solved");

        // 7.4 Filter by status=Solved for this user
        auto res_st_s = get_resp("/api/v1/problems?status=Solved", user_token);
        TEST_ASSERT(res_st_s.code == 200, "status=Solved returns 200 OK");
        auto b_st_s = json::parse(res_st_s.body);
        TEST_ASSERT(b_st_s["count"].get<int>() >= 1, "At least 1 solved problem found");

        // 7.5 Unauthenticated status=Solved returns 0 or ignores safely
        auto res_unauth_s = get_resp("/api/v1/problems?status=Solved");
        TEST_ASSERT(res_unauth_s.code == 200, "Unauthenticated status filter returns 200 OK");
        auto b_unauth_s = json::parse(res_unauth_s.body);
        TEST_ASSERT(b_unauth_s["count"] == 0, "Unauthenticated status=Solved returns 0 items");

        // 7.6 Invalid status string handled safely
        auto res_inv_st = get_resp("/api/v1/problems?status=NonExistentStatus", user_token);
        TEST_ASSERT(res_inv_st.code == 200, "Invalid status filter returns 200 OK");

        // 7.7 Clean up ProblemSolved
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params("DELETE FROM \"ProblemSolved\" WHERE \"userId\" = $1 AND \"problemId\" = $2", test_user.id, test_pid);
            txn.commit();
        }
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << " ALL PROBLEM FEATURE & ROUTE UNIT TESTS PASSED (100%)!    " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <thread>
#include <future>
#include <chrono>
#include <memory>
#include <pqxx/pqxx>
#include "types.hpp"
#include "../../server/src/config/app_config.hpp"
#include "../../server/src/db/connection_pool.hpp"
#include "../../server/src/models/models.hpp"
#include "../../server/src/repositories/user_repository.hpp"
#include "../../server/src/repositories/problem_repository.hpp"
#include "../../server/src/repositories/submission_repository.hpp"
#include "../../server/src/repositories/contest_repository.hpp"
#include "../../server/src/services/contest_service.hpp"
#include "../../server/src/services/profile_service.hpp"
#include "../../server/src/services/auth_service.hpp"
#include "../../server/src/services/execution_service.hpp"
#include "auth_helper.hpp"
#include <unordered_set>
#include <stdexcept>

using namespace campuslab;

#define TEST_ASSERT(cond, msg) \
    do { \
        if (!(cond)) { \
            std::cerr << "[-] FAILED: " << msg << " (" << #cond << ") at line " << __LINE__ << std::endl; \
            exit(1); \
        } else { \
            std::cout << "[+] PASSED: " << msg << std::endl; \
        } \
    } while(0)

// -----------------------------------------------------------------------------
// 1. Connection Pool Stress, Move Semantics & Reconnection
// -----------------------------------------------------------------------------
void test_db_connection_pool(const std::string& db_url) {
    std::cout << "\n--- Subtest: DbConnectionPool Multi-Threaded Stress ---" << std::endl;
    // Pool of size 4
    DbConnectionPool pool(db_url, 4);
    TEST_ASSERT(pool.available_count() == 4, "Initial pool count is 4");

    // 1. Move constructor and assignment on ConnectionGuard
    {
        auto g1 = pool.acquire();
        TEST_ASSERT(pool.available_count() == 3, "1 acquired, 3 remaining");
        
        // Move construct
        DbConnectionPool::ConnectionGuard g2(std::move(g1));
        {
            pqxx::work txn(g2.get());
            auto r = txn.exec("SELECT 42");
            TEST_ASSERT(r[0][0].as<int>() == 42, "Moved guard executes query successfully");
        }

        // Move assign
        auto g3 = pool.acquire();
        g3 = std::move(g2);
        {
            pqxx::work txn3(g3.get());
            auto r3 = txn3.exec("SELECT 100");
            TEST_ASSERT(r3[0][0].as<int>() == 100, "Move-assigned guard executes query successfully");
        }
    }
    // All guards destructed, all returned
    TEST_ASSERT(pool.available_count() == 4, "All connections returned to pool");

    // 2. 20 concurrent threads competing for 4 connections
    std::vector<std::future<bool>> futures;
    for (int i = 0; i < 20; ++i) {
        futures.push_back(std::async(std::launch::async, [&pool, i]() {
            try {
                auto guard = pool.acquire(std::chrono::milliseconds(5000));
                pqxx::work txn(guard.get());
                auto r = txn.exec("SELECT " + std::to_string(i) + "::int");
                int val = r[0][0].as<int>();
                std::this_thread::sleep_for(std::chrono::milliseconds(15));
                return val == i;
            } catch (const std::exception& e) {
                std::cerr << "Thread error: " << e.what() << std::endl;
                return false;
            }
        }));
    }

    bool all_ok = true;
    for (auto& f : futures) {
        if (!f.get()) all_ok = false;
    }
    TEST_ASSERT(all_ok, "20 concurrent threads successfully acquired & executed on 4-connection pool");
    TEST_ASSERT(pool.available_count() == 4, "All 4 connections returned after concurrency stress");
}

// -----------------------------------------------------------------------------
// 2. UserRepository Live Database Tests
// -----------------------------------------------------------------------------
void test_user_repository(const std::string& db_url) {
    std::cout << "\n--- Subtest: UserRepository Live DB Operations ---" << std::endl;
    pqxx::connection conn(db_url);

    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    std::string oauth_email = "oauth_repo_" + std::to_string(ts) + "@github.test";

    // 1. Create OAuth user
    OAuthUser o1 = UserRepository::find_or_create_oauth_user(conn, oauth_email, "OAuth Dev", "avatar.png", "github");
    TEST_ASSERT(!o1.id.empty(), "Created user ID is non-empty");
    TEST_ASSERT(o1.email == oauth_email, "OAuth email matches");
    TEST_ASSERT(o1.role == "USER", "Default role is USER");

    // 2. Find by ID
    auto found_id = UserRepository::find_by_id(conn, o1.id);
    TEST_ASSERT(found_id.has_value(), "User found by ID");
    TEST_ASSERT(found_id->email == oauth_email, "Found by ID email matches");
    TEST_ASSERT(found_id->name == "OAuth Dev", "Found by ID name matches");

    // 3. Find by non-existent UUID
    auto not_found_id = UserRepository::find_by_id(conn, "00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(!not_found_id.has_value(), "Non-existent UUID returns nullopt");

    // 4. OAuth user idempotent upsert
    OAuthUser o2 = UserRepository::find_or_create_oauth_user(conn, oauth_email, "OAuth Dev", "avatar.png", "github");
    TEST_ASSERT(o2.id == o1.id, "Re-calling OAuth upsert with same email returns existing user");
}

// -----------------------------------------------------------------------------
// 3. ProblemRepository Live Database Tests
// -----------------------------------------------------------------------------
void test_problem_repository(const std::string& db_url) {
    std::cout << "\n--- Subtest: ProblemRepository Live DB Operations ---" << std::endl;
    pqxx::connection conn(db_url);

    // 1. Find all problems
    auto all_problems = ProblemRepository::find_all_problems(conn);
    TEST_ASSERT(all_problems.size() == 250, "find_all_problems returns all 250 DSA problems");

    // 2. Find problem by ID
    std::string sample_id = all_problems[0].id;
    auto detail_opt = ProblemRepository::find_problem_by_id(conn, sample_id);
    TEST_ASSERT(detail_opt.has_value(), "find_problem_by_id returns detail");
    TEST_ASSERT(detail_opt->id == sample_id, "Detail ID matches requested");
    TEST_ASSERT(!detail_opt->title.empty(), "Title is non-empty");
    TEST_ASSERT(!detail_opt->description.empty(), "Description is non-empty");
    TEST_ASSERT(detail_opt->testcases.is_array(), "Testcases is a JSON array");
    TEST_ASSERT(detail_opt->examples.is_array(), "Examples is a JSON array");
    TEST_ASSERT(detail_opt->starter_codes.is_object(), "Starter codes is a JSON object");
    TEST_ASSERT(detail_opt->reference_solutions.is_object(), "Reference solutions is a JSON object");

    // 3. Non-existent problem by ID
    auto not_found_p = ProblemRepository::find_problem_by_id(conn, "00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(!not_found_p.has_value(), "Non-existent problem ID returns nullopt");

    // 4. Paginated problems: Page 1 with limit 25
    ProblemQueryOptions p1_opts;
    p1_opts.page = 1;
    p1_opts.limit = 25;
    auto res_p1 = ProblemRepository::find_problems_paginated(conn, p1_opts);
    TEST_ASSERT(res_p1.problems.size() == 25, "find_problems_paginated returns 25 items for page 1");
    TEST_ASSERT(res_p1.total == 250, "Total problems count equals 250");
    TEST_ASSERT(res_p1.total_pages == 10, "Total pages equals 10 for batch size 25 (250/25)");
    TEST_ASSERT(!res_p1.all_tags.empty(), "All tags list is populated");

    // 5. Paginated problems: Page 2 with limit 25
    ProblemQueryOptions p2_opts;
    p2_opts.page = 2;
    p2_opts.limit = 25;
    auto res_p2 = ProblemRepository::find_problems_paginated(conn, p2_opts);
    TEST_ASSERT(res_p2.problems.size() == 25, "find_problems_paginated returns 25 items for page 2");
    TEST_ASSERT(res_p2.problems[0].id != res_p1.problems[0].id, "Page 2 starts with different problem than Page 1");

    // 5b. Paginated problems: Page 10 (last page) with limit 25
    ProblemQueryOptions p10_opts;
    p10_opts.page = 10;
    p10_opts.limit = 25;
    auto res_p10 = ProblemRepository::find_problems_paginated(conn, p10_opts);
    TEST_ASSERT(res_p10.problems.size() == 25, "Page 10 returns exactly 25 items (226-250)");

    // 6. Paginated problems: Filter by difficulty
    ProblemQueryOptions easy_opts;
    easy_opts.page = 1;
    easy_opts.limit = 10;
    easy_opts.difficulty = "Easy";
    auto res_easy = ProblemRepository::find_problems_paginated(conn, easy_opts);
    TEST_ASSERT(res_easy.problems.size() <= 10, "Filtered easy count is within limit");
    TEST_ASSERT(res_easy.total > 0 && res_easy.total < 250, "Easy problems total is subset of all");
    for (const auto& ep : res_easy.problems) {
        TEST_ASSERT(ep.difficulty == "Easy", "All items in easy filter have Easy difficulty");
    }

    // 7. Paginated problems: Filter by search
    ProblemQueryOptions search_opts;
    search_opts.search = "Maximum";
    auto res_search = ProblemRepository::find_problems_paginated(conn, search_opts);
    TEST_ASSERT(res_search.total > 0, "Search for 'Maximum' finds problems");
}

// -----------------------------------------------------------------------------
// 4. SubmissionRepository Live Database Tests
// -----------------------------------------------------------------------------
void test_submission_repository(const std::string& db_url) {
    std::cout << "\n--- Subtest: SubmissionRepository Live DB Operations ---" << std::endl;
    pqxx::connection conn(db_url);

    // Get an existing user and problem
    pqxx::work txn(conn);
    auto u_rows = txn.exec("SELECT id FROM \"User\" LIMIT 1");
    auto p_rows = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
    TEST_ASSERT(!u_rows.empty() && !p_rows.empty(), "Prerequisites user and problem exist in DB");
    std::string user_id = u_rows[0][0].as<std::string>();
    std::string problem_id = p_rows[0][0].as<std::string>();
    txn.abort();

    // 1. Create submission
    std::string code = "#include <iostream>\nint main(){ std::cout << 42; return 0; }";
    std::string sub_id = SubmissionRepository::create_submission(conn, user_id, problem_id, code);
    TEST_ASSERT(!sub_id.empty(), "Submission created with valid ID");

    // 2. Get submission by ID
    auto sub_json = SubmissionRepository::get_submission_by_id(conn, sub_id);
    TEST_ASSERT(!sub_json.is_null(), "Submission retrieved by ID");
    TEST_ASSERT(sub_json["id"] == sub_id, "Retrieved submission ID matches");
    TEST_ASSERT(sub_json["status"] == "Pending", "Initial status is Pending");
    TEST_ASSERT(sub_json["testcases"].is_array(), "Testcases is array");

    // 3. Get user submissions for problem
    auto user_subs = SubmissionRepository::get_user_submissions_for_problem(conn, user_id, problem_id, 10);
    TEST_ASSERT(user_subs.is_array(), "User submissions is array");
    TEST_ASSERT(user_subs.size() >= 1, "User submissions contains at least 1 entry");

    // 4. Non-existent submission ID
    auto non_sub = SubmissionRepository::get_submission_by_id(conn, "00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(non_sub.is_null(), "Non-existent submission returns null JSON");
}

// -----------------------------------------------------------------------------
// 5. ContestService & Repository Deep Room Lifecycle & Limits
// -----------------------------------------------------------------------------
void test_contest_service_deep(const std::string& db_url) {
    std::cout << "\n--- Subtest: ContestService Room Lifecycle, Capacity & Scenarios ---" << std::endl;
    DbConnectionPool pool(db_url, 4);
    ContestService service(pool);

    // Create 3 test users for contest lifecycle
    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    std::string u1_id, u2_id, u3_id;
    {
        auto guard = pool.acquire();
        auto u1 = UserRepository::find_or_create_oauth_user(guard.get(), "host_" + std::to_string(ts) + "@test.com", "Host User", "", "github");
        auto u2 = UserRepository::find_or_create_oauth_user(guard.get(), "p2_" + std::to_string(ts) + "@test.com", "Player Two", "", "github");
        auto u3 = UserRepository::find_or_create_oauth_user(guard.get(), "p3_" + std::to_string(ts) + "@test.com", "Player Three", "", "github");
        u1_id = u1.id;
        u2_id = u2.id;
        u3_id = u3.id;
    }

    // 1. Create Room with maxParticipants = 2
    auto create_res = service.create_room(u1_id, 3, 30, std::make_optional(2), {"array"});
    TEST_ASSERT(create_res.success, "Contest room creation succeeded");
    TEST_ASSERT(create_res.room.has_value(), "Room object populated");
    std::string room_code = create_res.room->code;
    TEST_ASSERT(room_code.length() == 6, "Room code is 6 characters");
    TEST_ASSERT(create_res.room->question_count == 3, "Question count is 3");
    TEST_ASSERT(create_res.room->questions.size() == 3, "Questions array size is 3");
    TEST_ASSERT(create_res.room->participant_count == 1, "Initial participant count is 1 (host)");
    TEST_ASSERT(create_res.room->me_joined, "Host me_joined is true");

    // 2. Player 2 Joins Room (Room now at max capacity: 2/2)
    auto join2_res = service.join_room(u2_id, room_code);
    TEST_ASSERT(join2_res.success, "Player 2 successfully joined room");
    TEST_ASSERT(join2_res.room->participant_count == 2, "Participant count reached 2");

    // 3. Player 2 Joins Again (Idempotent Join)
    auto rejoin2_res = service.join_room(u2_id, room_code);
    TEST_ASSERT(rejoin2_res.success, "Player 2 idempotent rejoin returns success");
    TEST_ASSERT(rejoin2_res.room->participant_count == 2, "Participant count remains 2 without duplicates");

    // 4. Player 3 Attempts to Join Full Room (Must Fail with 400)
    auto join3_res = service.join_room(u3_id, room_code);
    TEST_ASSERT(!join3_res.success, "Player 3 rejected when room at capacity");
    TEST_ASSERT(join3_res.status_code == 400, "Rejected status code is 400");
    TEST_ASSERT(join3_res.message.find("full") != std::string::npos, "Message explains room is full");

    // 5. Fetch Room State
    auto fetched_opt = service.get_room(room_code, u2_id);
    TEST_ASSERT(fetched_opt.has_value(), "Room fetched by code");
    TEST_ASSERT(fetched_opt->me_joined, "Player 2 me_joined is true");
    TEST_ASSERT(fetched_opt->leaderboard.size() == 2, "Leaderboard contains 2 participants");

    // 6. Non-Existent Room Code
    auto non_room = service.get_room("NONEX9");
    TEST_ASSERT(!non_room.has_value(), "Non-existent room code returns nullopt");
    auto join_non = service.join_room(u3_id, "NONEX9");
    TEST_ASSERT(!join_non.success && join_non.status_code == 404, "Joining non-existent room returns 404");
}

// -----------------------------------------------------------------------------
// 6. ProfileService & Idempotent Analytics Deep Tests
// -----------------------------------------------------------------------------
void test_profile_service_deep(const std::string& db_url) {
    std::cout << "\n--- Subtest: ProfileService Analytics & Problem Solved Counts ---" << std::endl;
    DbConnectionPool pool(db_url, 4);
    ProfileService profile_service(pool);

    // Get an existing user
    std::string user_id;
    {
        auto guard = pool.acquire();
        pqxx::work txn(guard.get());
        auto rows = txn.exec("SELECT id FROM \"User\" LIMIT 1");
        TEST_ASSERT(!rows.empty(), "User exists in DB");
        user_id = rows[0][0].as<std::string>();
    }

    // 1. Fetch user profile
    auto prof_opt = profile_service.get_profile(user_id);
    TEST_ASSERT(prof_opt.has_value(), "Profile fetched successfully");
    auto prof = *prof_opt;

    TEST_ASSERT(prof.contains("user") && prof["user"]["id"] == user_id, "Profile user object valid");
    TEST_ASSERT(prof.contains("stats") && prof["stats"].contains("byDifficulty"), "Stats contains byDifficulty");
    auto by_diff = prof["stats"]["byDifficulty"];
    TEST_ASSERT(by_diff.is_array() && by_diff.size() == 3, "byDifficulty contains 3 entries");

    int total_catalog_sum = 0;
    for (const auto& item : by_diff) {
        total_catalog_sum += item["total"].get<int>();
    }
    TEST_ASSERT(total_catalog_sum == 250, "Catalog sum across difficulties equals 250 DSA problems");

    // 2. Test ProblemSolved idempotency
    {
        auto guard = pool.acquire();
        pqxx::work txn(guard.get());
        auto p_rows = txn.exec("SELECT id FROM \"Problem\" LIMIT 1");
        std::string p_id = p_rows[0][0].as<std::string>();

        // Insert first time
        txn.exec_params(
            "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
            "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT (\"userId\", \"problemId\") DO NOTHING",
            user_id, p_id
        );
        // Insert second time (same problem, same user)
        txn.exec_params(
            "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
            "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT (\"userId\", \"problemId\") DO NOTHING",
            user_id, p_id
        );
        txn.commit();

        // Verify count is 1 for this pair
        pqxx::work txn2(guard.get());
        auto cnt = txn2.exec_params(
            "SELECT count(*) FROM \"ProblemSolved\" WHERE \"userId\" = $1 AND \"problemId\" = $2",
            user_id, p_id
        );
        TEST_ASSERT(cnt[0][0].as<int>() == 1, "Duplicate ProblemSolved insert prevented by unique constraint");
    }

    // 3. Non-existent user profile
    auto non_prof = profile_service.get_profile("00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(!non_prof.has_value(), "Non-existent user profile returns nullopt");
}

// -----------------------------------------------------------------------------
// 7. SQL Injection Immunity & Parameterized Query Verification
// -----------------------------------------------------------------------------
void test_sql_injection_defense(const std::string& db_url) {
    std::cout << "\n--- Subtest: Parameterized Query Immunity to SQL Injection ---" << std::endl;
    pqxx::connection conn(db_url);

    // 1. Classic SQL injection in user ID lookup
    std::string sqli_id = "' OR '1'='1";
    auto sqli_user = UserRepository::find_by_id(conn, sqli_id);
    TEST_ASSERT(!sqli_user.has_value(), "SQLi in find_by_id safely returns nullopt (no leak)");

    // 2. Destructive SQL injection in user ID lookup
    std::string sqli_drop = "00000000-0000-0000-0000-000000000000'; DROP TABLE \"User\"; --";
    auto drop_user = UserRepository::find_by_id(conn, sqli_drop);
    TEST_ASSERT(!drop_user.has_value(), "SQLi drop query treated as literal string");

    // Verify "User" table is intact
    {
        pqxx::work txn(conn);
        auto count_rows = txn.exec("SELECT count(*) FROM \"User\"");
        TEST_ASSERT(count_rows[0][0].as<int>() > 0, "User table intact after destructive SQLi attack");
    }

    // 3. SQL injection in Problem lookup
    std::string sqli_prob = "00000000-0000-0000-0000-000000000000' OR 1=1; --";
    auto prob_res = ProblemRepository::find_problem_by_id(conn, sqli_prob);
    TEST_ASSERT(!prob_res.has_value(), "SQLi in find_problem_by_id safely returns nullopt");
}

// -----------------------------------------------------------------------------
// 8. DbConnectionPool Timeout, Exhaustion & Recovery
// -----------------------------------------------------------------------------
void test_db_connection_pool_timeout_and_exhaustion(const std::string& db_url) {
    std::cout << "\n--- Subtest: DbConnectionPool Timeout, Exhaustion & Recovery ---" << std::endl;

    // 1. Unreachable DB URL handling
    DbConnectionPool unreachable_pool("postgresql://invalid_host_12345:5432/invalid_db", 2);
    TEST_ASSERT(unreachable_pool.available_count() == 0, "Unreachable host results in 0 pool connections");

    bool timeout_thrown = false;
    try {
        unreachable_pool.acquire(std::chrono::milliseconds(50));
    } catch (const std::runtime_error& e) {
        timeout_thrown = true;
        std::string err_msg(e.what());
        TEST_ASSERT(err_msg.find("exhausted and timed out") != std::string::npos, "Exception message specifies timeout/exhaustion");
    }
    TEST_ASSERT(timeout_thrown, "Acquisition from exhausted/dead pool throws runtime_error within timeout");

    // 2. Pool immediate recovery when guard goes out of scope
    DbConnectionPool pool(db_url, 1);
    TEST_ASSERT(pool.available_count() == 1, "Single-connection pool has 1 connection");
    {
        auto g1 = pool.acquire(std::chrono::milliseconds(1000));
        TEST_ASSERT(pool.available_count() == 0, "Pool exhausted after acquire");
        pqxx::work txn(g1.get());
        auto r = txn.exec("SELECT 1");
        TEST_ASSERT(r[0][0].as<int>() == 1, "Guard query execution successful");
    }
    // g1 out of scope
    TEST_ASSERT(pool.available_count() == 1, "Pool immediately recovered available count after guard destruction");

    auto g2 = pool.acquire(std::chrono::milliseconds(1000));
    TEST_ASSERT(pool.available_count() == 0, "Subsequent acquire succeeds on recovered pool");
}

// -----------------------------------------------------------------------------
// 9. ProblemRepository Boundaries & Negative Filters
// -----------------------------------------------------------------------------
void test_problem_repository_boundaries_and_negative_filters(const std::string& db_url) {
    std::cout << "\n--- Subtest: ProblemRepository Boundaries & Negative Filters ---" << std::endl;
    pqxx::connection conn(db_url);

    // 1. Clamping negative page and limit
    ProblemQueryOptions neg_opts;
    neg_opts.page = -10;
    neg_opts.limit = -5;
    auto res_neg = ProblemRepository::find_problems_paginated(conn, neg_opts);
    TEST_ASSERT(res_neg.page == 1, "Negative page clamped to 1");
    TEST_ASSERT(res_neg.limit == 1, "Negative limit clamped to 1");
    TEST_ASSERT(res_neg.problems.size() == 1, "Returns exactly 1 problem for clamped limit 1");

    // 2. Clamping excessive limit (upper bound 100)
    ProblemQueryOptions huge_opts;
    huge_opts.limit = 5000;
    auto res_huge = ProblemRepository::find_problems_paginated(conn, huge_opts);
    TEST_ASSERT(res_huge.limit == 100, "Excessive limit clamped to max 100");
    TEST_ASSERT(res_huge.problems.size() == 100, "Returns 100 problems on max page limit");

    // 3. Page far beyond total pages
    ProblemQueryOptions far_opts;
    far_opts.page = 999999;
    far_opts.limit = 25;
    auto res_far = ProblemRepository::find_problems_paginated(conn, far_opts);
    TEST_ASSERT(res_far.problems.empty(), "Page beyond total returns empty problem list");
    TEST_ASSERT(res_far.total == 250, "Total count is preserved as 250");
    TEST_ASSERT(res_far.total_pages == 10, "Total pages is preserved as 10");

    // 4. Non-existent topic
    ProblemQueryOptions topic_opts;
    topic_opts.topic = "non_existent_topic_xyz_99";
    auto res_topic = ProblemRepository::find_problems_paginated(conn, topic_opts);
    TEST_ASSERT(res_topic.problems.empty(), "Non-existent topic returns empty list");
    TEST_ASSERT(res_topic.total == 0, "Total count is 0 for non-existent topic");

    // 5. Search with SQL wildcards and escaping
    ProblemQueryOptions sqli_opts;
    sqli_opts.search = "%' OR 1=1 -- \\'";
    auto res_sqli = ProblemRepository::find_problems_paginated(conn, sqli_opts);
    TEST_ASSERT(res_sqli.problems.empty(), "Wildcard SQL injection search safely escaped, returns empty");

    // 6. Unauthenticated status filter
    ProblemQueryOptions st_opts;
    st_opts.status = "Solved";
    auto res_st = ProblemRepository::find_problems_paginated(conn, st_opts, "");
    TEST_ASSERT(res_st.problems.empty() && res_st.total == 0, "Unauthenticated user querying Solved returns 0 problems");

    // 7. Authenticated status lifecycle ("Unsolved" -> "Attempted" -> "Solved")
    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    OAuthUser test_user = UserRepository::find_or_create_oauth_user(conn, "status_test_" + std::to_string(ts) + "@test.dev", "Status Tester", "", "github");
    
    // Pick first problem
    auto all_p = ProblemRepository::find_all_problems(conn);
    std::string test_pid = all_p[0].id;

    // Step A: Initially unsolved for this user
    auto detail_init = ProblemRepository::find_problem_by_id(conn, test_pid, test_user.id);
    TEST_ASSERT(detail_init.has_value(), "Detail found");
    TEST_ASSERT(detail_init->status == "Unsolved", "Initial status is Unsolved");

    // Step B: Submit attempt
    std::string sub_id = SubmissionRepository::create_submission(conn, test_user.id, test_pid, "// attempt");
    auto detail_attempt = ProblemRepository::find_problem_by_id(conn, test_pid, test_user.id);
    TEST_ASSERT(detail_attempt->status == "Attempted", "Status changed to Attempted after submission");
    TEST_ASSERT(detail_attempt->submission_count >= 1, "Submission count incremented");

    // Query paginated with status = Attempted
    ProblemQueryOptions att_opts;
    att_opts.status = "Attempted";
    auto res_att = ProblemRepository::find_problems_paginated(conn, att_opts, test_user.id);
    bool found_in_attempted = false;
    for (const auto& p : res_att.problems) {
        if (p.id == test_pid) found_in_attempted = true;
    }
    TEST_ASSERT(found_in_attempted, "Problem appears in Attempted filter query");

    // Step C: Mark solved in ProblemSolved
    {
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO \"ProblemSolved\" (\"id\", \"userId\", \"problemId\", \"createdAt\", \"updatedAt\") "
            "VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) ON CONFLICT (\"userId\", \"problemId\") DO NOTHING",
            test_user.id, test_pid
        );
        txn.commit();
    }
    auto detail_solved = ProblemRepository::find_problem_by_id(conn, test_pid, test_user.id);
    TEST_ASSERT(detail_solved->status == "Solved", "Status changed to Solved");

    // Query paginated with status = Solved
    ProblemQueryOptions sol_opts;
    sol_opts.status = "Solved";
    auto res_sol = ProblemRepository::find_problems_paginated(conn, sol_opts, test_user.id);
    bool found_in_solved = false;
    for (const auto& p : res_sol.problems) {
        if (p.id == test_pid) found_in_solved = true;
    }
    TEST_ASSERT(found_in_solved, "Problem appears in Solved filter query");

    // Query paginated with status = Unsolved should now exclude this problem
    ProblemQueryOptions un_opts;
    un_opts.status = "Unsolved";
    auto res_un = ProblemRepository::find_problems_paginated(conn, un_opts, test_user.id);
    bool found_in_unsolved = false;
    for (const auto& p : res_un.problems) {
        if (p.id == test_pid) found_in_unsolved = true;
    }
    TEST_ASSERT(!found_in_unsolved, "Solved problem excluded from Unsolved filter query");

    // 8. Non-existent problem lookups
    auto p_empty = ProblemRepository::find_problem_by_id(conn, "");
    TEST_ASSERT(!p_empty.has_value(), "Empty problem ID returns nullopt");
    auto p_malformed = ProblemRepository::find_problem_by_id(conn, "malformed-id-not-uuid");
    TEST_ASSERT(!p_malformed.has_value(), "Malformed problem ID safely returns nullopt without DB throw");
}

// -----------------------------------------------------------------------------
// 10. ContestService Negative Paths & Limits
// -----------------------------------------------------------------------------
void test_contest_service_negative_paths_and_limits(const std::string& db_url) {
    std::cout << "\n--- Subtest: ContestService Negative Paths & Limits ---" << std::endl;
    DbConnectionPool pool(db_url, 4);
    ContestService service(pool);

    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    std::string host_uid;
    {
        auto g = pool.acquire();
        auto u = UserRepository::find_or_create_oauth_user(g.get(), "host_neg_" + std::to_string(ts) + "@test.dev", "Host Neg", "", "github");
        host_uid = u.id;
    }

    // 1. Requesting excessive questions exceeding pool
    auto res_toomany = service.create_room(host_uid, 500, 30, std::nullopt, {"array"});
    TEST_ASSERT(!res_toomany.success, "Creating room with 500 questions rejected");
    TEST_ASSERT(res_toomany.status_code == 400, "Excessive questions rejected with status 400");
    TEST_ASSERT(res_toomany.message.find("available") != std::string::npos, "Message specifies available count");

    // 2. Requesting non-existent topic
    auto res_notopic = service.create_room(host_uid, 3, 30, std::nullopt, {"totally_fake_topic_999"});
    TEST_ASSERT(!res_notopic.success && res_notopic.status_code == 400, "Non-existent topic rejected with 400");
    TEST_ASSERT(res_notopic.message.find("0 problems available") != std::string::npos, "Message confirms 0 problems available");

    // 3. Joining an ended contest room
    auto created = service.create_room(host_uid, 2, 30, std::nullopt, {});
    TEST_ASSERT(created.success, "Test room created");
    std::string code = created.room->code;

    // Mutate endsAt to past timestamp in DB
    {
        auto g = pool.acquire();
        pqxx::work txn(g.get());
        txn.exec_params("UPDATE \"ContestRoom\" SET \"endsAt\" = NOW() - INTERVAL '1 hour' WHERE code = $1", code);
        txn.commit();
    }

    std::string player_uid;
    {
        auto g = pool.acquire();
        auto u = UserRepository::find_or_create_oauth_user(g.get(), "player_exp_" + std::to_string(ts) + "@test.dev", "Player Exp", "", "github");
        player_uid = u.id;
    }
    auto join_expired = service.join_room(player_uid, code);
    TEST_ASSERT(!join_expired.success, "Joining ended contest rejected");
    TEST_ASSERT(join_expired.status_code == 400, "Status is 400");
    TEST_ASSERT(join_expired.message == "Contest room has already ended", "Message explains contest room has already ended");

    // 4. Joining non-existent room code
    auto join_non = service.join_room(player_uid, "ZZZZZZ");
    TEST_ASSERT(!join_non.success && join_non.status_code == 404, "Joining non-existent room returns 404");
    TEST_ASSERT(join_non.message == "Contest room not found", "Message is 'Contest room not found'");

    // 5. Room code generator verification (alphabet charset & uniqueness)
    std::unordered_set<std::string> codes;
    static const std::string allowed_chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    for (int i = 0; i < 100; ++i) {
        std::string c = ContestService::generate_room_code();
        TEST_ASSERT(c.length() == 6, "Code is length 6");
        for (char ch : c) {
            TEST_ASSERT(allowed_chars.find(ch) != std::string::npos, "Char in allowed alphabet");
        }
        codes.insert(c);
    }
    TEST_ASSERT(codes.size() >= 95, "Generated codes have high uniqueness (>= 95 distinct in 100 draws)");
}

// -----------------------------------------------------------------------------
// 11. ExecutionService Validation & Error Responses
// -----------------------------------------------------------------------------
void test_execution_service_validation_and_errors(const std::string& db_url, const std::string& redis_host, int redis_port) {
    std::cout << "\n--- Subtest: ExecutionService Validation & Error Handling ---" << std::endl;
    DbConnectionPool pool(db_url, 4);
    ExecutionService exec_svc(pool, redis_host, redis_port);

    // 1. run_code with empty source code
    auto r1 = exec_svc.run_code("uid_test", "", {});
    TEST_ASSERT(!r1.success, "run_code rejects empty source");
    TEST_ASSERT(r1.status_code == 400, "run_code status is 400");
    TEST_ASSERT(r1.message == "Source code is required", "run_code message confirms source code is required");

    // 2. submit_code with empty source code
    auto s1 = exec_svc.submit_code("uid_test", "pid_test", "", "");
    TEST_ASSERT(!s1.success, "submit_code rejects empty source");
    TEST_ASSERT(s1.status_code == 400, "submit_code status is 400");
    TEST_ASSERT(s1.message == "Missing problemId or sourceCode", "submit_code error confirms missing fields");

    // 3. submit_code with empty problemId
    auto s2 = exec_svc.submit_code("uid_test", "", "int main(){}", "");
    TEST_ASSERT(!s2.success, "submit_code rejects empty problemId");
    TEST_ASSERT(s2.status_code == 400, "submit_code status is 400");

    // 4. submit_code with non-existent problemId
    auto s3 = exec_svc.submit_code("uid_test", "00000000-0000-0000-0000-000000000000", "int main(){}", "");
    TEST_ASSERT(!s3.success, "submit_code rejects non-existent problemId");
    TEST_ASSERT(s3.status_code == 404, "submit_code status is 404");
    TEST_ASSERT(s3.message == "Problem not found", "submit_code message is 'Problem not found'");

    // 5. get_submission_by_id with non-existent UUID
    auto sub_null = exec_svc.get_submission_by_id("00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(sub_null.is_null(), "Non-existent submission returns null JSON");

    // 6. get_user_submissions_for_problem with non-existent user/problem
    auto subs_empty = exec_svc.get_user_submissions_for_problem("00000000-0000-0000-0000-000000000000", "00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(subs_empty.is_array() && subs_empty.empty(), "Non-existent user/prob returns empty array");
}

// -----------------------------------------------------------------------------
// 12. AuthService Negative Paths & Edge Cases
// -----------------------------------------------------------------------------
void test_auth_service_negative_paths(const std::string& db_url, const std::string& jwt_secret) {
    std::cout << "\n--- Subtest: AuthService Negative Paths & Fallbacks ---" << std::endl;
    DbConnectionPool pool(db_url, 4);
    AuthService auth_svc(pool, jwt_secret);

    // 1. handle_github_oauth with empty code
    auto gh = auth_svc.handle_github_oauth("", "cid", "sec");
    TEST_ASSERT(!gh.success, "Empty GitHub code rejected");
    TEST_ASSERT(gh.status_code == 400, "Status is 400");
    TEST_ASSERT(gh.message == "GitHub authorization code is required", "Message confirms code required");

    // 2. handle_google_oauth with empty credential
    auto g1 = auth_svc.handle_google_oauth("", "cid");
    TEST_ASSERT(!g1.success, "Empty Google credential rejected");
    TEST_ASSERT(g1.status_code == 400, "Status is 400");
    TEST_ASSERT(g1.message == "Google credential token is required", "Message confirms credential required");

    // 3. handle_google_oauth_code with empty code
    auto g2 = auth_svc.handle_google_oauth_code("", "cid", "sec", "uri");
    TEST_ASSERT(!g2.success, "Empty Google code rejected");
    TEST_ASSERT(g2.status_code == 400, "Status is 400");
    TEST_ASSERT(g2.message == "Google authorization code is required", "Message confirms code required");

    // 4. handle_oauth fallback naming & email generation
    auto fb_gh = auth_svc.handle_oauth("github", "", "", "");
    TEST_ASSERT(fb_gh.success, "Fallback GitHub OAuth succeeds");
    TEST_ASSERT(fb_gh.user.email == "github_user@campuslab.dev", "Default github email assigned");
    TEST_ASSERT(fb_gh.user.name == "GitHub User", "Default github name assigned");
    TEST_ASSERT(!fb_gh.token.empty(), "JWT token generated for fallback user");

    auto fb_goog = auth_svc.handle_oauth("google", "", "", "");
    TEST_ASSERT(fb_goog.success, "Fallback Google OAuth succeeds");
    TEST_ASSERT(fb_goog.user.email == "google_user@campuslab.dev", "Default google email assigned");
    TEST_ASSERT(fb_goog.user.name == "Google User", "Default google name assigned");

    // 5. get_user_by_id with non-existent user
    auto no_user = auth_svc.get_user_by_id("00000000-0000-0000-0000-000000000000");
    TEST_ASSERT(!no_user.has_value(), "Non-existent user lookup returns nullopt");
}

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << "    Campus Lab - Server Deep Database & Pool Unit Tests   " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    std::cout << "[Test] Using DATABASE_URL: " << cfg.db_url << std::endl;

    test_db_connection_pool(cfg.db_url);
    test_user_repository(cfg.db_url);
    test_problem_repository(cfg.db_url);
    test_submission_repository(cfg.db_url);
    test_contest_service_deep(cfg.db_url);
    test_profile_service_deep(cfg.db_url);
    test_sql_injection_defense(cfg.db_url);

    test_db_connection_pool_timeout_and_exhaustion(cfg.db_url);
    test_problem_repository_boundaries_and_negative_filters(cfg.db_url);
    test_contest_service_negative_paths_and_limits(cfg.db_url);
    test_execution_service_validation_and_errors(cfg.db_url, cfg.redis_host, cfg.redis_port);
    test_auth_service_negative_paths(cfg.db_url, cfg.jwt_secret);

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "   ALL SERVER DATABASE & POOL UNIT TESTS PASSED (100%)!   " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

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
#include "auth_helper.hpp"

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
    TEST_ASSERT(all_problems.size() == 270, "find_all_problems returns all 270 DSA problems");

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
    TEST_ASSERT(total_catalog_sum == 270, "Catalog sum across difficulties equals 270 DSA problems");

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

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "   ALL SERVER DATABASE & POOL UNIT TESTS PASSED (100%)!   " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

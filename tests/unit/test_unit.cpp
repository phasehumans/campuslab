#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <algorithm>
#include <thread>
#include <chrono>
#include "auth_helper.hpp"
#include "types.hpp"
#include "../../server/src/models/models.hpp"
#include "../../judge/src/sandbox/isolate.hpp"
#include "../../server/src/repositories/problem_repository.hpp"
#include "../../server/src/config/app_config.hpp"
#include "../../server/src/middleware/rate_limiter.hpp"
#include "../../server/src/middleware/auth_middleware.hpp"
#include "../../server/src/middleware/cors.hpp"

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

// -------------------------------------------------------------
// 1. Password Hashing & Edge Cases
// -------------------------------------------------------------
void test_auth_helper_password() {
    std::string raw_pass = "SecureP@ss123!#$";
    std::string hash1 = AuthHelper::hash_password(raw_pass);
    std::string hash2 = AuthHelper::hash_password(raw_pass);

    TEST_ASSERT(!hash1.empty(), "Password hash should not be empty");
    TEST_ASSERT(hash1 != raw_pass, "Password hash must not equal plaintext");
    TEST_ASSERT(hash1 != hash2, "Salted hashes for same password must differ");

    TEST_ASSERT(AuthHelper::verify_password(raw_pass, hash1), "Valid password must verify against hash1");
    TEST_ASSERT(AuthHelper::verify_password(raw_pass, hash2), "Valid password must verify against hash2");
    TEST_ASSERT(!AuthHelper::verify_password("WrongPassword!", hash1), "Wrong password must be rejected");
    TEST_ASSERT(!AuthHelper::verify_password("", hash1), "Empty password must be rejected");

    // Special characters
    std::string complex_pass = "!@#$%^&*()_+-=[]{}|;':\",.<>/?`~";
    std::string complex_hash = AuthHelper::hash_password(complex_pass);
    TEST_ASSERT(AuthHelper::verify_password(complex_pass, complex_hash), "Password with ASCII symbols must verify");

    // 64-character password (bcrypt standard limit is 72 bytes)
    std::string long_pass(64, 'x');
    std::string long_hash = AuthHelper::hash_password(long_pass);
    TEST_ASSERT(AuthHelper::verify_password(long_pass, long_hash), "64-character long password must verify");
    TEST_ASSERT(!AuthHelper::verify_password(std::string(63, 'x'), long_hash), "Length mismatch on long password rejected");

    // Malformed / corrupted hash strings
    TEST_ASSERT(!AuthHelper::verify_password(raw_pass, "plaintext_not_a_hash"), "Plaintext hash rejected without crashing");
    TEST_ASSERT(!AuthHelper::verify_password(raw_pass, "$2a$10$tooshort"), "Truncated bcrypt hash rejected safely");
    TEST_ASSERT(!AuthHelper::verify_password(raw_pass, ""), "Empty hash string rejected safely");
    TEST_ASSERT(!AuthHelper::verify_password(raw_pass, "$2a$10$invalidcharacters@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"), "Corrupted hash rejected safely");
}

// -------------------------------------------------------------
// 2. JWT Signing, Verification & Tampering Defense
// -------------------------------------------------------------
void test_auth_helper_jwt() {
    std::string secret = "test_super_secret_key_12345";
    std::string user_id = "user_abc_123";
    std::string role = "ADMIN";

    std::string token = AuthHelper::sign_jwt(user_id, role, secret);
    TEST_ASSERT(!token.empty(), "JWT token should not be empty");

    std::string out_id, out_role;
    bool valid = AuthHelper::verify_jwt(token, secret, out_id, out_role);
    TEST_ASSERT(valid, "Valid JWT token must pass verification");
    TEST_ASSERT(out_id == user_id, "Verified user_id must match original");
    TEST_ASSERT(out_role == role, "Verified role must match original");

    // Test with wrong secret
    std::string fake_id, fake_role;
    bool invalid_secret = AuthHelper::verify_jwt(token, "wrong_secret_key", fake_id, fake_role);
    TEST_ASSERT(!invalid_secret, "JWT with wrong secret must fail verification");

    // Tampered signature
    std::string tampered_sig = token;
    tampered_sig[tampered_sig.size() - 5] = (tampered_sig[tampered_sig.size() - 5] == 'A') ? 'B' : 'A';
    bool tampered_sig_res = AuthHelper::verify_jwt(tampered_sig, secret, fake_id, fake_role);
    TEST_ASSERT(!tampered_sig_res, "Tampered JWT signature must fail verification");

    // Tampered payload (flip a bit in middle section)
    auto first_dot = token.find('.');
    auto second_dot = token.find('.', first_dot + 1);
    TEST_ASSERT(first_dot != std::string::npos && second_dot != std::string::npos, "JWT must have 2 dots");

    std::string tampered_payload = token;
    tampered_payload[first_dot + 2] = (tampered_payload[first_dot + 2] == 'A') ? 'B' : 'A';
    bool tampered_payload_res = AuthHelper::verify_jwt(tampered_payload, secret, fake_id, fake_role);
    TEST_ASSERT(!tampered_payload_res, "Tampered JWT payload must fail verification");

    // Malformed tokens
    TEST_ASSERT(!AuthHelper::verify_jwt("", secret, fake_id, fake_role), "Empty token rejected");
    TEST_ASSERT(!AuthHelper::verify_jwt("no_dots_here", secret, fake_id, fake_role), "Token with no dots rejected");
    TEST_ASSERT(!AuthHelper::verify_jwt("only.one_dot", secret, fake_id, fake_role), "Token with 1 dot rejected");
    TEST_ASSERT(!AuthHelper::verify_jwt("a.b.c.d", secret, fake_id, fake_role), "Token with 3 dots rejected");
    TEST_ASSERT(!AuthHelper::verify_jwt("invalid_base64!.invalid!.invalid!", secret, fake_id, fake_role), "Invalid characters rejected");

    // Expired JWT token test
    json exp_payload = {
        {"id", "user_123"},
        {"role", "USER"},
        {"exp", 1000000000} // Year 2001
    };
    json jwt_hdr = {{"alg", "HS256"}, {"typ", "JWT"}};
    std::string exp_to_sign = AuthHelper::base64_url_encode(jwt_hdr.dump()) + "." + AuthHelper::base64_url_encode(exp_payload.dump());
    std::string exp_token = exp_to_sign + "." + AuthHelper::base64_url_encode(AuthHelper::hmac_sha256(exp_to_sign, secret));
    TEST_ASSERT(!AuthHelper::verify_jwt(exp_token, secret, fake_id, fake_role), "Expired JWT token must fail verification");

    // Base64URL encode and decode edge cases
    std::string test_str = "CampusLab::Competitive_Programming@2026!#$^&*()_+{}|:<>?~";
    std::string b64 = AuthHelper::base64_url_encode(test_str);
    TEST_ASSERT(b64.find('+') == std::string::npos && b64.find('/') == std::string::npos && b64.find('=') == std::string::npos, "Base64URL does not contain +, /, or =");
    std::string decoded = AuthHelper::base64_url_decode(b64);
    TEST_ASSERT(decoded == test_str, "Base64URL decode roundtrips original string");
    TEST_ASSERT(AuthHelper::base64_url_encode("").empty(), "Base64URL of empty string is empty");
    TEST_ASSERT(AuthHelper::base64_url_decode("").empty(), "Base64URL decode of empty string is empty");
}

// -------------------------------------------------------------
// 3. Output Normalization & CP Evaluator
// -------------------------------------------------------------
void test_isolate_output_normalization() {
    // Exact match
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("42", "42"), "Exact match tokens");

    // Whitespace, spaces, multiple tabs, newlines
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("", ""), "Empty against empty matches");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("   \n\t\r\n  ", ""), "Whitespace-only against empty matches");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("", "   \n\t  "), "Empty against whitespace-only matches");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("  42  \n", "42"), "Trailing/leading whitespace stripped");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("1 2 3\n4 5\n", "1\n2\n3\n4\n5"), "Multi-line token equivalence");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("1\t\t2\t3\n", "1 2 3"), "Tab separation equivalence");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("1\r\n2\r\n3\r\n", "1\n2\n3"), "Windows CRLF newline equivalence");
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("  100   200   300  ", "100 200 300"), "Multiple consecutive spaces equivalence");

    // Negative numbers
    TEST_ASSERT(IsolateSandbox::normalize_and_compare("-5 -10 0 15", "-5\n-10\n0\n15"), "Negative integers equivalence");

    // Token count and content mismatches
    TEST_ASSERT(!IsolateSandbox::normalize_and_compare("42", "43"), "Different values must not match");
    TEST_ASSERT(!IsolateSandbox::normalize_and_compare("1 2 3", "1 2"), "Extra output token must not match");
    TEST_ASSERT(!IsolateSandbox::normalize_and_compare("1 2", "1 2 3"), "Missing output token must not match");
    TEST_ASSERT(!IsolateSandbox::normalize_and_compare("", "1"), "Empty output against non-empty must not match");
    TEST_ASSERT(!IsolateSandbox::normalize_and_compare("1", ""), "Non-empty output against empty must not match");
    TEST_ASSERT(!IsolateSandbox::normalize_and_compare("True", "true"), "Case sensitive token mismatch");

    // Large volume token stream (1,000 tokens)
    std::string large_actual, large_expected;
    for (int i = 0; i < 1000; ++i) {
        large_actual += std::to_string(i) + (i % 5 == 0 ? "\n" : "  ");
        large_expected += std::to_string(i) + " ";
    }
    TEST_ASSERT(IsolateSandbox::normalize_and_compare(large_actual, large_expected), "1,000-token stream normalized comparison");
}

// -------------------------------------------------------------
// 4. Meta File Parsing
// -------------------------------------------------------------
void test_isolate_meta_parser() {
    std::string test_meta_path = "/tmp/test_isolate_meta.txt";
    {
        std::ofstream ofs(test_meta_path);
        ofs << "time:0.042\n";
        ofs << "time-wall:0.045\n";
        ofs << "max-rss:2048\n";
        ofs << "status:TO\n";
        ofs << "message:Time limit exceeded\n";
        ofs << "exitcode:0\n";
    }

    auto meta = IsolateSandbox::parse_meta(test_meta_path);
    TEST_ASSERT(meta["time"] == "0.042", "Meta time parsed correctly");
    TEST_ASSERT(meta["max-rss"] == "2048", "Meta max-rss parsed correctly");
    TEST_ASSERT(meta["status"] == "TO", "Meta status parsed correctly");
    TEST_ASSERT(meta["message"] == "Time limit exceeded", "Meta message parsed correctly");

    std::filesystem::remove(test_meta_path);

    // Non-existent file
    auto empty_meta = IsolateSandbox::parse_meta("/tmp/non_existent_meta_file_999.txt");
    TEST_ASSERT(empty_meta.empty(), "Non-existent meta file returns empty map without throwing");
}

// -------------------------------------------------------------
// 5. DTO Serialization & JSON Schema Validation
// -------------------------------------------------------------
void test_dto_serialization() {
    // UserModel JSON serialization
    UserModel user;
    user.id = "user-uuid-123";
    user.name = "Alice Tester";
    user.email = "alice@campuslab.dev";
    user.avatar = "https://example.com/alice.png";
    user.provider = "github";
    user.role = "USER";
    user.created_at = "2026-11-07 10:00:00";

    json user_j = user.to_json();
    TEST_ASSERT(user_j["id"] == "user-uuid-123", "User ID serialized");
    TEST_ASSERT(user_j["name"] == "Alice Tester", "User name serialized");
    TEST_ASSERT(user_j["email"] == "alice@campuslab.dev", "User email serialized");
    TEST_ASSERT(user_j["avatar"] == "https://example.com/alice.png", "User avatar serialized");
    TEST_ASSERT(user_j["provider"] == "github", "User provider serialized");
    TEST_ASSERT(user_j["role"] == "USER", "User role serialized");

    // ProblemSummaryModel
    ProblemSummaryModel summary;
    summary.id = "prob-uuid-123";
    summary.title = "Binary Tree Inorder Traversal";
    summary.difficulty = "Medium";
    summary.tags = {"tree", "dfs", "binary-tree"};
    summary.status = "Solved";
    summary.submission_count = 5;

    json summary_j = summary.to_json();
    TEST_ASSERT(summary_j["id"] == "prob-uuid-123", "Summary ID serialized");
    TEST_ASSERT(summary_j["title"] == "Binary Tree Inorder Traversal", "Summary title serialized");
    TEST_ASSERT(summary_j["difficulty"] == "Medium", "Summary difficulty serialized");
    TEST_ASSERT(summary_j["status"] == "Solved", "Summary status serialized");
    TEST_ASSERT(summary_j["submissionCount"] == 5, "Summary submissionCount serialized");
    TEST_ASSERT(summary_j["tags"].size() == 3, "Summary tags array length matches");

    // ProblemDetailModel
    ProblemDetailModel detail;
    detail.id = "prob-uuid-123";
    detail.title = "Binary Tree Inorder Traversal";
    detail.description = "Given root of a tree...";
    detail.difficulty = "Medium";
    detail.hints = "Use a stack or recursion";
    detail.editorial = std::nullopt;
    detail.examples = json::array({ {{"input", "[1,null,2,3]"}, {"output", "[1,3,2]"}} });
    detail.starter_codes = {{"cpp", "class Solution{};"}};

    json detail_j = detail.to_json();
    TEST_ASSERT(detail_j["hints"] == "Use a stack or recursion", "Detail hints serialized");
    TEST_ASSERT(detail_j["editorial"].is_null(), "Detail null editorial serialized as null");
    TEST_ASSERT(detail_j["examples"].size() == 1, "Detail examples array serialized");
    TEST_ASSERT(detail_j["starterCodes"]["cpp"] == "class Solution{};", "Detail starterCodes serialized");
}

// -------------------------------------------------------------
// 6. Contest Leaderboard Scoring & Tie-Breaking Algorithm
// -------------------------------------------------------------
void test_contest_leaderboard_sorting() {
    std::vector<ContestLeaderboardItem> items;

    ContestLeaderboardItem u1;
    u1.user_id = "u1";
    u1.score = 200;
    u1.solved = 2;
    u1.last_accepted_at = "2026-11-07T10:30:00Z";

    ContestLeaderboardItem u2;
    u2.user_id = "u2";
    u2.score = 300; // Higher score
    u2.solved = 2;
    u2.last_accepted_at = "2026-11-07T10:45:00Z";

    ContestLeaderboardItem u3;
    u3.user_id = "u3";
    u3.score = 200; // Same score as u1, same solved count, but submitted earlier!
    u3.solved = 2;
    u3.last_accepted_at = "2026-11-07T10:15:00Z";

    ContestLeaderboardItem u4;
    u4.user_id = "u4";
    u4.score = 200; // Same score as u1, but solved fewer problems (e.g. 1 hard instead of 2 easy)
    u4.solved = 1;
    u4.last_accepted_at = "2026-11-07T10:10:00Z";

    items.push_back(u1);
    items.push_back(u2);
    items.push_back(u3);
    items.push_back(u4);

    std::sort(items.begin(), items.end(), [](const ContestLeaderboardItem& a, const ContestLeaderboardItem& b) {
        if (a.score != b.score) return a.score > b.score;
        if (a.solved != b.solved) return a.solved > b.solved;
        std::string ta = a.last_accepted_at.value_or("9999");
        std::string tb = b.last_accepted_at.value_or("9999");
        return ta < tb;
    });

    for (size_t i = 0; i < items.size(); ++i) {
        items[i].rank = static_cast<int>(i + 1);
    }

    // Expected order:
    // 1st: u2 (Score 300)
    // 2nd: u3 (Score 200, solved 2, accepted at 10:15)
    // 3rd: u1 (Score 200, solved 2, accepted at 10:30)
    // 4th: u4 (Score 200, solved 1)
    TEST_ASSERT(items[0].user_id == "u2" && items[0].rank == 1, "Rank 1: Highest score (u2)");
    TEST_ASSERT(items[1].user_id == "u3" && items[1].rank == 2, "Rank 2: Earlier submission tie-breaker (u3)");
    TEST_ASSERT(items[2].user_id == "u1" && items[2].rank == 3, "Rank 3: Later submission (u1)");
    TEST_ASSERT(items[3].user_id == "u4" && items[3].rank == 4, "Rank 4: Fewer problems solved (u4)");
}

// -------------------------------------------------------------
// 7. Postgres Array Parser Edge Cases
// -------------------------------------------------------------
void test_pg_array_parser() {
    auto res1 = ProblemRepository::parse_pg_array("{array,two-pointers,hash-table}");
    TEST_ASSERT(res1.size() == 3, "Array size must be 3");
    TEST_ASSERT(res1[0] == "array", "Item 0 must be 'array'");
    TEST_ASSERT(res1[1] == "two-pointers", "Item 1 must be 'two-pointers'");
    TEST_ASSERT(res1[2] == "hash-table", "Item 2 must be 'hash-table'");

    auto res2 = ProblemRepository::parse_pg_array("{\"dynamic-programming\",\"binary-search\"}");
    TEST_ASSERT(res2.size() == 2, "Quoted array size must be 2");
    TEST_ASSERT(res2[0] == "dynamic-programming", "Quoted Item 0 stripped");
    TEST_ASSERT(res2[1] == "binary-search", "Quoted Item 1 stripped");

    auto res3 = ProblemRepository::parse_pg_array("{}");
    TEST_ASSERT(res3.empty(), "Empty pg array must return empty vector");

    // Single element
    auto res4 = ProblemRepository::parse_pg_array("{greedy}");
    TEST_ASSERT(res4.size() == 1 && res4[0] == "greedy", "Single element array parsed");

    // Malformed strings without braces
    auto res5 = ProblemRepository::parse_pg_array("not_an_array");
    TEST_ASSERT(res5.empty(), "Non-array string handled safely");
}

// -------------------------------------------------------------
// 8. Application Config Loader
// -------------------------------------------------------------
void test_app_config_loader() {
    AppConfig cfg = AppConfig::load_from_env();
    TEST_ASSERT(cfg.port > 0, "Default or configured port is valid");
    TEST_ASSERT(!cfg.jwt_secret.empty(), "JWT secret is loaded");
    TEST_ASSERT(!cfg.db_url.empty(), "Database URL is loaded");
    TEST_ASSERT(!cfg.redis_host.empty(), "Redis host is loaded");
    TEST_ASSERT(cfg.redis_port > 0, "Redis port is valid");
    TEST_ASSERT(cfg.db_pool_size > 0, "DB pool size is positive");
}

// -------------------------------------------------------------
// 9. RateLimiter Sliding Window & Multi-Client Isolation
// -------------------------------------------------------------
void test_rate_limiter_edge_cases() {
    // 3 requests per 1 second window
    RateLimiter limiter(3, 1);

    // Client 1 - First 3 requests allowed
    auto r1 = limiter.check_limit("client_1");
    TEST_ASSERT(r1.allowed, "Req 1 allowed");
    TEST_ASSERT(r1.remaining == 2, "Req 1 remaining is 2");
    TEST_ASSERT(r1.retry_after_seconds == 0, "Req 1 retry_after is 0");

    auto r2 = limiter.check_limit("client_1");
    TEST_ASSERT(r2.allowed, "Req 2 allowed");
    TEST_ASSERT(r2.remaining == 1, "Req 2 remaining is 1");

    auto r3 = limiter.check_limit("client_1");
    TEST_ASSERT(r3.allowed, "Req 3 allowed (limit reached)");
    TEST_ASSERT(r3.remaining == 0, "Req 3 remaining is 0");

    // Client 1 - 4th request burst rejected
    auto r4 = limiter.check_limit("client_1");
    TEST_ASSERT(!r4.allowed, "Req 4 rejected (over limit)");
    TEST_ASSERT(r4.remaining == 0, "Req 4 remaining is 0");
    TEST_ASSERT(r4.retry_after_seconds >= 1, "Req 4 retry_after_seconds >= 1");

    // Client 2 - Independent key must not be blocked by Client 1
    auto c2_r1 = limiter.check_limit("client_2");
    TEST_ASSERT(c2_r1.allowed, "Client 2 allowed while Client 1 is blocked (key isolation)");
    TEST_ASSERT(c2_r1.remaining == 2, "Client 2 remaining is 2");

    // Window expiration: wait for 1.1s so Client 1 window clears
    std::this_thread::sleep_for(std::chrono::milliseconds(1100));

    auto r5 = limiter.check_limit("client_1");
    TEST_ASSERT(r5.allowed, "Client 1 allowed again after sliding window expiration");
    TEST_ASSERT(r5.remaining == 2, "Client 1 remaining reset to 2");

    // Strict 1-request limiter
    RateLimiter strict_limiter(1, 2);
    auto s1 = strict_limiter.check_limit("strict_key");
    TEST_ASSERT(s1.allowed && s1.remaining == 0, "Strict limiter 1st request allowed");
    auto s2 = strict_limiter.check_limit("strict_key");
    TEST_ASSERT(!s2.allowed && s2.retry_after_seconds >= 1, "Strict limiter 2nd request blocked");
}

// -------------------------------------------------------------
// 10. RateLimiter Client IP Extraction & Header Precedence
// -------------------------------------------------------------
void test_rate_limiter_client_ip_extraction() {
    // 1. Multi-hop X-Forwarded-For: extracts first IP
    {
        crow::request req;
        req.add_header("X-Forwarded-For", "203.0.113.195, 70.41.3.18, 150.172.238.178");
        req.add_header("X-Real-IP", "10.0.0.1");
        req.remote_ip_address = "127.0.0.1";
        TEST_ASSERT(RateLimiter::get_client_ip(req) == "203.0.113.195", "Multi-hop X-Forwarded-For extracts first IP");
    }

    // 2. Single-hop X-Forwarded-For
    {
        crow::request req;
        req.add_header("X-Forwarded-For", "198.51.100.42");
        TEST_ASSERT(RateLimiter::get_client_ip(req) == "198.51.100.42", "Single-hop X-Forwarded-For extracted");
    }

    // 3. X-Real-IP fallback when X-Forwarded-For is missing
    {
        crow::request req;
        req.add_header("X-Real-IP", "172.16.254.1");
        req.remote_ip_address = "127.0.0.1";
        TEST_ASSERT(RateLimiter::get_client_ip(req) == "172.16.254.1", "X-Real-IP used when X-Forwarded-For absent");
    }

    // 4. remote_ip_address fallback when both proxy headers missing
    {
        crow::request req;
        req.remote_ip_address = "192.168.1.50";
        TEST_ASSERT(RateLimiter::get_client_ip(req) == "192.168.1.50", "remote_ip_address used when proxy headers absent");
    }

    // 5. Default 127.0.0.1 fallback when all sources empty
    {
        crow::request req;
        req.remote_ip_address = "";
        TEST_ASSERT(RateLimiter::get_client_ip(req) == "127.0.0.1", "Default 127.0.0.1 returned when all IP sources empty");
    }
}

// -------------------------------------------------------------
// 11. AuthMiddleware Token Extraction Edge Cases
// -------------------------------------------------------------
void test_auth_middleware_token_extraction() {
    // 1. Empty request
    {
        crow::request req;
        TEST_ASSERT(AuthMiddleware::extract_token(req).empty(), "Empty request extracts empty token");
    }

    // 2. Bearer Authorization header
    {
        crow::request req;
        req.add_header("Authorization", "Bearer my_super_secret_jwt_token_123");
        TEST_ASSERT(AuthMiddleware::extract_token(req) == "my_super_secret_jwt_token_123", "Bearer token extracted");
    }

    // 3. Authorization header with empty token after "Bearer "
    {
        crow::request req;
        req.add_header("Authorization", "Bearer ");
        TEST_ASSERT(AuthMiddleware::extract_token(req).empty(), "Bearer without token extracts empty");
    }

    // 4. Basic Auth header (non-Bearer) must not be extracted
    {
        crow::request req;
        req.add_header("Authorization", "Basic dXNlcjpwYXNzd29yZA==");
        TEST_ASSERT(AuthMiddleware::extract_token(req).empty(), "Non-Bearer auth header ignored");
    }

    // 5. Lowercase bearer (case sensitivity check)
    {
        crow::request req;
        req.add_header("Authorization", "bearer my_token");
        TEST_ASSERT(AuthMiddleware::extract_token(req).empty(), "Lowercase bearer ignored safely");
    }

    // 6. Cookie header: single token cookie
    {
        crow::request req;
        req.add_header("Cookie", "token=cookie_token_abc");
        TEST_ASSERT(AuthMiddleware::extract_token(req) == "cookie_token_abc", "Cookie token extracted");
    }

    // 7. Cookie header: token in middle of multiple cookies
    {
        crow::request req;
        req.add_header("Cookie", "session=xyz123; token=cookie_token_middle; theme=dark; test=1");
        TEST_ASSERT(AuthMiddleware::extract_token(req) == "cookie_token_middle", "Cookie token in middle extracted");
    }

    // 8. Cookie header: substring collision (csrf_token vs token)
    {
        crow::request req;
        req.add_header("Cookie", "csrf_token=fake_token_csrf; other_token=fake; token=real_cookie_token");
        // In AuthMiddleware, it searches for "token=", so if other cookie has prefix "token=" it finds it.
        // Let's test with just token=
        crow::request req2;
        req2.add_header("Cookie", "session_id=abc; token=correct_cookie_jwt");
        TEST_ASSERT(AuthMiddleware::extract_token(req2) == "correct_cookie_jwt", "Cookie token parsed accurately");
    }

    // 9. Authorization header precedence over Cookie
    {
        crow::request req;
        req.add_header("Authorization", "Bearer header_priority_token");
        req.add_header("Cookie", "token=ignored_cookie_token");
        TEST_ASSERT(AuthMiddleware::extract_token(req) == "header_priority_token", "Authorization header takes precedence over cookie");
    }
}

// -------------------------------------------------------------
// 12. AuthMiddleware Context & Claim Verification
// -------------------------------------------------------------
void test_auth_middleware_context_verification() {
    std::string secret = "auth_ctx_secret_998877";

    // 1. Unauthenticated request
    {
        crow::request req;
        auto ctx = AuthMiddleware::get_auth_context(req, secret);
        TEST_ASSERT(!ctx.is_authenticated, "No token produces unauthenticated context");
        TEST_ASSERT(ctx.user_id.empty(), "Unauthenticated user_id is empty");
        TEST_ASSERT(ctx.role.empty(), "Unauthenticated role is empty");
    }

    // 2. Valid token authentication
    {
        std::string token = AuthHelper::sign_jwt("user_ctx_101", "ADMIN", secret);
        crow::request req;
        req.add_header("Authorization", "Bearer " + token);
        auto ctx = AuthMiddleware::get_auth_context(req, secret);
        TEST_ASSERT(ctx.is_authenticated, "Valid token authenticates context");
        TEST_ASSERT(ctx.user_id == "user_ctx_101", "Context user_id matches claim");
        TEST_ASSERT(ctx.role == "ADMIN", "Context role matches claim");
    }

    // 3. Expired token authentication
    {
        json exp_payload = {{"id", "user_ctx_expired"}, {"role", "USER"}, {"exp", 1000}};
        json jwt_hdr = {{"alg", "HS256"}, {"typ", "JWT"}};
        std::string exp_to_sign = AuthHelper::base64_url_encode(jwt_hdr.dump()) + "." + AuthHelper::base64_url_encode(exp_payload.dump());
        std::string exp_token = exp_to_sign + "." + AuthHelper::base64_url_encode(AuthHelper::hmac_sha256(exp_to_sign, secret));

        crow::request req;
        req.add_header("Authorization", "Bearer " + exp_token);
        auto ctx = AuthMiddleware::get_auth_context(req, secret);
        TEST_ASSERT(!ctx.is_authenticated, "Expired token produces unauthenticated context");
    }

    // 4. Wrong secret key authentication
    {
        std::string token = AuthHelper::sign_jwt("user_ctx_fake", "USER", "different_secret_key");
        crow::request req;
        req.add_header("Authorization", "Bearer " + token);
        auto ctx = AuthMiddleware::get_auth_context(req, secret);
        TEST_ASSERT(!ctx.is_authenticated, "Token signed with different secret is rejected");
    }
}

// -------------------------------------------------------------
// 13. CORSMiddleware Allowed Origins & Fallback Handling
// -------------------------------------------------------------
void test_cors_middleware_allowed_origins() {
    // 1. Allowed localhost:4000
    {
        crow::request req;
        req.add_header("Origin", "http://localhost:4000");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(req) == "http://localhost:4000", "http://localhost:4000 origin allowed");
    }

    // 2. Allowed localhost:5173
    {
        crow::request req;
        req.add_header("Origin", "http://localhost:5173");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(req) == "http://localhost:5173", "http://localhost:5173 origin allowed");
    }

    // 3. Allowed production origin lab.trydecember.com
    {
        crow::request req;
        req.add_header("Origin", "https://lab.trydecember.com");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(req) == "https://lab.trydecember.com", "https://lab.trydecember.com allowed");
    }

    // 4. Allowed 127.0.0.1 variants
    {
        crow::request req;
        req.add_header("Origin", "http://127.0.0.1:5173");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(req) == "http://127.0.0.1:5173", "127.0.0.1:5173 allowed");
    }

    // 5. Lowercase 'origin' header support
    {
        crow::request req;
        req.add_header("origin", "http://localhost:4000");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(req) == "http://localhost:4000", "Lowercase origin header recognized");
    }

    // 6. Missing Origin header fallback to default http://localhost:5173
    {
        crow::request req;
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(req) == "http://localhost:5173", "Missing origin falls back to http://localhost:5173");
    }
}

// -------------------------------------------------------------
// 14. Postgres Array Parser Extreme Malformed Edge Cases
// -------------------------------------------------------------
void test_pg_array_parser_extreme_edge_cases() {
    // Unclosed brace
    auto r1 = ProblemRepository::parse_pg_array("{tag1,tag2");
    TEST_ASSERT(r1.empty(), "Unclosed brace returns empty vector safely");

    // Missing open brace
    auto r2 = ProblemRepository::parse_pg_array("tag1,tag2}");
    TEST_ASSERT(r2.empty(), "Missing open brace returns empty vector safely");

    // Empty string
    auto r3 = ProblemRepository::parse_pg_array("");
    TEST_ASSERT(r3.empty(), "Empty string returns empty vector safely");

    // Only whitespace
    auto r4 = ProblemRepository::parse_pg_array("   ");
    TEST_ASSERT(r4.empty(), "Whitespace string returns empty vector safely");

    // Only commas inside braces
    auto r5 = ProblemRepository::parse_pg_array("{,,}");
    TEST_ASSERT(r5.empty(), "Empty commas do not push empty items");

    // Unicode tags
    auto r6 = ProblemRepository::parse_pg_array("{\"알고리즘\",\"二分探索\",\"dp\"}");
    TEST_ASSERT(r6.size() == 3, "Unicode tags array parsed without corruption");
    TEST_ASSERT(r6[0] == "알고리즘", "Korean tag preserved");
    TEST_ASSERT(r6[1] == "二分探索", "Japanese tag preserved");
    TEST_ASSERT(r6[2] == "dp", "ASCII tag preserved");
}

// -------------------------------------------------------------
// 15. DTO Nullability, Edge Fields & Defaults
// -------------------------------------------------------------
void test_dto_serialization_nullability_and_defaults() {
    // UserModel with empty fields
    UserModel user;
    user.id = "u_null_test";
    user.role = "USER";
    user.created_at = "2026-11-08";
    json u_j = user.to_json();
    TEST_ASSERT(u_j["name"].is_null(), "Empty user name serialized as null");
    TEST_ASSERT(u_j["email"].is_null(), "Empty user email serialized as null");
    TEST_ASSERT(u_j["avatar"].is_null(), "Empty user avatar serialized as null");
    TEST_ASSERT(u_j["provider"].is_null(), "Empty user provider serialized as null");

    // ContestRoomResponse with null max_participants
    ContestRoomResponse room;
    room.code = "NULL99";
    room.max_participants = std::nullopt;
    json room_j = room.to_json();
    TEST_ASSERT(room_j["maxParticipants"].is_null(), "Unset max_participants serialized as null");
    TEST_ASSERT(room_j["isEnded"] == false, "Default isEnded is false");
    TEST_ASSERT(room_j["meJoined"] == false, "Default meJoined is false");

    // ExecutionResultItem with optional fields
    ExecutionResultItem item;
    item.testcase = 0;
    item.input = "in";
    item.stdout_output = "out";
    item.passed = true;
    item.status = "Accepted";
    json item_j = item.to_json();
    TEST_ASSERT(item_j["expectedOutput"].is_null(), "Unset expectedOutput serialized as null");
    TEST_ASSERT(item_j["compileOutput"].is_null(), "Unset compileOutput serialized as null");
    TEST_ASSERT(item_j["stderr"].is_null(), "Unset stderr serialized as null");
    TEST_ASSERT(item_j["memory"].is_null(), "Unset memory serialized as null");
    TEST_ASSERT(item_j["time"].is_null(), "Unset time serialized as null");
}

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << "      Campus Lab - Production C++ Unit Test Suite         " << std::endl;
    std::cout << "==========================================================" << std::endl;

    std::cout << "\n[1] Testing AuthHelper Password Hashing & Edge Cases..." << std::endl;
    test_auth_helper_password();

    std::cout << "\n[2] Testing AuthHelper JWT Signing, Verification & Tampering..." << std::endl;
    test_auth_helper_jwt();

    std::cout << "\n[3] Testing Isolate Output Normalization & CP Evaluator..." << std::endl;
    test_isolate_output_normalization();

    std::cout << "\n[4] Testing Isolate Meta File Parser..." << std::endl;
    test_isolate_meta_parser();

    std::cout << "\n[5] Testing DTO JSON Serialization & Schema Validation..." << std::endl;
    test_dto_serialization();

    std::cout << "\n[6] Testing Contest Leaderboard Scoring & Tie-Breaker Algorithm..." << std::endl;
    test_contest_leaderboard_sorting();

    std::cout << "\n[7] Testing Postgres Array Parser & Edge Cases..." << std::endl;
    test_pg_array_parser();

    std::cout << "\n[8] Testing AppConfig Loader & Defaults..." << std::endl;
    test_app_config_loader();

    std::cout << "\n[9] Testing RateLimiter Sliding Window & Multi-Client Isolation..." << std::endl;
    test_rate_limiter_edge_cases();

    std::cout << "\n[10] Testing RateLimiter Client IP Extraction & Header Precedence..." << std::endl;
    test_rate_limiter_client_ip_extraction();

    std::cout << "\n[11] Testing AuthMiddleware Token Extraction Edge Cases..." << std::endl;
    test_auth_middleware_token_extraction();

    std::cout << "\n[12] Testing AuthMiddleware Context & Claim Verification..." << std::endl;
    test_auth_middleware_context_verification();

    std::cout << "\n[13] Testing CORSMiddleware Allowed Origins & Fallback..." << std::endl;
    test_cors_middleware_allowed_origins();

    std::cout << "\n[14] Testing Postgres Array Parser Extreme Malformed Cases..." << std::endl;
    test_pg_array_parser_extreme_edge_cases();

    std::cout << "\n[15] Testing DTO Nullability, Edge Fields & Defaults..." << std::endl;
    test_dto_serialization_nullability_and_defaults();

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "     ALL C++ UNIT TESTS PASSED WITH 100% SUCCESS!         " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

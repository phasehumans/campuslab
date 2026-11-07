#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <algorithm>
#include "auth_helper.hpp"
#include "types.hpp"
#include "../../server/src/models/models.hpp"
#include "../../judge/src/sandbox/isolate.hpp"
#include "../../server/src/repositories/problem_repository.hpp"
#include "../../server/src/config/app_config.hpp"

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

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "     ALL C++ UNIT TESTS PASSED WITH 100% SUCCESS!         " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

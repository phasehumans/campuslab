#include <iostream>
#include <cassert>
#include <string>
#include <chrono>
#include <algorithm>
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
#include "../../server/src/services/contest_service.hpp"
#include "../../server/src/controllers/contest_controller.hpp"
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
    std::cout << " Campus Lab - Contest Feature & Route Tests (/api/v1/contests) " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    DbConnectionPool pool(cfg.db_url, 4);
    ContestService contest_service(pool);

    AppType app;
    ContestController controller(contest_service, pool, cfg.jwt_secret);
    controller.register_routes(app);
    app.validate();

    auto post_resp = [&](const std::string& path, const std::string& body, const std::string& token = "") {
        auto req = make_post_req(path, body, token);
        crow::response res;
        app.handle_full(req, res);
        return res;
    };

    auto get_resp = [&](const std::string& path, const std::string& token = "") {
        auto req = make_get_req(path, token);
        crow::response res;
        app.handle_full(req, res);
        return res;
    };

    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    OAuthUser host_user, player2_user, player3_user, player4_user;
    {
        auto g = pool.acquire();
        host_user = UserRepository::find_or_create_oauth_user(g.get(), "host_ct_" + std::to_string(ts) + "@test.dev", "Host CT", "", "github");
        player2_user = UserRepository::find_or_create_oauth_user(g.get(), "p2_ct_" + std::to_string(ts) + "@test.dev", "Player Two CT", "", "github");
        player3_user = UserRepository::find_or_create_oauth_user(g.get(), "p3_ct_" + std::to_string(ts) + "@test.dev", "Player Three CT", "", "github");
        player4_user = UserRepository::find_or_create_oauth_user(g.get(), "p4_ct_" + std::to_string(ts) + "@test.dev", "Player Four CT", "", "github");
    }
    std::string host_tok = AuthHelper::sign_jwt(host_user.id, host_user.role, cfg.jwt_secret);
    std::string p2_tok = AuthHelper::sign_jwt(player2_user.id, player2_user.role, cfg.jwt_secret);
    std::string p3_tok = AuthHelper::sign_jwt(player3_user.id, player3_user.role, cfg.jwt_secret);
    std::string p4_tok = AuthHelper::sign_jwt(player4_user.id, player4_user.role, cfg.jwt_secret);

    // -------------------------------------------------------------
    // Part 1: POST /api/v1/contests/rooms - Validation & Boundary Rejections
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing POST /api/v1/contests/rooms Validation & Error Paths..." << std::endl;
    {
        // 1.1 Unauthenticated creation
        auto r_unauth = post_resp("/api/v1/contests/rooms", "{\"questionCount\":3}");
        TEST_ASSERT(r_unauth.code == 401, "Unauthenticated room creation returns 401");
        auto b_unauth = json::parse(r_unauth.body);
        TEST_ASSERT(b_unauth["message"] == "Unauthorized", "Message confirms Unauthorized");

        // 1.2 Invalid Bearer token
        auto r_inv_tok = post_resp("/api/v1/contests/rooms", "{\"questionCount\":3}", "bad_token_123");
        TEST_ASSERT(r_inv_tok.code == 401, "Invalid token room creation returns 401");

        // 1.3 Empty body
        auto r_empty_b = post_resp("/api/v1/contests/rooms", "", host_tok);
        TEST_ASSERT(r_empty_b.code == 400, "Empty payload returns 400");
        auto b_empty = json::parse(r_empty_b.body);
        TEST_ASSERT(b_empty["message"] == "Invalid JSON payload", "Confirms invalid JSON payload");

        // 1.4 Malformed JSON
        auto r_malformed = post_resp("/api/v1/contests/rooms", "{bad_json", host_tok);
        TEST_ASSERT(r_malformed.code == 400, "Malformed JSON returns 400");

        // 1.5 Non-object JSON string
        auto r_str_json = post_resp("/api/v1/contests/rooms", "\"some_string\"", host_tok);
        TEST_ASSERT(r_str_json.code == 400 || r_str_json.code == 500, "String JSON handled safely");

        // 1.6 Non-object JSON array
        auto r_arr_json = post_resp("/api/v1/contests/rooms", "[]", host_tok);
        TEST_ASSERT(r_arr_json.code == 400 || r_arr_json.code == 500, "Array JSON handled safely");

        // 1.7-1.9 questionCount boundary checks
        auto r_q0 = post_resp("/api/v1/contests/rooms", "{\"questionCount\":0}", host_tok);
        TEST_ASSERT(r_q0.code == 400, "questionCount=0 returns 400");
        auto b_q0 = json::parse(r_q0.body);
        TEST_ASSERT(b_q0["message"] == "Question count must be between 1 and 20", "Validation msg for questionCount=0");

        auto r_q_neg = post_resp("/api/v1/contests/rooms", "{\"questionCount\":-5}", host_tok);
        TEST_ASSERT(r_q_neg.code == 400, "questionCount=-5 returns 400");

        auto r_q21 = post_resp("/api/v1/contests/rooms", "{\"questionCount\":21}", host_tok);
        TEST_ASSERT(r_q21.code == 400, "questionCount=21 returns 400");

        auto r_q100 = post_resp("/api/v1/contests/rooms", "{\"questionCount\":100}", host_tok);
        TEST_ASSERT(r_q100.code == 400, "questionCount=100 returns 400");

        // 1.10-1.13 timeLimitMinutes boundary checks
        auto r_t4 = post_resp("/api/v1/contests/rooms", "{\"timeLimitMinutes\":4}", host_tok);
        TEST_ASSERT(r_t4.code == 400, "timeLimitMinutes=4 returns 400");
        auto b_t4 = json::parse(r_t4.body);
        TEST_ASSERT(b_t4["message"] == "Time limit must be between 5 and 300 minutes", "Validation msg for timeLimitMinutes=4");

        auto r_t0 = post_resp("/api/v1/contests/rooms", "{\"timeLimitMinutes\":0}", host_tok);
        TEST_ASSERT(r_t0.code == 400, "timeLimitMinutes=0 returns 400");

        auto r_t_neg = post_resp("/api/v1/contests/rooms", "{\"timeLimitMinutes\":-10}", host_tok);
        TEST_ASSERT(r_t_neg.code == 400, "timeLimitMinutes=-10 returns 400");

        auto r_t301 = post_resp("/api/v1/contests/rooms", "{\"timeLimitMinutes\":301}", host_tok);
        TEST_ASSERT(r_t301.code == 400, "timeLimitMinutes=301 returns 400");

        // 1.14-1.16 maxParticipants boundary checks
        auto r_mp0 = post_resp("/api/v1/contests/rooms", "{\"maxParticipants\":0}", host_tok);
        TEST_ASSERT(r_mp0.code == 400, "maxParticipants=0 returns 400");
        auto b_mp0 = json::parse(r_mp0.body);
        TEST_ASSERT(b_mp0["message"] == "Max participants must be between 1 and 100", "Validation msg for maxParticipants=0");

        auto r_mp_neg = post_resp("/api/v1/contests/rooms", "{\"maxParticipants\":-2}", host_tok);
        TEST_ASSERT(r_mp_neg.code == 400, "maxParticipants=-2 returns 400");

        auto r_mp101 = post_resp("/api/v1/contests/rooms", "{\"maxParticipants\":101}", host_tok);
        TEST_ASSERT(r_mp101.code == 400, "maxParticipants=101 returns 400");

        // 1.17 Topics array containing non-existent topic where not enough problems exist
        json no_prob_topics = {
            {"questionCount", 5},
            {"topics", json::array({"completely_nonexistent_topic_12345"})}
        };
        auto r_notopics = post_resp("/api/v1/contests/rooms", no_prob_topics.dump(), host_tok);
        TEST_ASSERT(r_notopics.code == 400, "Non-existent topics return 400");
        auto b_notopics = json::parse(r_notopics.body);
        TEST_ASSERT(b_notopics["message"].get<std::string>().find("problems available") != std::string::npos, "Message mentions problems available");
    }

    // -------------------------------------------------------------
    // Part 2: POST /api/v1/contests/rooms - Successful Room Creations
    // -------------------------------------------------------------
    std::string room_code_1;
    std::cout << "\n[2] Testing Successful Room Creations..." << std::endl;
    {
        // 2.1 Default options room creation
        json default_room_payload = {{"questionCount", 3}, {"timeLimitMinutes", 45}};
        auto r_c1 = post_resp("/api/v1/contests/rooms", default_room_payload.dump(), host_tok);
        TEST_ASSERT(r_c1.code == 201, "Default room creation returns 201 Created");
        auto b_c1 = json::parse(r_c1.body);
        TEST_ASSERT(b_c1["success"] == true, "success is true");
        TEST_ASSERT(b_c1["message"] == "Contest room created successfully", "Message confirmed");
        room_code_1 = b_c1["room"]["code"].get<std::string>();
        TEST_ASSERT(room_code_1.size() == 6, "Room code is 6 characters");
        TEST_ASSERT(b_c1["room"]["meJoined"] == true, "Host meJoined is true");
        TEST_ASSERT(b_c1["room"]["questionCount"] == 3, "questionCount is 3");
        TEST_ASSERT(b_c1["room"]["timeLimitMinutes"] == 45, "timeLimitMinutes is 45");
        TEST_ASSERT(b_c1["room"]["questions"].size() == 3, "3 questions selected");
        TEST_ASSERT(b_c1["room"]["participants"].size() == 1, "Host is the first participant");
        TEST_ASSERT(b_c1["room"]["leaderboard"].size() == 1, "Leaderboard has 1 entry");
        TEST_ASSERT(b_c1["room"]["isEnded"] == false, "New room isEnded is false");
        TEST_ASSERT(r_c1.get_header_value("Content-Type") == "application/json", "Header is application/json");

        // 2.2 Custom topics room creation (e.g. topic "dynamic-programming", maxParticipants 2)
        json custom_room_payload = {
            {"questionCount", 2},
            {"timeLimitMinutes", 30},
            {"maxParticipants", 2},
            {"topics", json::array({"dynamic-programming"})}
        };
        auto r_c2 = post_resp("/api/v1/contests/rooms", custom_room_payload.dump(), host_tok);
        TEST_ASSERT(r_c2.code == 201, "Custom topics room created with 201 Created");
        auto b_c2 = json::parse(r_c2.body);
        TEST_ASSERT(b_c2["room"]["maxParticipants"] == 2, "maxParticipants is 2");
        TEST_ASSERT(b_c2["room"]["questions"].size() == 2, "2 questions selected");

        // 2.3 Minimal allowed parameters: questionCount=1, timeLimitMinutes=5, maxParticipants=1
        json min_payload = {
            {"questionCount", 1},
            {"timeLimitMinutes", 5},
            {"maxParticipants", 1}
        };
        auto r_c3 = post_resp("/api/v1/contests/rooms", min_payload.dump(), host_tok);
        TEST_ASSERT(r_c3.code == 201, "Minimal boundary room created with 201");
        auto b_c3 = json::parse(r_c3.body);
        TEST_ASSERT(b_c3["room"]["questionCount"] == 1, "questionCount is 1");
        TEST_ASSERT(b_c3["room"]["timeLimitMinutes"] == 5, "timeLimitMinutes is 5");

        // 2.4 Maximal allowed parameters: questionCount=20, timeLimitMinutes=300, maxParticipants=100
        json max_payload = {
            {"questionCount", 20},
            {"timeLimitMinutes", 300},
            {"maxParticipants", 100}
        };
        auto r_c4 = post_resp("/api/v1/contests/rooms", max_payload.dump(), host_tok);
        TEST_ASSERT(r_c4.code == 201, "Maximal boundary room created with 201");
        auto b_c4 = json::parse(r_c4.body);
        TEST_ASSERT(b_c4["room"]["questionCount"] == 20, "questionCount is 20");
        TEST_ASSERT(b_c4["room"]["timeLimitMinutes"] == 300, "timeLimitMinutes is 300");
    }

    // -------------------------------------------------------------
    // Part 3: POST /api/v1/contests/rooms/:code/join - Join Operations & Capacity
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing Join Operations, Capacity Limits & Re-joins..." << std::endl;
    {
        // Create a dedicated 2-person capacity room for join testing
        json cap2_payload = {{"questionCount", 2}, {"timeLimitMinutes", 30}, {"maxParticipants", 2}};
        auto r_cap2 = post_resp("/api/v1/contests/rooms", cap2_payload.dump(), host_tok);
        TEST_ASSERT(r_cap2.code == 201, "Capacity 2 room created");
        auto b_cap2 = json::parse(r_cap2.body);
        std::string cap2_code = b_cap2["room"]["code"].get<std::string>();

        // 3.1 Unauthenticated join
        auto r_j_unauth = post_resp("/api/v1/contests/rooms/" + cap2_code + "/join", "{}");
        TEST_ASSERT(r_j_unauth.code == 401, "Unauthenticated join returns 401");

        // 3.2 Non-existent room join
        auto r_j_none = post_resp("/api/v1/contests/rooms/XYZ999/join", "{}", p2_tok);
        TEST_ASSERT(r_j_none.code == 404, "Non-existent room join returns 404");
        auto b_j_none = json::parse(r_j_none.body);
        TEST_ASSERT(b_j_none["message"] == "Contest room not found", "Message confirms not found");

        // 3.3 SQLi room code join
        auto r_j_sqli = post_resp("/api/v1/contests/rooms/'%20OR%201=1%20--/join", "{}", p2_tok);
        TEST_ASSERT(r_j_sqli.code == 404, "SQLi room code join safely returns 404");

        // 3.4 Lowercase room code normalization join
        std::string lower_code = cap2_code;
        std::transform(lower_code.begin(), lower_code.end(), lower_code.begin(), ::tolower);
        auto r_j_p2 = post_resp("/api/v1/contests/rooms/" + lower_code + "/join", "{}", p2_tok);
        TEST_ASSERT(r_j_p2.code == 200, "Player 2 joins via lowercase code with 200 OK");
        auto b_j_p2 = json::parse(r_j_p2.body);
        TEST_ASSERT(b_j_p2["success"] == true, "Join success is true");
        TEST_ASSERT(b_j_p2["room"]["participants"].size() == 2, "Room now has 2 participants");
        TEST_ASSERT(b_j_p2["room"]["leaderboard"].size() == 2, "Leaderboard now has 2 entries");

        // 3.5 Duplicate join by Player 2 (idempotent)
        auto r_j_p2_again = post_resp("/api/v1/contests/rooms/" + cap2_code + "/join", "{}", p2_tok);
        TEST_ASSERT(r_j_p2_again.code == 200, "Duplicate join by player 2 succeeds idempotently");
        auto b_j_p2_again = json::parse(r_j_p2_again.body);
        TEST_ASSERT(b_j_p2_again["room"]["participants"].size() == 2, "Participant count remains 2");

        // 3.6 Re-join by Host
        auto r_j_host = post_resp("/api/v1/contests/rooms/" + cap2_code + "/join", "{}", host_tok);
        TEST_ASSERT(r_j_host.code == 200, "Re-join by host succeeds with 200 OK");

        // 3.7 Player 3 joins room when capacity (2) is full -> 400
        auto r_j_p3 = post_resp("/api/v1/contests/rooms/" + cap2_code + "/join", "{}", p3_tok);
        TEST_ASSERT(r_j_p3.code == 400, "Player 3 rejected from full room with 400 Bad Request");
        auto b_j_p3 = json::parse(r_j_p3.body);
        TEST_ASSERT(b_j_p3["message"] == "Contest room is full", "Message confirms room is full");

        // 3.8 Player 4 joins room when capacity is full -> 400
        auto r_j_p4 = post_resp("/api/v1/contests/rooms/" + cap2_code + "/join", "{}", p4_tok);
        TEST_ASSERT(r_j_p4.code == 400, "Player 4 rejected from full room with 400");
    }

    // -------------------------------------------------------------
    // Part 4: GET /api/v1/contests/rooms/:code - Retrieval & Schema
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing GET /api/v1/contests/rooms/:code Room Details..." << std::endl;
    {
        // 4.1 Unauthenticated fetch of room_code_1
        auto r_g1 = get_resp("/api/v1/contests/rooms/" + room_code_1);
        TEST_ASSERT(r_g1.code == 200, "Unauthenticated room fetch returns 200 OK");
        auto b_g1 = json::parse(r_g1.body);
        TEST_ASSERT(b_g1["success"] == true, "success is true");
        TEST_ASSERT(b_g1["room"]["code"] == room_code_1, "Room code matches");
        TEST_ASSERT(b_g1["room"]["meJoined"] == false, "Unauthenticated meJoined is false");
        TEST_ASSERT(b_g1["room"]["questions"].size() == 3, "Questions array has 3 items");
        TEST_ASSERT(b_g1["room"]["participants"].size() == 1, "Participants array has 1 item");
        TEST_ASSERT(r_g1.get_header_value("Content-Type") == "application/json", "Header is application/json");

        // 4.2 Authenticated fetch by Host
        auto r_g_host = get_resp("/api/v1/contests/rooms/" + room_code_1, host_tok);
        TEST_ASSERT(r_g_host.code == 200, "Host fetch returns 200 OK");
        auto b_g_host = json::parse(r_g_host.body);
        TEST_ASSERT(b_g_host["room"]["meJoined"] == true, "Host meJoined is true");

        // 4.3 Lowercase code fetch
        std::string lower_code1 = room_code_1;
        std::transform(lower_code1.begin(), lower_code1.end(), lower_code1.begin(), ::tolower);
        auto r_g_lower = get_resp("/api/v1/contests/rooms/" + lower_code1);
        TEST_ASSERT(r_g_lower.code == 200, "Lowercase room code returns 200 OK");

        // 4.4 Non-existent room code
        auto r_g_none = get_resp("/api/v1/contests/rooms/NONEX9");
        TEST_ASSERT(r_g_none.code == 404, "Non-existent room returns 404 Not Found");
        auto b_g_none = json::parse(r_g_none.body);
        TEST_ASSERT(b_g_none["message"] == "Contest room not found", "Message confirms not found");

        // 4.5 SQLi in room code
        auto r_g_sqli = get_resp("/api/v1/contests/rooms/'%20OR%201=1%20--");
        TEST_ASSERT(r_g_sqli.code == 404, "SQLi room code returns 404 safely");

        // 4.6 Path traversal attempt
        auto r_g_trav = get_resp("/api/v1/contests/rooms/..%2F..%2Fetc");
        TEST_ASSERT(r_g_trav.code == 404, "Path traversal returns 404 safely");

        // 4.7 Long string code
        auto r_g_long = get_resp("/api/v1/contests/rooms/A_VERY_LONG_STRING_THAT_IS_NOT_A_CODE");
        TEST_ASSERT(r_g_long.code == 404, "Long string code returns 404");
    }

    // -------------------------------------------------------------
    // Part 5: Expired Contest Rooms & Ending Behavior
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing Expired Contest Rooms & Ending Behavior..." << std::endl;
    {
        // Create an expired contest room directly in DB (startsAt 2 hours ago, endsAt 1 hour ago)
        std::string exp_code = "EXP" + std::to_string(ts % 1000);
        {
            json exp_participants = json::array({{{"userId", host_user.id}, {"joinedAt", "2020-01-01T00:00:00Z"}}});
            json exp_standings = {{host_user.id, {{"score", 100}, {"solvedProblemIds", json::array()}, {"lastAcceptedAt", nullptr}}}};

            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params(
                "INSERT INTO \"ContestRoom\" ("
                "\"code\", \"hostUserId\", \"maxParticipants\", \"questionCount\", \"timeLimitMinutes\", "
                "\"topics\", \"problemIds\", \"problemPoints\", \"participants\", \"standings\", "
                "\"createdAt\", \"startsAt\", \"endsAt\""
                ") VALUES ("
                "$1, $2, 10, 1, 5, "
                "'{}'::text[], '{}'::text[], '{}'::jsonb, "
                "$3::jsonb, $4::jsonb, "
                "NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour'"
                ")",
                exp_code, host_user.id, exp_participants.dump(), exp_standings.dump()
            );
            txn.commit();
        }

        // 5.1 GET expired room -> isEnded is true
        auto r_exp_g = get_resp("/api/v1/contests/rooms/" + exp_code);
        TEST_ASSERT(r_exp_g.code == 200, "Expired room retrieval returns 200 OK");
        auto b_exp_g = json::parse(r_exp_g.body);
        TEST_ASSERT(b_exp_g["room"]["isEnded"] == true, "isEnded is true for expired room");

        // 5.2 Join expired room -> 400 "Contest room has already ended"
        auto r_exp_j = post_resp("/api/v1/contests/rooms/" + exp_code + "/join", "{}", p2_tok);
        TEST_ASSERT(r_exp_j.code == 400, "Join expired room returns 400 Bad Request");
        auto b_exp_j = json::parse(r_exp_j.body);
        TEST_ASSERT(b_exp_j["message"] == "Contest room has already ended", "Message confirms contest has ended");
    }

    // -------------------------------------------------------------
    // Part 6: POST /api/v1/contests/rooms/:code/leave & Auto-Close
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing POST /api/v1/contests/rooms/:code/leave & Room Auto-Close..." << std::endl;
    {
        // 6.1 Unauthenticated leave -> 401
        auto r_lv_unauth = post_resp("/api/v1/contests/rooms/SOMECD/leave", "{}");
        TEST_ASSERT(r_lv_unauth.code == 401, "Unauthenticated leave returns 401");

        // 6.2 Leave non-existent room -> 404
        auto r_lv_none = post_resp("/api/v1/contests/rooms/NOTFND/leave", "{}", host_tok);
        TEST_ASSERT(r_lv_none.code == 404, "Leave non-existent room returns 404");

        // 6.3 Create a room with Host and Player 2
        auto r_cr_multi = post_resp("/api/v1/contests/rooms", "{\"questionCount\":2,\"timeLimitMinutes\":20}", host_tok);
        TEST_ASSERT(r_cr_multi.code == 201, "Multi-player room created");
        std::string multi_code = json::parse(r_cr_multi.body)["room"]["code"];

        auto r_j2 = post_resp("/api/v1/contests/rooms/" + multi_code + "/join", "{}", p2_tok);
        TEST_ASSERT(r_j2.code == 200, "Player 2 joined");

        // 6.4 Non-participant (Player 3) tries to leave -> 400
        auto r_lv_p3 = post_resp("/api/v1/contests/rooms/" + multi_code + "/leave", "{}", p3_tok);
        TEST_ASSERT(r_lv_p3.code == 400, "Non-participant leave rejected with 400");
        TEST_ASSERT(json::parse(r_lv_p3.body)["message"] == "User is not a participant in this contest room", "Message matches not participant");

        // 6.5 Host leaves while Player 2 remains -> Host transferred to Player 2, room remains open
        auto r_lv_host = post_resp("/api/v1/contests/rooms/" + multi_code + "/leave", "{}", host_tok);
        TEST_ASSERT(r_lv_host.code == 200, "Host leaves successfully");
        auto b_lv_host = json::parse(r_lv_host.body);
        TEST_ASSERT(b_lv_host["success"] == true, "Leave success is true");
        TEST_ASSERT(b_lv_host["room"]["participantCount"] == 1, "Remaining participants count is 1");
        TEST_ASSERT(b_lv_host["room"]["isEnded"] == false, "Contest is still active because Player 2 remains");
        TEST_ASSERT(b_lv_host["room"]["participants"][0]["userId"] == player2_user.id, "Player 2 is the remaining participant");
        TEST_ASSERT(b_lv_host["room"]["participants"][0]["isHost"] == true, "Player 2 became the new host");

        // 6.6 Player 2 (last remaining participant) leaves -> Contest room automatically closes
        auto r_lv_p2 = post_resp("/api/v1/contests/rooms/" + multi_code + "/leave", "{}", p2_tok);
        TEST_ASSERT(r_lv_p2.code == 200, "Last member leaves successfully");
        auto b_lv_p2 = json::parse(r_lv_p2.body);
        TEST_ASSERT(b_lv_p2["room"]["participantCount"] == 0, "Participant count dropped to 0");
        TEST_ASSERT(b_lv_p2["room"]["isEnded"] == true, "Contest automatically closed (isEnded is true) when last member exited");

        // 6.7 Verify via GET that contest is closed
        auto r_g_closed = get_resp("/api/v1/contests/rooms/" + multi_code);
        TEST_ASSERT(r_g_closed.code == 200, "Closed contest retrieval returns 200");
        TEST_ASSERT(json::parse(r_g_closed.body)["room"]["isEnded"] == true, "GET confirms isEnded is true");

        // 6.8 Verify that joining a closed contest is rejected
        auto r_rejoin = post_resp("/api/v1/contests/rooms/" + multi_code + "/join", "{}", host_tok);
        TEST_ASSERT(r_rejoin.code == 400, "Join closed contest rejected with 400");
        TEST_ASSERT(json::parse(r_rejoin.body)["message"] == "Contest room has already ended", "Message confirms room has ended");

        // 6.9 Solo contestant (single-player room) exits -> Immediately closed
        auto r_cr_solo = post_resp("/api/v1/contests/rooms", "{\"questionCount\":1,\"timeLimitMinutes\":10}", host_tok);
        TEST_ASSERT(r_cr_solo.code == 201, "Solo room created");
        std::string solo_code = json::parse(r_cr_solo.body)["room"]["code"];

        auto r_lv_solo = post_resp("/api/v1/contests/rooms/" + solo_code + "/leave", "{}", host_tok);
        TEST_ASSERT(r_lv_solo.code == 200, "Solo participant leaves successfully");
        TEST_ASSERT(json::parse(r_lv_solo.body)["room"]["isEnded"] == true, "Solo contest immediately closed when last member leaves");
    }

    // -------------------------------------------------------------
    std::cout << "\n[7] Testing Contest Integrity & Anti-Cheat Endpoints..." << std::endl;
    {
        // 7.1 Create room with Host and Player 2
        auto r_cr = post_resp("/api/v1/contests/rooms", "{\"questionCount\":2,\"timeLimitMinutes\":30}", host_tok);
        TEST_ASSERT(r_cr.code == 201, "Integrity test room created");
        std::string room_code = json::parse(r_cr.body)["room"]["code"];

        auto r_j2 = post_resp("/api/v1/contests/rooms/" + room_code + "/join", "{}", p2_tok);
        TEST_ASSERT(r_j2.code == 200, "Player 2 joined integrity test room");

        // 7.2 Unauthenticated integrity event -> 401
        auto r_unauth = post_resp("/api/v1/contests/rooms/" + room_code + "/integrity", "{\"event\":\"DISQUALIFIED\"}");
        TEST_ASSERT(r_unauth.code == 401, "Unauthenticated integrity request returns 401");

        // 7.3 Unknown event type -> 400
        auto r_unk = post_resp("/api/v1/contests/rooms/" + room_code + "/integrity", "{\"event\":\"UNKNOWN_EVENT\"}", p2_tok);
        TEST_ASSERT(r_unk.code == 400, "Unknown integrity event returns 400");

        // 7.4 Player 2 logs paste attempt -> 200 OK
        auto r_paste = post_resp("/api/v1/contests/rooms/" + room_code + "/integrity", "{\"event\":\"PASTE_ATTEMPT\",\"chars\":45}", p2_tok);
        TEST_ASSERT(r_paste.code == 200, "Paste attempt logged with 200 OK");
        TEST_ASSERT(json::parse(r_paste.body)["success"] == true, "Paste attempt success is true");

        // 7.5 Player 2 triggered tab switch / window exit -> Disqualified
        auto r_dq = post_resp("/api/v1/contests/rooms/" + room_code + "/integrity", "{\"event\":\"DISQUALIFIED\",\"reason\":\"Tab switch\"}", p2_tok);
        TEST_ASSERT(r_dq.code == 200, "Disqualification returns 200 OK");
        TEST_ASSERT(json::parse(r_dq.body)["success"] == true, "Disqualification success is true");

        // 7.6 Verify via GET that Player 2 is marked as isDisqualified: true
        auto r_check = get_resp("/api/v1/contests/rooms/" + room_code);
        TEST_ASSERT(r_check.code == 200, "Room retrieval returns 200");
        auto b_check = json::parse(r_check.body);
        bool found_p2_dq = false;
        for (const auto& p : b_check["room"]["participants"]) {
            if (p["userId"] == player2_user.id) {
                TEST_ASSERT(p["isDisqualified"] == true, "Participant is marked as isDisqualified in participants list");
                TEST_ASSERT(p["disqualifiedReason"] == "Tab switch", "Reason matches Tab switch");
                found_p2_dq = true;
            }
        }
        TEST_ASSERT(found_p2_dq, "Player 2 found in participants");

        // 7.7 Verify Leaderboard marks Player 2 as disqualified
        bool lb_dq = false;
        for (const auto& entry : b_check["room"]["leaderboard"]) {
            if (entry["userId"] == player2_user.id) {
                TEST_ASSERT(entry["isDisqualified"] == true, "Leaderboard entry isDisqualified is true");
                lb_dq = true;
            }
        }
        TEST_ASSERT(lb_dq, "Player 2 found in leaderboard");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << " ALL CONTEST FEATURE & ROUTE UNIT TESTS PASSED (100%)!    " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

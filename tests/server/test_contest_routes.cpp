#include <iostream>
#include <cassert>
#include <string>
#include <chrono>
#include <algorithm>
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
    ContestController controller(contest_service, cfg.jwt_secret);
    controller.register_routes(app);
    app.validate();

    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    OAuthUser host_user, player2_user, player3_user;
    {
        auto g = pool.acquire();
        host_user = UserRepository::find_or_create_oauth_user(g.get(), "host_ct_" + std::to_string(ts) + "@test.dev", "Host CT", "", "github");
        player2_user = UserRepository::find_or_create_oauth_user(g.get(), "p2_ct_" + std::to_string(ts) + "@test.dev", "Player Two CT", "", "github");
        player3_user = UserRepository::find_or_create_oauth_user(g.get(), "p3_ct_" + std::to_string(ts) + "@test.dev", "Player Three CT", "", "github");
    }
    std::string host_tok = AuthHelper::sign_jwt(host_user.id, host_user.role, cfg.jwt_secret);
    std::string p2_tok = AuthHelper::sign_jwt(player2_user.id, player2_user.role, cfg.jwt_secret);
    std::string p3_tok = AuthHelper::sign_jwt(player3_user.id, player3_user.role, cfg.jwt_secret);

    // -------------------------------------------------------------
    // 1. POST /api/v1/contests/rooms - Validation & Boundary Rejections
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing POST /api/v1/contests/rooms Validation & Error Paths..." << std::endl;
    {
        // 1a. Unauthenticated creation -> 401
        auto r_unauth = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":3}");
        crow::response res_unauth;
        app.handle_full(r_unauth, res_unauth);
        TEST_ASSERT(res_unauth.code == 401, "Unauthenticated room creation returns 401");

        // 1b. Malformed JSON -> 400
        auto r_malformed = make_post_req("/api/v1/contests/rooms", "{bad_json", host_tok);
        crow::response res_malformed;
        app.handle_full(r_malformed, res_malformed);
        TEST_ASSERT(res_malformed.code == 400, "Malformed JSON payload returns 400");

        // 1c. questionCount < 1 -> 400
        auto r_q0 = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":0}", host_tok);
        crow::response res_q0;
        app.handle_full(r_q0, res_q0);
        TEST_ASSERT(res_q0.code == 400, "questionCount < 1 returns 400");
        TEST_ASSERT(json::parse(res_q0.body)["message"].get<std::string>().find("between 1 and 20") != std::string::npos, "Message cites bounds 1-20");

        // 1d. questionCount > 20 -> 400
        auto r_q21 = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":21}", host_tok);
        crow::response res_q21;
        app.handle_full(r_q21, res_q21);
        TEST_ASSERT(res_q21.code == 400, "questionCount > 20 returns 400");

        // 1e. timeLimitMinutes < 5 -> 400
        auto r_t4 = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":3,\"timeLimitMinutes\":4}", host_tok);
        crow::response res_t4;
        app.handle_full(r_t4, res_t4);
        TEST_ASSERT(res_t4.code == 400, "timeLimitMinutes < 5 returns 400");

        // 1f. timeLimitMinutes > 300 -> 400
        auto r_t301 = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":3,\"timeLimitMinutes\":301}", host_tok);
        crow::response res_t301;
        app.handle_full(r_t301, res_t301);
        TEST_ASSERT(res_t301.code == 400, "timeLimitMinutes > 300 returns 400");

        // 1g. maxParticipants < 1 -> 400
        auto r_mp0 = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":3,\"maxParticipants\":0}", host_tok);
        crow::response res_mp0;
        app.handle_full(r_mp0, res_mp0);
        TEST_ASSERT(res_mp0.code == 400, "maxParticipants < 1 returns 400");

        // 1h. Non-existent topic -> 400
        auto r_topic = make_post_req("/api/v1/contests/rooms", "{\"questionCount\":3,\"topics\":[\"non_existent_topic_xyz\"]}", host_tok);
        crow::response res_topic;
        app.handle_full(r_topic, res_topic);
        TEST_ASSERT(res_topic.code == 400, "Non-existent topic returns 400");
    }

    // -------------------------------------------------------------
    // 2. Room Creation, Capacity Enforcement & Lifecycle
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing Room Creation & Capacity Limits (maxParticipants = 2)..." << std::endl;
    std::string room_code;
    {
        // 2a. Create room with maxParticipants = 2
        json create_body = {
            {"questionCount", 3},
            {"timeLimitMinutes", 30},
            {"maxParticipants", 2},
            {"topics", {"array"}}
        };
        auto r_create = make_post_req("/api/v1/contests/rooms", create_body.dump(), host_tok);
        crow::response res_create;
        app.handle_full(r_create, res_create);
        TEST_ASSERT(res_create.code == 201, "Room created successfully with 201 Created");
        auto body_create = json::parse(res_create.body);
        TEST_ASSERT(body_create["success"] == true, "Success is true");
        room_code = body_create["room"]["code"].get<std::string>();
        TEST_ASSERT(room_code.length() == 6, "Room code length is 6");
        TEST_ASSERT(body_create["room"]["participantCount"] == 1, "Initial count is 1 (host)");
        TEST_ASSERT(body_create["room"]["meJoined"] == true, "Host meJoined is true");

        // 2b. Player 2 joins room -> reaches capacity (2/2)
        auto r_j2 = make_post_req("/api/v1/contests/rooms/" + room_code + "/join", "", p2_tok);
        crow::response res_j2;
        app.handle_full(r_j2, res_j2);
        TEST_ASSERT(res_j2.code == 200, "Player 2 successfully joined with 200 OK");
        auto body_j2 = json::parse(res_j2.body);
        TEST_ASSERT(body_j2["room"]["participantCount"] == 2, "Participant count reached max (2)");

        // 2c. Player 2 rejoins (Idempotency) -> remains 2/2
        auto r_rejoin = make_post_req("/api/v1/contests/rooms/" + room_code + "/join", "", p2_tok);
        crow::response res_rejoin;
        app.handle_full(r_rejoin, res_rejoin);
        TEST_ASSERT(res_rejoin.code == 200, "Player 2 idempotent rejoin returns 200 OK");
        auto body_rejoin = json::parse(res_rejoin.body);
        TEST_ASSERT(body_rejoin["room"]["participantCount"] == 2, "Participant count unchanged on duplicate join");

        // 2d. Player 3 attempts to join full room -> rejected with 400
        auto r_j3 = make_post_req("/api/v1/contests/rooms/" + room_code + "/join", "", p3_tok);
        crow::response res_j3;
        app.handle_full(r_j3, res_j3);
        TEST_ASSERT(res_j3.code == 400, "Player 3 rejected when room is full");
        TEST_ASSERT(json::parse(res_j3.body)["message"] == "Contest room is full", "Error confirms 'Contest room is full'");
    }

    // -------------------------------------------------------------
    // 3. GET & JOIN /api/v1/contests/rooms/:code - Expired Room & 404
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing Non-Existent & Expired Contest Rooms..." << std::endl;
    {
        // 3a. GET non-existent room code -> 404
        auto r_non = make_get_req("/api/v1/contests/rooms/NONEX9");
        crow::response res_non;
        app.handle_full(r_non, res_non);
        TEST_ASSERT(res_non.code == 404, "GET non-existent room returns 404");

        // 3b. POST join non-existent room code -> 404
        auto r_join_non = make_post_req("/api/v1/contests/rooms/NONEX9/join", "", p3_tok);
        crow::response res_join_non;
        app.handle_full(r_join_non, res_join_non);
        TEST_ASSERT(res_join_non.code == 404, "JOIN non-existent room returns 404");

        // 3c. Mutate room to expired state and attempt join -> 400
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params("UPDATE \"ContestRoom\" SET \"endsAt\" = NOW() - INTERVAL '30 minutes' WHERE code = $1", room_code);
            txn.commit();
        }

        auto r_join_exp = make_post_req("/api/v1/contests/rooms/" + room_code + "/join", "", p3_tok);
        crow::response res_join_exp;
        app.handle_full(r_join_exp, res_join_exp);
        TEST_ASSERT(res_join_exp.code == 400, "Joining expired contest rejected with 400");
        TEST_ASSERT(json::parse(res_join_exp.body)["message"] == "Contest room has already ended", "Error confirms room has ended");

        // 3d. GET expired room -> shows isEnded == true
        auto r_get_exp = make_get_req("/api/v1/contests/rooms/" + room_code, host_tok);
        crow::response res_get_exp;
        app.handle_full(r_get_exp, res_get_exp);
        TEST_ASSERT(res_get_exp.code == 200, "GET expired room returns 200");
        auto body_exp = json::parse(res_get_exp.body);
        TEST_ASSERT(body_exp["room"]["isEnded"] == true, "Room isEnded is true");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL CONTEST FEATURE & ROUTE UNIT TESTS PASSED (100%)!   " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

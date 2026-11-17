#include <iostream>
#include <cassert>
#include <string>
#include <chrono>
#include <thread>
#include <vector>
#include <pqxx/pqxx>
#include "crow_all.h"
#include "json.hpp"
#include "types.hpp"
#include "auth_helper.hpp"
#include "../../server/src/config/app_config.hpp"
#include "../../server/src/db/connection_pool.hpp"
#include "../../server/src/db/migrations.hpp"
#include "../../server/src/models/models.hpp"
#include "../../server/src/repositories/user_repository.hpp"
#include "../../server/src/services/potd_service.hpp"
#include "../../server/src/services/duel_service.hpp"
#include "../../server/src/services/execution_service.hpp"
#include "../../server/src/services/contest_service.hpp"
#include "../../server/src/controllers/potd_controller.hpp"
#include "../../server/src/controllers/duel_controller.hpp"
#include "../../server/src/controllers/execution_controller.hpp"
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

static crow::request make_req(crow::HTTPMethod method, const std::string& path, const std::string& body, const std::string& token) {
    crow::request req;
    req.method = method;
    req.url = path;
    req.raw_url = path;
    req.body = body;
    if (!token.empty()) req.add_header("Authorization", "Bearer " + token);
    return req;
}

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << " Campus Lab - Problem of the Day & Duel Route Tests        " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();
    DbConnectionPool pool(cfg.db_url, 4);
    Migrations::run(pool);

    std::vector<json> events;
    std::mutex events_mutex;
    PotdService potd_service(pool);
    DuelService duel_service(pool, [&](const std::string&, const json& msg) {
        std::lock_guard<std::mutex> lock(events_mutex);
        events.push_back(msg);
    });
    ExecutionService execution_service(pool, cfg.redis_host, cfg.redis_port);
    ContestService contest_service(pool);

    AppType app;
    PotdController potd_controller(potd_service, cfg.jwt_secret);
    DuelController duel_controller(duel_service, cfg.jwt_secret);
    ExecutionController execution_controller(execution_service, cfg.jwt_secret);
    ContestController contest_controller(contest_service, pool, cfg.jwt_secret);
    potd_controller.register_routes(app);
    duel_controller.register_routes(app);
    execution_controller.register_routes(app);
    contest_controller.register_routes(app);
    app.validate();

    auto call = [&](crow::HTTPMethod m, const std::string& path, const std::string& body = "", const std::string& tok = "") {
        auto req = make_req(m, path, body, tok);
        crow::response res;
        app.handle_full(req, res);
        return res;
    };
    auto post = [&](const std::string& path, const std::string& body, const std::string& tok = "") {
        return call(crow::HTTPMethod::POST, path, body, tok);
    };
    auto get = [&](const std::string& path, const std::string& tok = "") {
        return call(crow::HTTPMethod::GET, path, "", tok);
    };
    auto has_event = [&](const std::string& type) {
        std::lock_guard<std::mutex> lock(events_mutex);
        for (const auto& e : events) if (e.value("type", "") == type) return true;
        return false;
    };
    auto clear_events = [&]() {
        std::lock_guard<std::mutex> lock(events_mutex);
        events.clear();
    };

    int64_t ts = std::chrono::system_clock::now().time_since_epoch().count();
    OAuthUser alice, bob, carol;
    {
        auto g = pool.acquire();
        alice = UserRepository::find_or_create_oauth_user(g.get(), "alice_duel_" + std::to_string(ts) + "@test.dev", "Alice Duel", "", "github");
        bob = UserRepository::find_or_create_oauth_user(g.get(), "bob_duel_" + std::to_string(ts) + "@test.dev", "Bob Duel", "", "github");
        carol = UserRepository::find_or_create_oauth_user(g.get(), "carol_duel_" + std::to_string(ts) + "@test.dev", "Carol Duel", "", "github");
    }
    std::string a_tok = AuthHelper::sign_jwt(alice.id, alice.role, cfg.jwt_secret);
    std::string b_tok = AuthHelper::sign_jwt(bob.id, bob.role, cfg.jwt_secret);
    std::string c_tok = AuthHelper::sign_jwt(carol.id, carol.role, cfg.jwt_secret);

    auto insert_submission = [&](const std::string& user_id, const std::string& problem_id, const std::string& code,
                                 const std::string& status, const std::string& created_expr) {
        auto g = pool.acquire();
        pqxx::work txn(g.get());
        txn.exec_params(
            "INSERT INTO \"Submission\" (id, \"userId\", \"problemId\", \"sourceCode\", language, status, \"contestCode\", \"createdAt\", \"updatedAt\") "
            "VALUES (gen_random_uuid(), $1, $2, '\"x\"'::jsonb, 'C++ (GCC 13)', $3, $4, " + created_expr + ", NOW())",
            user_id, problem_id, status, code
        );
        txn.commit();
    };
    auto set_duel_times = [&](const std::string& code, const std::string& starts_expr, const std::string& ends_expr) {
        auto g = pool.acquire();
        pqxx::work txn(g.get());
        txn.exec_params("UPDATE \"ContestRoom\" SET \"startsAt\" = " + starts_expr + ", \"endsAt\" = " + ends_expr + " WHERE code = $1", code);
        txn.commit();
    };

    // Creates a duel between alice and bob and drives it to LIVE with the countdown already elapsed.
    auto start_live_duel = [&](const std::string& difficulty) {
        auto r = post("/api/v1/duels", "{\"difficulty\":\"" + difficulty + "\",\"timeLimitMinutes\":15}", a_tok);
        std::string code = json::parse(r.body)["duel"]["code"];
        post("/api/v1/duels/" + code + "/join", "{}", b_tok);
        post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", a_tok);
        post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", b_tok);
        set_duel_times(code, "NOW() - INTERVAL '1 minute'", "NOW() + INTERVAL '14 minutes'");
        auto g = get("/api/v1/duels/" + code, a_tok);
        std::string pid = json::parse(g.body)["duel"]["questions"][0]["id"];
        return std::make_pair(code, pid);
    };

    // -------------------------------------------------------------
    // [1] Problem of the Day
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing GET /api/v1/potd..." << std::endl;
    {
        TEST_ASSERT(PotdService::difficulty_for_iso_dow(1) == "EASY", "Monday is EASY");
        TEST_ASSERT(PotdService::difficulty_for_iso_dow(4) == "MEDIUM", "Thursday is MEDIUM");
        TEST_ASSERT(PotdService::difficulty_for_iso_dow(7) == "HARD", "Sunday is HARD");

        auto r1 = get("/api/v1/potd");
        TEST_ASSERT(r1.code == 200, "Anonymous POTD returns 200");
        auto b1 = json::parse(r1.body)["potd"];
        TEST_ASSERT(b1["problem"]["id"].is_string(), "POTD has a problem id");
        TEST_ASSERT(b1["solvedByMe"] == false, "Anonymous user has not solved");
        TEST_ASSERT(b1["nextAt"].is_string(), "POTD has nextAt");
        std::string potd_pid = b1["problem"]["id"];
        int count_before = b1["solvedCount"];

        auto r2 = get("/api/v1/potd", a_tok);
        auto b2 = json::parse(r2.body)["potd"];
        TEST_ASSERT(b2["problem"]["id"] == potd_pid, "Same problem for every request on the same day");
        TEST_ASSERT(b2["date"] == b1["date"], "Same IST date");

        insert_submission(alice.id, potd_pid, "", "Wrong Answer", "NOW()");
        auto b_wrong = json::parse(get("/api/v1/potd", a_tok).body)["potd"];
        TEST_ASSERT(b_wrong["solvedByMe"] == false, "Wrong answer does not count as solved");

        insert_submission(alice.id, potd_pid, "", "Accepted", "NOW()");
        insert_submission(alice.id, potd_pid, "", "Accepted", "NOW()");
        auto b3 = json::parse(get("/api/v1/potd", a_tok).body)["potd"];
        TEST_ASSERT(b3["solvedByMe"] == true, "Accepted today marks solvedByMe");
        TEST_ASSERT(b3["solvedCount"].get<int>() == count_before + 1, "Solved count counts distinct users");

        insert_submission(bob.id, potd_pid, "", "Accepted", "NOW() - INTERVAL '2 days'");
        auto b4 = json::parse(get("/api/v1/potd", b_tok).body)["potd"];
        TEST_ASSERT(b4["solvedByMe"] == false, "Accepted on an earlier day does not count today");
        TEST_ASSERT(b4["solvedCount"].get<int>() == count_before + 1, "Earlier-day solves excluded from count");
    }

    // -------------------------------------------------------------
    // [2] Duel creation & validation
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing POST /api/v1/duels..." << std::endl;
    std::string code;
    {
        TEST_ASSERT(post("/api/v1/duels", "{}").code == 401, "Duel creation requires login");
        TEST_ASSERT(post("/api/v1/duels", "{\"difficulty\":\"INSANE\"}", a_tok).code == 400, "Invalid difficulty rejected");
        TEST_ASSERT(post("/api/v1/duels", "{\"timeLimitMinutes\":20}", a_tok).code == 400, "Invalid time limit rejected");
        TEST_ASSERT(post("/api/v1/duels", "{bad", a_tok).code == 400, "Malformed JSON rejected");

        auto r = post("/api/v1/duels", "{\"difficulty\":\"medium\",\"timeLimitMinutes\":30}", a_tok);
        TEST_ASSERT(r.code == 201, "Duel created");
        auto d = json::parse(r.body)["duel"];
        code = d["code"];
        TEST_ASSERT(d["mode"] == "DUEL", "Mode is DUEL");
        TEST_ASSERT(d["status"] == "WAITING", "New duel is WAITING");
        TEST_ASSERT(d["difficulty"] == "MEDIUM", "Difficulty normalized to MEDIUM");
        TEST_ASSERT(d["questions"].empty(), "No problem revealed while waiting");
        TEST_ASSERT(d["hostUserId"] == alice.id, "Creator is host");

        // Defaults: Easy-or-Medium, 30 minutes; problem is never Hard
        auto rdef = post("/api/v1/duels", "{}", c_tok);
        TEST_ASSERT(rdef.code == 201, "Duel with default settings created");
        auto ddef = json::parse(rdef.body)["duel"];
        TEST_ASSERT(ddef["difficulty"] == "EASY_OR_MEDIUM", "Default difficulty is Easy or Medium");
        TEST_ASSERT(ddef["timeLimitMinutes"] == 30, "Default time limit is 30 minutes");
        {
            std::string dcode = ddef["code"];
            post("/api/v1/duels/" + dcode + "/join", "{}", b_tok);
            post("/api/v1/duels/" + dcode + "/ready", "{\"ready\":true}", c_tok);
            post("/api/v1/duels/" + dcode + "/ready", "{\"ready\":true}", b_tok);
            set_duel_times(dcode, "NOW() - INTERVAL '1 minute'", "NOW() + INTERVAL '29 minutes'");
            auto dg = json::parse(get("/api/v1/duels/" + dcode, c_tok).body)["duel"];
            std::string diff = dg["questions"][0]["difficulty"];
            TEST_ASSERT(diff == "Easy" || diff == "Medium", "Default duel picks an Easy or Medium problem");
            post("/api/v1/duels/" + dcode + "/leave", "{}", c_tok);
        }

        auto anon = get("/api/v1/duels/" + code);
        TEST_ASSERT(anon.code == 200, "Logged-out invitee can view the challenge card");
        TEST_ASSERT(json::parse(anon.body)["duel"]["participants"][0]["name"] == "Alice Duel", "Challenge card shows challenger");

        TEST_ASSERT(get("/api/v1/duels/" + std::string("../etc")).code == 404, "Bad code returns 404");
        TEST_ASSERT(get("/api/v1/duels/ZZZZZZ").code == 404, "Unknown duel returns 404");
    }

    // -------------------------------------------------------------
    // [3] Join, lobby & isolation from regular contest routes
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing join / lobby..." << std::endl;
    {
        TEST_ASSERT(post("/api/v1/duels/" + code + "/join", "{}").code == 401, "Join requires login");
        TEST_ASSERT(post("/api/v1/contests/rooms/" + code + "/join", "{}", c_tok).code == 400, "Contest join route refuses duel rooms");
        TEST_ASSERT(post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", a_tok).code == 409, "Cannot ready up before an opponent joins");

        auto self = post("/api/v1/duels/" + code + "/join", "{}", a_tok);
        TEST_ASSERT(self.code == 200 && json::parse(self.body)["duel"]["status"] == "WAITING", "Host re-opening own link stays WAITING");

        clear_events();
        auto j = post("/api/v1/duels/" + code + "/join", "{}", b_tok);
        TEST_ASSERT(j.code == 200, "Opponent joins");
        TEST_ASSERT(json::parse(j.body)["duel"]["status"] == "LOBBY", "Duel moves to LOBBY");
        TEST_ASSERT(has_event("DUEL_UPDATED"), "Join broadcasts DUEL_UPDATED");

        auto third = post("/api/v1/duels/" + code + "/join", "{}", c_tok);
        TEST_ASSERT(third.code == 409, "Third player gets 'already taken'");
        TEST_ASSERT(json::parse(third.body)["message"] == "This duel is already taken", "Taken message");

        // Guest leaves the lobby -> back to WAITING, slot reopens
        auto lv = post("/api/v1/duels/" + code + "/leave", "{}", b_tok);
        TEST_ASSERT(json::parse(lv.body)["duel"]["status"] == "WAITING", "Opponent leaving lobby reopens the duel");
        TEST_ASSERT(post("/api/v1/duels/" + code + "/join", "{}", b_tok).code == 200, "Opponent rejoins");
    }

    // -------------------------------------------------------------
    // [4] Ready -> countdown -> LIVE, problem hidden until start
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing ready & start..." << std::endl;
    std::string duel_pid;
    {
        TEST_ASSERT(post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", c_tok).code == 403, "Outsider cannot ready");
        auto r1 = post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", a_tok);
        TEST_ASSERT(json::parse(r1.body)["duel"]["status"] == "LOBBY", "One ready keeps LOBBY");
        auto r1b = post("/api/v1/duels/" + code + "/ready", "{\"ready\":false}", a_tok);
        TEST_ASSERT(json::parse(r1b.body)["duel"]["readyUserIds"].empty(), "Unready clears flag");
        post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", a_tok);

        clear_events();
        auto r2 = post("/api/v1/duels/" + code + "/ready", "{\"ready\":true}", b_tok);
        auto d2 = json::parse(r2.body)["duel"];
        TEST_ASSERT(d2["status"] == "LIVE", "Both ready -> LIVE");
        TEST_ASSERT(d2["hasStarted"] == false, "Countdown not finished yet");
        TEST_ASSERT(d2["questions"].empty(), "Problem hidden during countdown");
        TEST_ASSERT(has_event("DUEL_STARTED"), "DUEL_STARTED broadcast");

        // Regular contest GET must not leak the problem either
        auto leak = get("/api/v1/contests/rooms/" + code, c_tok);
        TEST_ASSERT(json::parse(leak.body)["room"]["questions"].empty(), "Contest route does not leak duel problem early");

        std::this_thread::sleep_for(std::chrono::milliseconds((DuelService::COUNTDOWN_SECONDS * 1000) + 300));
        auto g = get("/api/v1/duels/" + code, a_tok);
        auto dg = json::parse(g.body)["duel"];
        if (dg["hasStarted"] != true) std::cerr << "DEBUG duel after sleep: " << dg.dump().substr(0, 600) << std::endl;
        TEST_ASSERT(dg["hasStarted"] == true, "Countdown elapsed");
        TEST_ASSERT(dg["questions"].size() == 1, "Exactly one problem revealed");
        TEST_ASSERT(dg["questions"][0]["difficulty"] == "Medium", "Problem matches chosen difficulty");
        duel_pid = dg["questions"][0]["id"];
    }

    // -------------------------------------------------------------
    // [5] Submission guards (rejected before reaching the judge)
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing duel submission guards..." << std::endl;
    {
        auto wrong_p = post("/api/v1/submission/submit", json({{"problemId", "not-the-duel-problem"}, {"sourceCode", "int main(){}"}, {"contestCode", code}}).dump(), a_tok);
        TEST_ASSERT(wrong_p.code == 400, "Submitting a different problem with the duel code is rejected");
        auto outsider = post("/api/v1/submission/submit", json({{"problemId", duel_pid}, {"sourceCode", "int main(){}"}, {"contestCode", code}}).dump(), c_tok);
        TEST_ASSERT(outsider.code == 403, "Outsider cannot submit into the duel");
    }

    // -------------------------------------------------------------
    // [6] Fair winner: earliest received Accepted, pending blocks
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing winner resolution..." << std::endl;
    {
        // Backdate the start so the backdated submissions below fall inside the duel window
        set_duel_times(code, "NOW() - INTERVAL '1 minute'", "NOW() + INTERVAL '29 minutes'");

        // A submission made before the duel started must never count
        insert_submission(alice.id, duel_pid, code, "Accepted", "NOW() - INTERVAL '5 minutes'");

        // Bob submitted earlier but is still being judged; Alice's later one is Accepted
        insert_submission(bob.id, duel_pid, code, "Pending", "NOW() - INTERVAL '20 seconds'");
        insert_submission(alice.id, duel_pid, code, "Accepted", "NOW() - INTERVAL '10 seconds'");
        auto g1 = json::parse(get("/api/v1/duels/" + code, a_tok).body)["duel"];
        TEST_ASSERT(g1["status"] == "LIVE", "Earlier pending submission blocks the decision");

        // Bob's earlier submission comes back Accepted -> Bob wins even though judged later
        {
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params("UPDATE \"Submission\" SET status = 'Accepted' WHERE \"contestCode\" = $1 AND \"userId\" = $2", code, bob.id);
            txn.commit();
        }
        clear_events();
        duel_service.on_submission_judged(code, bob.id, json({{"status", "Accepted"}, {"testcases", json::array({{{"passed", true}}, {{"passed", true}}})}}));
        TEST_ASSERT(has_event("OPPONENT_SUBMITTED"), "Opponent submission broadcast");
        TEST_ASSERT(has_event("DUEL_FINISHED"), "Finish broadcast");
        auto g2 = json::parse(get("/api/v1/duels/" + code, a_tok).body)["duel"];
        TEST_ASSERT(g2["status"] == "FINISHED", "Duel finished");
        TEST_ASSERT(g2["winnerId"] == bob.id, "Earliest-received Accepted wins");
        TEST_ASSERT(g2["finishReason"] == "SOLVED", "Reason SOLVED");

        auto late = post("/api/v1/submission/submit", json({{"problemId", duel_pid}, {"sourceCode", "int main(){}"}, {"contestCode", code}}).dump(), a_tok);
        TEST_ASSERT(late.code == 400, "No duel submissions after finish");
    }

    // -------------------------------------------------------------
    // [7] Rematch: one link shared by both players
    // -------------------------------------------------------------
    std::cout << "\n[7] Testing rematch..." << std::endl;
    {
        TEST_ASSERT(post("/api/v1/duels/" + code + "/rematch", "{}", c_tok).code == 403, "Outsider cannot rematch");
        clear_events();
        auto ra = post("/api/v1/duels/" + code + "/rematch", "{}", a_tok);
        TEST_ASSERT(ra.code == 200, "Rematch created");
        auto da = json::parse(ra.body)["duel"];
        std::string next = da["code"];
        TEST_ASSERT(next != code, "Rematch is a new duel");
        TEST_ASSERT(da["difficulty"] == "MEDIUM" && da["timeLimitMinutes"] == 30, "Rematch keeps settings");
        TEST_ASSERT(has_event("REMATCH_OFFER"), "Rematch offer broadcast");

        auto rb = post("/api/v1/duels/" + code + "/rematch", "{}", b_tok);
        auto db = json::parse(rb.body)["duel"];
        TEST_ASSERT(db["code"] == next, "Second rematch click joins the same duel");
        TEST_ASSERT(db["status"] == "LOBBY", "Both players are in the rematch lobby");
    }

    // -------------------------------------------------------------
    // [8] Anti-cheat: warning, debounce, then loss
    // -------------------------------------------------------------
    std::cout << "\n[8] Testing violation warnings..." << std::endl;
    {
        auto [vcode, vpid] = start_live_duel("EASY");
        (void)vpid;
        auto v1 = json::parse(post("/api/v1/duels/" + vcode + "/violation", "{\"reason\":\"Exited fullscreen\"}", a_tok).body);
        TEST_ASSERT(v1["violations"] == 1 && v1["lost"] == false, "First violation is a warning");
        auto v1dup = json::parse(post("/api/v1/duels/" + vcode + "/violation", "{\"reason\":\"Window unfocused\"}", a_tok).body);
        TEST_ASSERT(v1dup["violations"] == 1, "Burst of events from one action counts once");

        {
            // Pretend the last warning was long ago so the next one is not debounced
            auto g = pool.acquire();
            pqxx::work txn(g.get());
            txn.exec_params("UPDATE \"ContestRoom\" SET warnings = jsonb_set(warnings, ARRAY[$1, 'lastAtMs'], '0'::jsonb) WHERE code = $2", alice.id, vcode);
            txn.commit();
        }
        auto v2 = json::parse(post("/api/v1/duels/" + vcode + "/violation", "{\"reason\":\"Tab switch\"}", a_tok).body);
        TEST_ASSERT(v2["lost"] == true, "Second violation loses the duel");
        TEST_ASSERT(v2["duel"]["winnerId"] == bob.id, "Opponent wins");
        TEST_ASSERT(v2["duel"]["finishReason"] == "DISQUALIFIED", "Reason DISQUALIFIED");
    }

    // -------------------------------------------------------------
    // [9] Forfeit, timeout draw, expiry, cancel
    // -------------------------------------------------------------
    std::cout << "\n[9] Testing forfeit / timeout / expiry..." << std::endl;
    {
        auto [fcode, fpid] = start_live_duel("RANDOM");
        (void)fpid;
        auto lv = json::parse(post("/api/v1/duels/" + fcode + "/leave", "{}", b_tok).body)["duel"];
        TEST_ASSERT(lv["winnerId"] == alice.id && lv["finishReason"] == "FORFEIT", "Leaving a live duel forfeits");

        auto [tcode, tpid] = start_live_duel("EASY");
        insert_submission(alice.id, tpid, tcode, "Wrong Answer", "NOW() - INTERVAL '30 seconds'");
        set_duel_times(tcode, "NOW() - INTERVAL '20 minutes'", "NOW() - INTERVAL '1 second'");
        auto td = json::parse(get("/api/v1/duels/" + tcode, a_tok).body)["duel"];
        TEST_ASSERT(td["status"] == "FINISHED" && td["winnerId"].is_null() && td["finishReason"] == "TIMEOUT", "Timeout with no solve is a draw");

        auto r = post("/api/v1/duels", "{\"difficulty\":\"EASY\",\"timeLimitMinutes\":15}", a_tok);
        std::string ecode = json::parse(r.body)["duel"]["code"];
        set_duel_times(ecode, "NOW() - INTERVAL '40 minutes'", "NOW() - INTERVAL '10 minutes'");
        auto ej = post("/api/v1/duels/" + ecode + "/join", "{}", b_tok);
        TEST_ASSERT(ej.code == 410, "Expired link cannot be joined");

        auto r2 = post("/api/v1/duels", "{\"difficulty\":\"EASY\",\"timeLimitMinutes\":15}", a_tok);
        std::string ccode = json::parse(r2.body)["duel"]["code"];
        auto cd = json::parse(post("/api/v1/duels/" + ccode + "/leave", "{}", a_tok).body)["duel"];
        TEST_ASSERT(cd["status"] == "CANCELLED", "Host can cancel a waiting duel");
    }

    // -------------------------------------------------------------
    // [10] Win / loss / draw record
    // -------------------------------------------------------------
    std::cout << "\n[10] Testing duel record..." << std::endl;
    {
        auto ra = duel_service.get_record(alice.id);
        auto rb = duel_service.get_record(bob.id);
        auto rc = duel_service.get_record(carol.id);
        // alice: lost [6], lost [8], won [9 forfeit], drew [9 timeout]; bob also won carol's forfeit in [2]
        TEST_ASSERT(ra["wins"] == 1 && ra["losses"] == 2 && ra["draws"] == 1, "Alice record 1W 2L 1D");
        TEST_ASSERT(rb["wins"] == 3 && rb["losses"] == 1 && rb["draws"] == 1, "Bob record 3W 1L 1D");
        TEST_ASSERT(rc["wins"] == 0 && rc["losses"] == 1 && rc["draws"] == 0, "Carol record 0W 1L (forfeited the defaults duel)");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "   ALL POTD & DUEL TESTS PASSED" << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}

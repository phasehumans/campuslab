#pragma once

#include "crow_all.h"
#include <algorithm>
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../services/contest_service.hpp"
#include "../services/contest_ws_manager.hpp"
#include "../db/connection_pool.hpp"

namespace campuslab {

using json = nlohmann::json;

class ContestController {
public:
    ContestController(ContestService& contest_service, DbConnectionPool& db_pool, const std::string& jwt_secret)
        : contest_service_(contest_service), db_pool_(db_pool), jwt_secret_(jwt_secret) {}

    void register_routes(AppType& app) {
        // POST /api/v1/contests/rooms
        CROW_ROUTE(app, "/api/v1/contests/rooms").methods(crow::HTTPMethod::POST)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            try {
                auto body = json::parse(req.body);
                int question_count = body.value("questionCount", 3);
                int time_limit = body.value("timeLimitMinutes", 45);

                if (question_count < 1 || question_count > 20) {
                    return crow::response(400, json({{"success", false}, {"message", "Question count must be between 1 and 20"}}).dump());
                }
                if (time_limit < 5 || time_limit > 300) {
                    return crow::response(400, json({{"success", false}, {"message", "Time limit must be between 5 and 300 minutes"}}).dump());
                }

                std::optional<int> max_participants;
                if (body.contains("maxParticipants") && !body["maxParticipants"].is_null()) {
                    int mp = body["maxParticipants"].get<int>();
                    if (mp < 1 || mp > 100) {
                        return crow::response(400, json({{"success", false}, {"message", "Max participants must be between 1 and 100"}}).dump());
                    }
                    max_participants = mp;
                }

                std::vector<std::string> topics;
                if (body.contains("topics") && body["topics"].is_array()) {
                    for (const auto& t : body["topics"]) topics.push_back(t.get<std::string>());
                }

                auto res = contest_service_.create_room(auth.user_id, question_count, time_limit, max_participants, topics);
                if (!res.success) {
                    return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                }

                json out = {
                    {"success", true},
                    {"message", res.message},
                    {"room", res.room->to_json()}
                };

                crow::response response(res.status_code, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const json::parse_error& e) {
                return crow::response(400, json({{"success", false}, {"message", "Invalid JSON payload"}}).dump());
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // POST /api/v1/contests/rooms/:code/join
        CROW_ROUTE(app, "/api/v1/contests/rooms/<string>/join").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            std::string code = raw_code;
            std::transform(code.begin(), code.end(), code.begin(), ::toupper);

            try {
                auto res = contest_service_.join_room(auth.user_id, code);
                if (!res.success) {
                    return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                }

                json out = {
                    {"success", true},
                    {"message", res.message},
                    {"room", res.room->to_json()}
                };

                crow::response response(res.status_code, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const json::parse_error& e) {
                return crow::response(400, json({{"success", false}, {"message", "Invalid JSON payload"}}).dump());
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // POST /api/v1/contests/rooms/:code/leave
        CROW_ROUTE(app, "/api/v1/contests/rooms/<string>/leave").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            std::string code = raw_code;
            std::transform(code.begin(), code.end(), code.begin(), ::toupper);

            try {
                auto res = contest_service_.leave_room(auth.user_id, code);
                if (!res.success) {
                    return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                }

                json out = {
                    {"success", true},
                    {"message", res.message},
                    {"room", res.room.has_value() ? res.room->to_json() : nullptr}
                };

                crow::response response(res.status_code, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // GET /api/v1/contests/rooms/:code
        CROW_ROUTE(app, "/api/v1/contests/rooms/<string>").methods(crow::HTTPMethod::GET)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            std::string code = raw_code;
            std::transform(code.begin(), code.end(), code.begin(), ::toupper);

            try {
                auto room_opt = contest_service_.get_room(code, auth.user_id);
                if (!room_opt.has_value()) {
                    return crow::response(404, json({{"success", false}, {"message", "Contest room not found"}}).dump());
                }

                json out = {
                    {"success", true},
                    {"room", room_opt->to_json()}
                };

                crow::response response(200, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // POST /api/v1/contests/rooms/:code/integrity
        CROW_ROUTE(app, "/api/v1/contests/rooms/<string>/integrity").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            std::string code = raw_code;
            std::transform(code.begin(), code.end(), code.begin(), ::toupper);

            try {
                auto body = json::parse(req.body);
                std::string event = body.value("event", "");

                std::string user_name = "Coder";
                try {
                    auto conn_guard = db_pool_.acquire();
                    pqxx::work txn(conn_guard.get());
                    auto u_rows = txn.exec_params("SELECT name FROM \"User\" WHERE id = $1", auth.user_id);
                    if (!u_rows.empty() && !u_rows[0]["name"].is_null()) {
                        user_name = u_rows[0]["name"].as<std::string>();
                    }
                } catch (...) {}

                if (event == "DISQUALIFIED") {
                    std::string reason = body.value("reason", "Tab switch / window exit");
                    auto res = contest_service_.disqualify_participant(auth.user_id, code, reason);
                    if (!res.success) {
                        return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                    }
                    ContestWsManager::instance().broadcast_disqualified(code, auth.user_id, user_name, reason);
                    return crow::response(200, json({{"success", true}, {"message", "Participant disqualified successfully"}}).dump());
                } else if (event == "PASTE_ATTEMPT") {
                    int chars = body.value("chars", 0);
                    ContestWsManager::instance().broadcast_paste_attempt(code, auth.user_id, user_name, chars);
                    return crow::response(200, json({{"success", true}, {"message", "Paste attempt broadcasted"}}).dump());
                } else {
                    return crow::response(400, json({{"success", false}, {"message", "Unknown integrity event"}}).dump());
                }
            } catch (const json::parse_error&) {
                return crow::response(400, json({{"success", false}, {"message", "Invalid JSON payload"}}).dump());
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // WebSocket /ws/contest
        CROW_WEBSOCKET_ROUTE(app, "/ws/contest")
            .onopen([](crow::websocket::connection& conn) {
                ContestWsManager::instance().on_open(conn);
            })
            .onclose([](crow::websocket::connection& conn, const std::string& reason) {
                ContestWsManager::instance().on_close(conn, reason);
            })
            .onmessage([this](crow::websocket::connection& conn, const std::string& data, bool /*is_binary*/) {
                ContestWsManager::instance().handle_message(conn, data, contest_service_, jwt_secret_, db_pool_);
            });
    }

private:
    ContestService& contest_service_;
    DbConnectionPool& db_pool_;
    std::string jwt_secret_;
};

} // namespace campuslab

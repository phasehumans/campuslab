#pragma once

#include "crow_all.h"
#include <algorithm>
#include <cctype>
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../services/duel_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class DuelController {
public:
    DuelController(DuelService& duel_service, const std::string& jwt_secret)
        : duel_service_(duel_service), jwt_secret_(jwt_secret) {}

    void register_routes(AppType& app) {
        // POST /api/v1/duels  { difficulty, timeLimitMinutes }
        CROW_ROUTE(app, "/api/v1/duels").methods(crow::HTTPMethod::POST)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) return error(401, "Unauthorized");
            try {
                auto body = req.body.empty() ? json::object() : json::parse(req.body);
                std::string difficulty = body.value("difficulty", std::string(DuelService::DEFAULT_DIFFICULTY));
                int time_limit = body.value("timeLimitMinutes", DuelService::DEFAULT_TIME_LIMIT_MINUTES);
                return respond(duel_service_.create(auth.user_id, difficulty, time_limit));
            } catch (const json::exception&) {
                return error(400, "Invalid JSON payload");
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });

        // GET /api/v1/duels/:code  (public, so a logged-out invitee sees the challenge card)
        CROW_ROUTE(app, "/api/v1/duels/<string>").methods(crow::HTTPMethod::GET)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            std::string code;
            if (!normalize_code(raw_code, code)) return error(404, "Duel not found");
            try {
                return respond(duel_service_.get(code, auth.user_id));
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });

        // POST /api/v1/duels/:code/join
        CROW_ROUTE(app, "/api/v1/duels/<string>/join").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) return error(401, "Unauthorized");
            std::string code;
            if (!normalize_code(raw_code, code)) return error(404, "Duel not found");
            try {
                return respond(duel_service_.join(auth.user_id, code));
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });

        // POST /api/v1/duels/:code/ready  { ready: bool }
        CROW_ROUTE(app, "/api/v1/duels/<string>/ready").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) return error(401, "Unauthorized");
            std::string code;
            if (!normalize_code(raw_code, code)) return error(404, "Duel not found");
            try {
                auto body = req.body.empty() ? json::object() : json::parse(req.body);
                bool ready = body.value("ready", true);
                return respond(duel_service_.set_ready(auth.user_id, code, ready));
            } catch (const json::exception&) {
                return error(400, "Invalid JSON payload");
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });

        // POST /api/v1/duels/:code/leave
        CROW_ROUTE(app, "/api/v1/duels/<string>/leave").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) return error(401, "Unauthorized");
            std::string code;
            if (!normalize_code(raw_code, code)) return error(404, "Duel not found");
            try {
                return respond(duel_service_.leave(auth.user_id, code));
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });

        // POST /api/v1/duels/:code/violation  { reason }
        CROW_ROUTE(app, "/api/v1/duels/<string>/violation").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) return error(401, "Unauthorized");
            std::string code;
            if (!normalize_code(raw_code, code)) return error(404, "Duel not found");
            try {
                auto body = req.body.empty() ? json::object() : json::parse(req.body);
                std::string reason = body.value("reason", std::string("Left the duel window"));
                if (reason.size() > 120) reason = reason.substr(0, 120);
                auto res = duel_service_.report_violation(auth.user_id, code, reason);
                if (!res.success) return error(res.status_code, res.message);
                json out = {
                    {"success", true},
                    {"message", res.message},
                    {"violations", res.violations},
                    {"maxViolations", DuelService::MAX_VIOLATIONS},
                    {"lost", res.lost},
                    {"duel", res.room.has_value() ? res.room->to_json() : json(nullptr)}
                };
                return json_response(res.status_code, out);
            } catch (const json::exception&) {
                return error(400, "Invalid JSON payload");
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });

        // POST /api/v1/duels/:code/rematch
        CROW_ROUTE(app, "/api/v1/duels/<string>/rematch").methods(crow::HTTPMethod::POST)([this](const crow::request& req, const std::string& raw_code) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) return error(401, "Unauthorized");
            std::string code;
            if (!normalize_code(raw_code, code)) return error(404, "Duel not found");
            try {
                return respond(duel_service_.rematch(auth.user_id, code));
            } catch (const std::exception& e) {
                return error(500, e.what());
            }
        });
    }

private:
    static bool normalize_code(const std::string& raw, std::string& out) {
        if (raw.empty() || raw.size() > 12) return false;
        out.clear();
        for (char c : raw) {
            if (!std::isalnum(static_cast<unsigned char>(c))) return false;
            out += static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
        }
        return true;
    }

    static crow::response json_response(int code, const json& body) {
        crow::response response(code, body.dump());
        response.add_header("Content-Type", "application/json");
        return response;
    }

    static crow::response error(int code, const std::string& message) {
        return json_response(code, {{"success", false}, {"message", message}});
    }

    static crow::response respond(const DuelService::DuelResult& res) {
        if (!res.success) return error(res.status_code, res.message);
        return json_response(res.status_code, {
            {"success", true},
            {"message", res.message},
            {"duel", res.room.has_value() ? res.room->to_json() : json(nullptr)}
        });
    }

    DuelService& duel_service_;
    std::string jwt_secret_;
};

} // namespace campuslab

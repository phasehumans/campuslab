#pragma once

#include "crow_all.h"
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../services/auth_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class AuthController {
public:
    AuthController(
        AuthService& auth_service,
        const std::string& jwt_secret,
        const std::string& github_client_id = "",
        const std::string& github_client_secret = "",
        const std::string& google_client_id = "",
        const std::string& google_client_secret = "",
        const std::string& client_origin = "http://localhost:5173"
    ) : auth_service_(auth_service),
        jwt_secret_(jwt_secret),
        github_client_id_(github_client_id),
        github_client_secret_(github_client_secret),
        google_client_id_(google_client_id),
        google_client_secret_(google_client_secret),
        client_origin_(client_origin) {}

    void register_routes(AppType& app) {
        // POST /api/v1/auth/signup (Retired in favor of pure OAuth)
        CROW_ROUTE(app, "/api/v1/auth/signup").methods(crow::HTTPMethod::POST)([](const crow::request&) {
            crow::response response(410, json({
                {"success", false},
                {"message", "Password signup has been retired. Please authenticate via GitHub or Google OAuth."}
            }).dump());
            response.add_header("Content-Type", "application/json");
            return response;
        });

        // POST /api/v1/auth/login (Retired in favor of pure OAuth)
        CROW_ROUTE(app, "/api/v1/auth/login").methods(crow::HTTPMethod::POST)([](const crow::request&) {
            crow::response response(410, json({
                {"success", false},
                {"message", "Password login has been retired. Please authenticate via GitHub or Google OAuth."}
            }).dump());
            response.add_header("Content-Type", "application/json");
            return response;
        });

        // POST /api/v1/auth/logout
        CROW_ROUTE(app, "/api/v1/auth/logout").methods(crow::HTTPMethod::POST)([](const crow::request&) {
            crow::response response(200, json({{"success", true}, {"message", "Logged out successfully"}}).dump());
            response.add_header("Set-Cookie", "token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
            response.add_header("Content-Type", "application/json");
            return response;
        });

        // GET /api/v1/auth/me
        CROW_ROUTE(app, "/api/v1/auth/me").methods(crow::HTTPMethod::GET)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            try {
                auto user = auth_service_.get_user_by_id(auth.user_id);
                if (!user.has_value()) {
                    return crow::response(404, json({{"success", false}, {"message", "User not found"}}).dump());
                }

                json res_json = {
                    {"success", true},
                    {"user", user->to_json()}
                };

                crow::response response(200, res_json.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // POST /api/v1/auth/oauth
        CROW_ROUTE(app, "/api/v1/auth/oauth").methods(crow::HTTPMethod::POST)([this](const crow::request& req) {
            try {
                auto body = json::parse(req.body);
                std::string provider = body.value("provider", "github");

                AuthService::OAuthResult res;
                if (provider == "github" && body.contains("code")) {
                    res = auth_service_.handle_github_oauth(body["code"].get<std::string>(), github_client_id_, github_client_secret_);
                } else if (provider == "google" && body.contains("code")) {
                    std::string redirect_uri = body.value("redirect_uri", client_origin_ + "/auth/callback/google");
                    res = auth_service_.handle_google_oauth_code(body["code"].get<std::string>(), google_client_id_, google_client_secret_, redirect_uri);
                } else if (provider == "google" && body.contains("credential")) {
                    res = auth_service_.handle_google_oauth(body["credential"].get<std::string>(), google_client_id_);
                } else {
                    std::string email = body.value("email", "");
                    std::string name = body.value("name", "");
                    std::string avatar = body.value("avatar", "");
                    res = auth_service_.handle_oauth(provider, email, name, avatar);
                }

                if (!res.success) {
                    return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                }

                json res_json = {
                    {"success", true},
                    {"message", res.message},
                    {"user", {
                        {"id", res.user.id},
                        {"name", res.user.name.empty() ? nullptr : json(res.user.name)},
                        {"email", res.user.email},
                        {"avatar", res.user.avatar.empty() ? nullptr : json(res.user.avatar)},
                        {"provider", res.user.provider},
                        {"role", res.user.role}
                    }},
                    {"token", res.token}
                };

                crow::response response(res.status_code, res_json.dump());
                response.add_header("Set-Cookie", "token=" + res.token + "; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800");
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const json::parse_error& e) {
                return crow::response(400, json({{"success", false}, {"message", "Invalid JSON payload"}}).dump());
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });
    }

private:
    AuthService& auth_service_;
    std::string jwt_secret_;
    std::string github_client_id_;
    std::string github_client_secret_;
    std::string google_client_id_;
    std::string google_client_secret_;
    std::string client_origin_;
};

} // namespace campuslab

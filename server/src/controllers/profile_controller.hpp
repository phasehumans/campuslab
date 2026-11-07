#pragma once

#include "crow_all.h"
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../services/profile_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class ProfileController {
public:
    ProfileController(ProfileService& profile_service, const std::string& jwt_secret)
        : profile_service_(profile_service), jwt_secret_(jwt_secret) {}

    void register_routes(AppType& app) {
        // GET /api/v1/profile/me
        CROW_ROUTE(app, "/api/v1/profile/me").methods(crow::HTTPMethod::GET)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            try {
                auto profile_opt = profile_service_.get_profile(auth.user_id);
                if (!profile_opt.has_value()) {
                    return crow::response(404, json({{"success", false}, {"message", "User not found"}}).dump());
                }

                json out = {
                    {"success", true},
                    {"profile", *profile_opt}
                };

                crow::response response(200, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });
    }

private:
    ProfileService& profile_service_;
    std::string jwt_secret_;
};

} // namespace campuslab

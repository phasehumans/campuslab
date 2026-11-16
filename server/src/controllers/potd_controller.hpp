#pragma once

#include "crow_all.h"
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../services/potd_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class PotdController {
public:
    PotdController(PotdService& potd_service, const std::string& jwt_secret)
        : potd_service_(potd_service), jwt_secret_(jwt_secret) {}

    void register_routes(AppType& app) {
        // GET /api/v1/potd  (public; solvedByMe is filled in when signed in)
        CROW_ROUTE(app, "/api/v1/potd").methods(crow::HTTPMethod::GET)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            try {
                auto potd = potd_service_.get_today(auth.user_id);
                if (!potd.has_value()) {
                    crow::response response(404, json({{"success", false}, {"message", "No problem of the day available"}}).dump());
                    response.add_header("Content-Type", "application/json");
                    return response;
                }
                crow::response response(200, json({{"success", true}, {"potd", *potd}}).dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                crow::response response(500, json({{"success", false}, {"message", e.what()}}).dump());
                response.add_header("Content-Type", "application/json");
                return response;
            }
        });
    }

private:
    PotdService& potd_service_;
    std::string jwt_secret_;
};

} // namespace campuslab

#pragma once

#include "crow_all.h"
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../services/problem_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class ProblemController {
public:
    ProblemController(ProblemService& problem_service, const std::string& jwt_secret)
        : problem_service_(problem_service), jwt_secret_(jwt_secret) {}

    void register_routes(AppType& app) {
        // GET /api/v1/problems
        CROW_ROUTE(app, "/api/v1/problems").methods(crow::HTTPMethod::GET)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            try {
                auto problems = problem_service_.get_all_problems(auth.user_id);
                json arr = json::array();
                for (const auto& p : problems) {
                    arr.push_back(p.to_json());
                }

                json res_json = {
                    {"success", true},
                    {"count", arr.size()},
                    {"problems", arr}
                };

                crow::response response(200, res_json.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // GET /api/v1/problems/:id
        CROW_ROUTE(app, "/api/v1/problems/<string>").methods(crow::HTTPMethod::GET)([this](const crow::request& req, const std::string& problem_id) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            try {
                auto prob_opt = problem_service_.get_problem_by_id(problem_id, auth.user_id);
                if (!prob_opt.has_value()) {
                    return crow::response(404, json({{"success", false}, {"message", "Problem not found"}}).dump());
                }

                json res_json = {
                    {"success", true},
                    {"problem", prob_opt->to_json()}
                };

                crow::response response(200, res_json.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });
    }

private:
    ProblemService& problem_service_;
    std::string jwt_secret_;
};

} // namespace campuslab

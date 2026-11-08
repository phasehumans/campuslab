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
                ProblemQueryOptions opts;
                opts.page = 1;
                opts.limit = 25;

                if (const char* p = req.url_params.get("page")) {
                    try { opts.page = std::stoi(p); } catch (...) {}
                }
                if (const char* l = req.url_params.get("limit")) {
                    try {
                        std::string l_str(l);
                        if (l_str == "all") {
                            opts.limit = 10000;
                        } else {
                            opts.limit = std::stoi(l_str);
                        }
                    } catch (...) {}
                }
                if (const char* s = req.url_params.get("search")) {
                    opts.search = s;
                }
                if (const char* d = req.url_params.get("difficulty")) {
                    opts.difficulty = d;
                }
                if (const char* t = req.url_params.get("topic")) {
                    opts.topic = t;
                }
                if (const char* st = req.url_params.get("status")) {
                    opts.status = st;
                }

                auto result = problem_service_.get_problems_paginated(opts, auth.user_id);
                json arr = json::array();
                for (const auto& p : result.problems) {
                    arr.push_back(p.to_json());
                }

                json res_json = {
                    {"success", true},
                    {"count", arr.size()},
                    {"total", result.total},
                    {"page", result.page},
                    {"limit", result.limit},
                    {"totalPages", result.total_pages},
                    {"allTags", result.all_tags},
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

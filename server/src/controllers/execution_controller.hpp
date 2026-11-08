#pragma once

#include "crow_all.h"
#include "json.hpp"
#include "../middleware/cors.hpp"
#include "../middleware/auth_middleware.hpp"
#include "../middleware/rate_limiter.hpp"
#include "../services/execution_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class ExecutionController {
public:
    ExecutionController(ExecutionService& execution_service, const std::string& jwt_secret)
        : execution_service_(execution_service), jwt_secret_(jwt_secret), rate_limiter_(60, 60) {}

    void register_routes(AppType& app) {
        // POST /api/v1/code-execution/run
        CROW_ROUTE(app, "/api/v1/code-execution/run").methods(crow::HTTPMethod::POST)([this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            // Rate Limit
            auto limit_res = rate_limiter_.check_limit(auth.user_id.empty() ? RateLimiter::get_client_ip(req) : auth.user_id);
            if (!limit_res.allowed) {
                crow::response response(429, json({{"success", false}, {"message", "Rate limit exceeded. Please wait before running more code."}}).dump());
                response.add_header("Retry-After", std::to_string(limit_res.retry_after_seconds));
                response.add_header("Content-Type", "application/json");
                return response;
            }

            // Payload size validation (1MB)
            if (req.body.size() > 1048576) {
                return crow::response(413, json({{"success", false}, {"message", "Payload exceeds maximum allowed size of 1MB"}}).dump());
            }

            try {
                auto body = json::parse(req.body);
                auto get_str = [](const json& j, const std::string& key, const std::string& def = "") -> std::string {
                    if (!j.contains(key) || j[key].is_null()) return def;
                    if (j[key].is_string()) return j[key].get<std::string>();
                    return j[key].dump();
                };

                std::string source_code = get_str(body, "sourceCode");
                if (source_code.size() > 65536) {
                    return crow::response(413, json({{"success", false}, {"message", "Source code exceeds maximum allowed size of 64KB"}}).dump());
                }

                std::vector<Testcase> testcases;
                if (body.contains("testcases") && body["testcases"].is_array()) {
                    for (const auto& tc : body["testcases"]) {
                        testcases.push_back({
                            get_str(tc, "input"),
                            get_str(tc, "output")
                        });
                    }
                }

                auto res = execution_service_.run_code(auth.user_id, source_code, testcases);
                if (!res.success) {
                    return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                }

                json out = {
                    {"success", true},
                    {"message", res.message},
                    {"execution", res.execution}
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

        // POST /api/v1/submission/submit and POST /api/v1/submission
        auto handle_submit = [this](const crow::request& req) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            // Rate Limit
            auto limit_res = rate_limiter_.check_limit(auth.user_id.empty() ? RateLimiter::get_client_ip(req) : auth.user_id);
            if (!limit_res.allowed) {
                crow::response response(429, json({{"success", false}, {"message", "Rate limit exceeded. Please wait before submitting more code."}}).dump());
                response.add_header("Retry-After", std::to_string(limit_res.retry_after_seconds));
                response.add_header("Content-Type", "application/json");
                return response;
            }

            // Payload size validation (1MB)
            if (req.body.size() > 1048576) {
                return crow::response(413, json({{"success", false}, {"message", "Payload exceeds maximum allowed size of 1MB"}}).dump());
            }

            try {
                auto body = json::parse(req.body);
                auto get_str = [](const json& j, const std::string& key, const std::string& def = "") -> std::string {
                    if (!j.contains(key) || j[key].is_null()) return def;
                    if (j[key].is_string()) return j[key].get<std::string>();
                    return j[key].dump();
                };

                std::string problem_id = get_str(body, "problemId");
                std::string source_code = get_str(body, "sourceCode");
                std::string contest_code = get_str(body, "contestCode");

                std::optional<int> user_solve_time = std::nullopt;
                if (body.contains("solveDurationSeconds") && body["solveDurationSeconds"].is_number_integer()) {
                    user_solve_time = body["solveDurationSeconds"].get<int>();
                } else if (body.contains("userSolveTime") && body["userSolveTime"].is_number_integer()) {
                    user_solve_time = body["userSolveTime"].get<int>();
                }

                if (source_code.size() > 65536) {
                    return crow::response(413, json({{"success", false}, {"message", "Source code exceeds maximum allowed size of 64KB"}}).dump());
                }

                auto res = execution_service_.submit_code(auth.user_id, problem_id, source_code, contest_code, user_solve_time);
                if (!res.success) {
                    return crow::response(res.status_code, json({{"success", false}, {"message", res.message}}).dump());
                }

                json out = {
                    {"success", true},
                    {"message", res.message},
                    {"submission", res.submission},
                    {"execution", res.execution}
                };

                crow::response response(res.status_code, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const json::parse_error& e) {
                return crow::response(400, json({{"success", false}, {"message", "Invalid JSON payload"}}).dump());
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        };

        CROW_ROUTE(app, "/api/v1/submission/submit").methods(crow::HTTPMethod::POST)(handle_submit);
        CROW_ROUTE(app, "/api/v1/submission").methods(crow::HTTPMethod::POST)(handle_submit);

        // GET /api/v1/submission/:id
        CROW_ROUTE(app, "/api/v1/submission/<string>").methods(crow::HTTPMethod::GET)([this](const crow::request&, const std::string& submission_id) {
            try {
                auto sub = execution_service_.get_submission_by_id(submission_id);
                if (sub.is_null()) {
                    return crow::response(404, json({{"success", false}, {"message", "Submission not found"}}).dump());
                }

                json out = {
                    {"success", true},
                    {"submission", sub}
                };

                crow::response response(200, out.dump());
                response.add_header("Content-Type", "application/json");
                return response;
            } catch (const std::exception& e) {
                return crow::response(500, json({{"success", false}, {"message", e.what()}}).dump());
            }
        });

        // GET /api/v1/submission/problem/:id
        CROW_ROUTE(app, "/api/v1/submission/problem/<string>").methods(crow::HTTPMethod::GET)([this](const crow::request& req, const std::string& problem_id) {
            auto auth = AuthMiddleware::get_auth_context(req, jwt_secret_);
            if (!auth.is_authenticated) {
                return crow::response(401, json({{"success", false}, {"message", "Unauthorized"}}).dump());
            }

            try {
                auto list = execution_service_.get_user_submissions_for_problem(auth.user_id, problem_id);
                json out = {
                    {"success", true},
                    {"submissions", list}
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
    ExecutionService& execution_service_;
    std::string jwt_secret_;
    RateLimiter rate_limiter_;
};

} // namespace campuslab

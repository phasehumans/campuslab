#pragma once

#include "crow_all.h"
#include <string>

namespace campuslab {

struct CORSMiddleware {
    struct context {};

    static std::string get_allowed_origin(const crow::request& req) {
        std::string origin = req.get_header_value("Origin");
        if (origin.empty()) {
            origin = req.get_header_value("origin");
        }
        if (origin == "http://localhost:4000" ||
            origin == "http://localhost:5173" ||
            origin == "https://lab.trydecember.com" ||
            origin == "http://127.0.0.1:4000" ||
            origin == "http://127.0.0.1:5173") {
            return origin;
        }
        return origin.empty() ? "http://localhost:5173" : origin;
    }

    void before_handle(crow::request& req, crow::response& res, context&) {
        if (req.method == crow::HTTPMethod::OPTIONS) {
            std::string origin = get_allowed_origin(req);
            res.code = 204;
            res.set_header("Access-Control-Allow-Origin", origin);
            res.set_header("Access-Control-Allow-Credentials", "true");
            res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
            res.end();
        }
    }

    void after_handle(crow::request& req, crow::response& res, context&) {
        std::string origin = get_allowed_origin(req);
        res.set_header("Access-Control-Allow-Origin", origin);
        res.set_header("Access-Control-Allow-Credentials", "true");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
    }
};

using AppType = crow::App<CORSMiddleware>;

} // namespace campuslab

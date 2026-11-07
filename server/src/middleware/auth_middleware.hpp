#pragma once

#include "crow_all.h"
#include <string>
#include <optional>
#include "auth_helper.hpp"

namespace campuslab {

struct AuthContext {
    std::string user_id;
    std::string role;
    bool is_authenticated = false;
};

class AuthMiddleware {
public:
    static std::string extract_token(const crow::request& req) {
        // 1. Check Authorization header: Bearer ... (takes precedence)
        std::string auth_header = req.get_header_value("Authorization");
        if (auth_header.rfind("Bearer ", 0) == 0) {
            std::string tok = auth_header.substr(7);
            if (!tok.empty()) return tok;
        }
        // 2. Check Cookie header: token=...
        std::string cookie_header = req.get_header_value("Cookie");
        if (!cookie_header.empty()) {
            auto pos = cookie_header.find("token=");
            if (pos != std::string::npos) {
                auto end = cookie_header.find(';', pos);
                if (end == std::string::npos) end = cookie_header.length();
                return cookie_header.substr(pos + 6, end - (pos + 6));
            }
        }
        return "";
    }

    static AuthContext get_auth_context(const crow::request& req, const std::string& jwt_secret) {
        AuthContext ctx;
        std::string token = extract_token(req);
        if (token.empty()) return ctx;

        if (AuthHelper::verify_jwt(token, jwt_secret, ctx.user_id, ctx.role)) {
            ctx.is_authenticated = true;
        }
        return ctx;
    }
};

} // namespace campuslab

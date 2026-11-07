#pragma once

#include <string>
#include <optional>
#include <algorithm>
#include "json.hpp"
#include "../db/connection_pool.hpp"
#include "../models/models.hpp"
#include "../repositories/user_repository.hpp"
#include "auth_helper.hpp"
#include "http_client.hpp"

namespace campuslab {

class AuthService {
public:
    explicit AuthService(DbConnectionPool& db_pool, const std::string& jwt_secret)
        : db_pool_(db_pool), jwt_secret_(jwt_secret) {}

    struct OAuthResult {
        bool success;
        int status_code;
        std::string message;
        OAuthUser user;
        std::string token;
    };

    OAuthResult handle_oauth(const std::string& provider, const std::string& raw_email, const std::string& raw_name, const std::string& avatar) {
        std::string email = raw_email;
        std::string name = raw_name;
        if (email.empty()) {
            email = provider + "_user@campuslab.dev";
            if (name.empty()) {
                name = provider == "github" ? "GitHub User" : "Google User";
            }
        }

        auto conn_guard = db_pool_.acquire();
        auto oauth_user = UserRepository::find_or_create_oauth_user(conn_guard.get(), email, name, avatar, provider);
        std::string token = AuthHelper::sign_jwt(oauth_user.id, oauth_user.role, jwt_secret_);

        return {true, 200, "OAuth login successful", oauth_user, token};
    }

    OAuthResult handle_github_oauth(const std::string& code, const std::string& client_id, const std::string& client_secret) {
        if (code.empty()) {
            return {false, 400, "GitHub authorization code is required", {}, ""};
        }

        json token_payload = {
            {"client_id", client_id},
            {"client_secret", client_secret},
            {"code", code}
        };

        std::string token_resp_str = HttpClient::post_json("https://github.com/login/oauth/access_token", token_payload.dump());
        if (token_resp_str.empty()) {
            return {false, 502, "Failed to connect to GitHub OAuth server", {}, ""};
        }

        std::string access_token;
        try {
            auto token_json = json::parse(token_resp_str);
            if (token_json.contains("error")) {
                std::string err_desc = token_json.value("error_description", token_json["error"].get<std::string>());
                return {false, 400, "GitHub OAuth error: " + err_desc, {}, ""};
            }
            access_token = token_json.value("access_token", "");
        } catch (...) {
            return {false, 502, "Invalid response from GitHub token endpoint", {}, ""};
        }

        if (access_token.empty()) {
            return {false, 400, "GitHub access token not found", {}, ""};
        }

        // Fetch user profile
        std::string user_resp_str = HttpClient::get("https://api.github.com/user", {"Authorization: Bearer " + access_token});
        if (user_resp_str.empty()) {
            return {false, 502, "Failed to fetch GitHub user profile", {}, ""};
        }

        std::string email, name, avatar;
        try {
            auto user_json = json::parse(user_resp_str);
            name = user_json.value("name", "");
            if (name.empty()) name = user_json.value("login", "GitHub User");
            avatar = user_json.value("avatar_url", "");
            email = user_json.value("email", "");
        } catch (...) {
            return {false, 502, "Invalid GitHub user profile data", {}, ""};
        }

        // If email is private on GitHub, fetch from /user/emails
        if (email.empty()) {
            std::string emails_resp_str = HttpClient::get("https://api.github.com/user/emails", {"Authorization: Bearer " + access_token});
            try {
                auto emails_json = json::parse(emails_resp_str);
                if (emails_json.is_array()) {
                    for (const auto& item : emails_json) {
                        if (item.value("primary", false) && item.value("verified", false)) {
                            email = item.value("email", "");
                            break;
                        }
                    }
                    if (email.empty() && !emails_json.empty()) {
                        email = emails_json[0].value("email", "");
                    }
                }
            } catch (...) {}
        }

        if (email.empty()) {
            email = "github_" + code.substr(0, std::min<size_t>(code.size(), 8)) + "@campuslab.dev";
        }

        return handle_oauth("github", email, name, avatar);
    }

    OAuthResult handle_google_oauth(const std::string& credential, const std::string& expected_client_id) {
        if (credential.empty()) {
            return {false, 400, "Google credential token is required", {}, ""};
        }

        std::string verify_resp = HttpClient::get("https://oauth2.googleapis.com/tokeninfo?id_token=" + credential);
        if (verify_resp.empty()) {
            return {false, 502, "Failed to verify Google ID token", {}, ""};
        }

        try {
            auto google_json = json::parse(verify_resp);
            if (google_json.contains("error_description")) {
                return {false, 401, "Google token invalid: " + google_json["error_description"].get<std::string>(), {}, ""};
            }

            std::string email = google_json.value("email", "");
            std::string name = google_json.value("name", "Google User");
            std::string avatar = google_json.value("picture", "");

            if (email.empty()) {
                return {false, 400, "Google token did not contain an email address", {}, ""};
            }

            return handle_oauth("google", email, name, avatar);
        } catch (...) {
            return {false, 502, "Invalid response from Google token verification", {}, ""};
        }
    }

    OAuthResult handle_google_oauth_code(
        const std::string& code,
        const std::string& client_id,
        const std::string& client_secret,
        const std::string& redirect_uri
    ) {
        if (code.empty()) {
            return {false, 400, "Google authorization code is required", {}, ""};
        }

        json token_payload = {
            {"code", code},
            {"client_id", client_id},
            {"client_secret", client_secret},
            {"redirect_uri", redirect_uri},
            {"grant_type", "authorization_code"}
        };

        std::string token_resp_str = HttpClient::post_json("https://oauth2.googleapis.com/token", token_payload.dump());
        if (token_resp_str.empty()) {
            return {false, 502, "Failed to connect to Google OAuth server", {}, ""};
        }

        std::string access_token;
        std::string id_token;
        try {
            auto token_json = json::parse(token_resp_str);
            if (token_json.contains("error")) {
                std::string err_desc = token_json.value("error_description", token_json["error"].get<std::string>());
                return {false, 400, "Google OAuth error: " + err_desc, {}, ""};
            }
            access_token = token_json.value("access_token", "");
            id_token = token_json.value("id_token", "");
        } catch (...) {
            return {false, 502, "Invalid response from Google token endpoint", {}, ""};
        }

        if (id_token.empty() && access_token.empty()) {
            return {false, 400, "Google tokens not found in response", {}, ""};
        }

        std::string email, name, avatar;
        if (!access_token.empty()) {
            std::string user_resp_str = HttpClient::get("https://www.googleapis.com/oauth2/v3/userinfo", {"Authorization: Bearer " + access_token});
            if (!user_resp_str.empty()) {
                try {
                    auto user_json = json::parse(user_resp_str);
                    email = user_json.value("email", "");
                    name = user_json.value("name", "Google User");
                    avatar = user_json.value("picture", "");
                } catch (...) {}
            }
        }

        if (email.empty() && !id_token.empty()) {
            return handle_google_oauth(id_token, client_id);
        }

        if (email.empty()) {
            return {false, 400, "Failed to retrieve user email from Google", {}, ""};
        }

        return handle_oauth("google", email, name, avatar);
    }

    std::optional<UserModel> get_user_by_id(const std::string& user_id) {
        auto conn_guard = db_pool_.acquire();
        return UserRepository::find_by_id(conn_guard.get(), user_id);
    }

private:
    DbConnectionPool& db_pool_;
    std::string jwt_secret_;
};

} // namespace campuslab

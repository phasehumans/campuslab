#pragma once

#include <string>
#include <optional>
#include <pqxx/pqxx>
#include "json.hpp"
#include "../models/models.hpp"

namespace campuslab {

using json = nlohmann::json;

struct OAuthUser {
    std::string id;
    std::string name;
    std::string email;
    std::string avatar;
    std::string provider;
    std::string role;
};

class UserRepository {
public:
    static std::optional<UserModel> find_by_id(pqxx::connection& conn, const std::string& user_id) {
        pqxx::work txn(conn);
        auto rows = txn.exec_params(
            "SELECT id, name, email, avatar, provider, role, \"createdAt\"::text AS created_at "
            "FROM \"User\" WHERE id = $1",
            user_id
        );
        if (rows.empty()) return std::nullopt;

        UserModel u;
        u.id = rows[0]["id"].as<std::string>();
        u.name = rows[0]["name"].is_null() ? "" : rows[0]["name"].as<std::string>();
        u.email = rows[0]["email"].is_null() ? "" : rows[0]["email"].as<std::string>();
        u.avatar = rows[0]["avatar"].is_null() ? "" : rows[0]["avatar"].as<std::string>();
        u.provider = rows[0]["provider"].is_null() ? "" : rows[0]["provider"].as<std::string>();
        u.role = rows[0]["role"].as<std::string>();
        u.created_at = rows[0]["created_at"].as<std::string>();
        return u;
    }

    static OAuthUser find_or_create_oauth_user(pqxx::connection& conn, const std::string& email, const std::string& name, const std::string& avatar, const std::string& provider) {
        pqxx::work txn(conn);
        auto existing = txn.exec_params(
            "SELECT id, name, email, avatar, provider, role FROM \"User\" WHERE email = $1",
            email
        );

        OAuthUser u;
        if (!existing.empty()) {
            u.id = existing[0]["id"].as<std::string>();
            u.name = existing[0]["name"].is_null() ? name : existing[0]["name"].as<std::string>();
            u.email = existing[0]["email"].as<std::string>();
            u.avatar = existing[0]["avatar"].is_null() ? avatar : existing[0]["avatar"].as<std::string>();
            u.provider = existing[0]["provider"].is_null() ? provider : existing[0]["provider"].as<std::string>();
            u.role = existing[0]["role"].as<std::string>();
        } else {
            auto new_user = txn.exec_params(
                "INSERT INTO \"User\" (\"id\", \"name\", \"email\", \"avatar\", \"provider\", \"role\", \"createdAt\", \"updatedAt\") "
                "VALUES (gen_random_uuid(), $1, $2, $3, $4, 'USER', NOW(), NOW()) "
                "RETURNING id, role",
                name, email, avatar, provider
            );
            u.id = new_user[0]["id"].as<std::string>();
            u.name = name;
            u.email = email;
            u.avatar = avatar;
            u.provider = provider;
            u.role = new_user[0]["role"].as<std::string>();
        }
        txn.commit();
        return u;
    }
};

} // namespace campuslab

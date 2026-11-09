#pragma once

#include "crow_all.h"
#include <mutex>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <chrono>
#include <algorithm>
#include "json.hpp"
#include "auth_helper.hpp"
#include "contest_service.hpp"

namespace campuslab {

using json = nlohmann::json;

class ContestWsManager {
public:
    static ContestWsManager& instance() {
        static ContestWsManager inst;
        return inst;
    }

    struct Session {
        crow::websocket::connection* conn = nullptr;
        std::string user_id;
        std::string user_name;
        std::string room_code;
    };

    void on_open(crow::websocket::connection& /*conn*/) {
        // Connection opened; waits for JOIN_ROOM message
    }

    void on_close(crow::websocket::connection& conn, const std::string& /*reason*/) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto it = sessions_.find(&conn);
        if (it != sessions_.end()) {
            std::string code = it->second.room_code;
            if (!code.empty()) {
                room_conns_[code].erase(&conn);
                if (room_conns_[code].empty()) {
                    room_conns_.erase(code);
                }
            }
            sessions_.erase(it);
        }
    }

    void broadcast_to_room(const std::string& room_code, const json& msg) {
        std::string payload = msg.dump();
        std::vector<crow::websocket::connection*> targets;
        {
            std::lock_guard<std::mutex> lock(mutex_);
            auto it = room_conns_.find(room_code);
            if (it != room_conns_.end()) {
                for (auto* c : it->second) {
                    targets.push_back(c);
                }
            }
        }
        for (auto* c : targets) {
            try {
                c->send_text(payload);
            } catch (...) {}
        }
    }

    void broadcast_disqualified(const std::string& room_code, const std::string& user_id, const std::string& user_name, const std::string& reason) {
        json broadcast = {
            {"type", "PEER_DISQUALIFIED"},
            {"userId", user_id},
            {"userName", user_name},
            {"reason", reason},
            {"timestamp", now_iso()}
        };
        broadcast_to_room(room_code, broadcast);
    }

    void broadcast_paste_attempt(const std::string& room_code, const std::string& user_id, const std::string& user_name, int chars) {
        json broadcast = {
            {"type", "PEER_PASTE_ATTEMPT"},
            {"userId", user_id},
            {"userName", user_name},
            {"chars", chars},
            {"timestamp", now_iso()}
        };
        broadcast_to_room(room_code, broadcast);
    }

    void handle_message(
        crow::websocket::connection& conn,
        const std::string& data,
        ContestService& contest_service,
        const std::string& jwt_secret,
        DbConnectionPool& db_pool
    ) {
        try {
            auto j = json::parse(data);
            std::string type = j.value("type", "");

            if (type == "JOIN_ROOM") {
                std::string room_code = j.value("roomCode", "");
                std::string token = j.value("token", "");
                std::transform(room_code.begin(), room_code.end(), room_code.begin(), ::toupper);

                std::string user_id;
                std::string role;
                if (!token.empty() && AuthHelper::verify_jwt(token, jwt_secret, user_id, role)) {
                    std::string user_name = "Coder";
                    try {
                        auto conn_guard = db_pool.acquire();
                        pqxx::work txn(conn_guard.get());
                        auto u_rows = txn.exec_params("SELECT name FROM \"User\" WHERE id = $1", user_id);
                        if (!u_rows.empty() && !u_rows[0]["name"].is_null()) {
                            user_name = u_rows[0]["name"].as<std::string>();
                        }
                    } catch (...) {}

                    {
                        std::lock_guard<std::mutex> lock(mutex_);
                        sessions_[&conn] = {&conn, user_id, user_name, room_code};
                        room_conns_[room_code].insert(&conn);
                    }

                    conn.send_text(json({
                        {"type", "JOINED"},
                        {"roomCode", room_code},
                        {"userId", user_id},
                        {"userName", user_name}
                    }).dump());
                } else {
                    conn.send_text(json({
                        {"type", "ERROR"},
                        {"message", "Invalid authentication token"}
                    }).dump());
                }
            } else if (type == "DISQUALIFIED") {
                std::string reason = j.value("reason", "Tab switch / window exit");
                std::string user_id;
                std::string user_name;
                std::string room_code;
                {
                    std::lock_guard<std::mutex> lock(mutex_);
                    auto it = sessions_.find(&conn);
                    if (it != sessions_.end()) {
                        user_id = it->second.user_id;
                        user_name = it->second.user_name;
                        room_code = it->second.room_code;
                    }
                }

                if (!user_id.empty() && !room_code.empty()) {
                    contest_service.disqualify_participant(user_id, room_code, reason);
                    broadcast_disqualified(room_code, user_id, user_name, reason);
                }
            } else if (type == "PASTE_ATTEMPT") {
                int chars = j.value("chars", 0);
                std::string user_id;
                std::string user_name;
                std::string room_code;
                {
                    std::lock_guard<std::mutex> lock(mutex_);
                    auto it = sessions_.find(&conn);
                    if (it != sessions_.end()) {
                        user_id = it->second.user_id;
                        user_name = it->second.user_name;
                        room_code = it->second.room_code;
                    }
                }

                if (!user_id.empty() && !room_code.empty()) {
                    broadcast_paste_attempt(room_code, user_id, user_name, chars);
                }
            } else if (type == "PING") {
                conn.send_text(json({{"type", "PONG"}}).dump());
            }
        } catch (...) {}
    }

private:
    ContestWsManager() = default;

    static std::string now_iso() {
        auto now = std::chrono::system_clock::now();
        auto in_time_t = std::chrono::system_clock::to_time_t(now);
        char buf[64];
        std::strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%SZ", std::gmtime(&in_time_t));
        return std::string(buf);
    }

    std::mutex mutex_;
    std::unordered_map<crow::websocket::connection*, Session> sessions_;
    std::unordered_map<std::string, std::unordered_set<crow::websocket::connection*>> room_conns_;
};

} // namespace campuslab

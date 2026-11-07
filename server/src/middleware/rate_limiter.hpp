#pragma once

#include <string>
#include <unordered_map>
#include <vector>
#include <chrono>
#include <mutex>
#include "crow_all.h"
#include "json.hpp"

namespace campuslab {

using json = nlohmann::json;

class RateLimiter {
public:
    struct LimitResult {
        bool allowed;
        int remaining;
        int retry_after_seconds;
    };

    RateLimiter(int max_requests, int window_seconds)
        : max_requests_(max_requests), window_duration_(std::chrono::seconds(window_seconds)) {}

    LimitResult check_limit(const std::string& key) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto now = std::chrono::steady_clock::now();
        auto cutoff = now - window_duration_;

        auto& timestamps = history_[key];
        
        // Remove timestamps older than cutoff
        size_t valid_idx = 0;
        while (valid_idx < timestamps.size() && timestamps[valid_idx] < cutoff) {
            valid_idx++;
        }
        if (valid_idx > 0) {
            timestamps.erase(timestamps.begin(), timestamps.begin() + valid_idx);
        }

        if (static_cast<int>(timestamps.size()) >= max_requests_) {
            // Over limit
            auto oldest = timestamps.front();
            auto expires_in = std::chrono::duration_cast<std::chrono::seconds>(oldest + window_duration_ - now).count();
            int retry_after = static_cast<int>(expires_in > 0 ? expires_in : 1);
            return {false, 0, retry_after};
        }

        timestamps.push_back(now);
        int remaining = max_requests_ - static_cast<int>(timestamps.size());
        return {true, remaining, 0};
    }

    static std::string get_client_ip(const crow::request& req) {
        std::string forwarded = req.get_header_value("X-Forwarded-For");
        if (!forwarded.empty()) {
            auto comma = forwarded.find(',');
            if (comma != std::string::npos) return forwarded.substr(0, comma);
            return forwarded;
        }
        std::string real_ip = req.get_header_value("X-Real-IP");
        if (!real_ip.empty()) return real_ip;
        return req.remote_ip_address.empty() ? "127.0.0.1" : req.remote_ip_address;
    }

private:
    int max_requests_;
    std::chrono::seconds window_duration_;
    std::mutex mutex_;
    std::unordered_map<std::string, std::vector<std::chrono::steady_clock::time_point>> history_;
};

} // namespace campuslab

#pragma once

#include <chrono>
#include <string>
#include "json.hpp"

namespace campuslab {

using json = nlohmann::json;

// Anti-cheat violation counting shared by contests and duels.
// Stored per room in ContestRoom.warnings as { userId: { count, lastAtMs, lastReason } }.
// The first violation is a warning; reaching MAX_VIOLATIONS disqualifies.
struct Integrity {
    static constexpr int MAX_VIOLATIONS = 2;
    // One real action (e.g. Alt+Tab) fires blur + visibilitychange + fullscreenchange together
    static constexpr long long DEBOUNCE_MS = 3000;

    struct Outcome {
        int violations = 0;
        bool duplicate = false;     // ignored as part of the same burst
        bool disqualified = false;  // reached MAX_VIOLATIONS with this report
    };

    static int count_for(const json& warnings, const std::string& user_id) {
        return warnings.contains(user_id) ? warnings[user_id].value("count", 0) : 0;
    }

    // Updates `warnings` in place and reports what this violation means.
    static Outcome record(json& warnings, const std::string& user_id, const std::string& reason) {
        Outcome out;
        long long now_ms = std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
        int count = count_for(warnings, user_id);
        long long last_ms = warnings.contains(user_id) ? warnings[user_id].value("lastAtMs", 0LL) : 0LL;

        if (count > 0 && now_ms - last_ms < DEBOUNCE_MS) {
            out.violations = count;
            out.duplicate = true;
            return out;
        }

        count += 1;
        warnings[user_id] = {{"count", count}, {"lastAtMs", now_ms}, {"lastReason", reason}};
        out.violations = count;
        out.disqualified = count >= MAX_VIOLATIONS;
        return out;
    }
};

} // namespace campuslab

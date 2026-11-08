#pragma once

#include <string>
#include <vector>
#include <optional>
#include "json.hpp"
#include "types.hpp"

namespace campuslab {

using json = nlohmann::json;

// -------------------------------------------------------------
// USER MODELS
// -------------------------------------------------------------
struct UserModel {
    std::string id;
    std::string name;
    std::string email;
    std::string avatar;
    std::string provider;
    std::string role;
    std::string created_at;

    json to_json() const {
        return {
            {"id", id},
            {"name", name.empty() ? nullptr : json(name)},
            {"email", email.empty() ? nullptr : json(email)},
            {"avatar", avatar.empty() ? nullptr : json(avatar)},
            {"provider", provider.empty() ? nullptr : json(provider)},
            {"role", role},
            {"createdAt", created_at}
        };
    }
};

// -------------------------------------------------------------
// PROBLEM MODELS
// -------------------------------------------------------------
struct ProblemSummaryModel {
    std::string id;
    std::string title;
    std::string difficulty; // "Easy", "Medium", "Hard"
    std::vector<std::string> tags;
    std::string status;     // "Solved", "Attempted", "Unsolved"
    int submission_count = 0;

    json to_json() const {
        return {
            {"id", id},
            {"title", title},
            {"difficulty", difficulty},
            {"tags", tags},
            {"status", status},
            {"submissionCount", submission_count}
        };
    }
};

struct ProblemDetailModel {
    std::string id;
    std::string title;
    std::string description;
    std::string difficulty;
    std::vector<std::string> tags;
    std::string status;
    int submission_count = 0;
    std::string constraints;
    std::optional<std::string> hints;
    std::optional<std::string> editorial;
    json examples = json::array();
    json testcases = json::array();
    json starter_codes = json::object();
    json reference_solutions = json::object();

    json to_json() const {
        return {
            {"id", id},
            {"title", title},
            {"description", description},
            {"difficulty", difficulty},
            {"tags", tags},
            {"status", status},
            {"submissionCount", submission_count},
            {"constraints", constraints},
            {"hints", hints.has_value() ? json(*hints) : nullptr},
            {"editorial", editorial.has_value() ? json(*editorial) : nullptr},
            {"examples", examples},
            {"testcases", testcases},
            {"starterCodes", starter_codes},
            {"referenceSolutions", reference_solutions}
        };
    }
};

struct ProblemQueryOptions {
    int page = 1;
    int limit = 25;
    std::string search;
    std::string difficulty;
    std::string topic;
    std::string status;
};

struct PaginatedProblemsResult {
    std::vector<ProblemSummaryModel> problems;
    int total = 0;
    int page = 1;
    int limit = 25;
    int total_pages = 1;
    std::vector<std::string> all_tags;
};

// -------------------------------------------------------------
// CONTEST MODELS
// -------------------------------------------------------------
struct ContestQuestionItem {
    std::string id;
    std::string title;
    std::string difficulty;
    std::vector<std::string> tags;
    int points = 100;
    bool solved = false;

    json to_json() const {
        return {
            {"id", id},
            {"title", title},
            {"difficulty", difficulty},
            {"tags", tags},
            {"points", points},
            {"solved", solved}
        };
    }
};

struct ContestLeaderboardItem {
    int rank = 1;
    std::string user_id;
    std::string name;
    std::string avatar;
    int score = 0;
    int solved = 0;
    std::optional<std::string> last_accepted_at;
    bool is_you = false;

    json to_json() const {
        return {
            {"rank", rank},
            {"userId", user_id},
            {"name", name},
            {"avatar", avatar.empty() ? nullptr : json(avatar)},
            {"score", score},
            {"solved", solved},
            {"lastAcceptedAt", last_accepted_at.has_value() ? json(*last_accepted_at) : nullptr},
            {"isYou", is_you}
        };
    }
};

struct ContestRoomResponse {
    std::string code;
    std::optional<int> max_participants;
    int participant_count = 0;
    int question_count = 0;
    int time_limit_minutes = 0;
    std::vector<std::string> topics;
    std::string starts_at;
    std::string ends_at;
    bool is_ended = false;
    bool me_joined = false;
    json participants = json::array();
    std::vector<ContestQuestionItem> questions;
    std::vector<ContestLeaderboardItem> leaderboard;

    json to_json() const {
        json qs = json::array();
        for (const auto& q : questions) qs.push_back(q.to_json());

        json lb = json::array();
        for (const auto& l : leaderboard) lb.push_back(l.to_json());

        return {
            {"code", code},
            {"maxParticipants", max_participants.has_value() ? json(*max_participants) : nullptr},
            {"participantCount", participant_count},
            {"questionCount", question_count},
            {"timeLimitMinutes", time_limit_minutes},
            {"topics", topics},
            {"startsAt", starts_at},
            {"endsAt", ends_at},
            {"isEnded", is_ended},
            {"meJoined", me_joined},
            {"participants", participants},
            {"questions", qs},
            {"leaderboard", lb}
        };
    }
};

} // namespace campuslab

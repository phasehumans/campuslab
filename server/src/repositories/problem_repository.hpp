#pragma once

#include <string>
#include <vector>
#include <optional>
#include <sstream>
#include <unordered_set>
#include <unordered_map>
#include <pqxx/pqxx>
#include "../models/models.hpp"

namespace campuslab {

class ProblemRepository {
public:
    static std::vector<std::string> parse_pg_array(const std::string& raw) {
        std::vector<std::string> items;
        if (raw.size() >= 2 && raw.front() == '{' && raw.back() == '}') {
            std::istringstream ss(raw.substr(1, raw.size() - 2));
            std::string item;
            while (std::getline(ss, item, ',')) {
                if (!item.empty()) {
                    if (item.front() == '"' && item.back() == '"') {
                        item = item.substr(1, item.size() - 2);
                    }
                    items.push_back(item);
                }
            }
        }
        return items;
    }

    static std::unordered_set<std::string> get_solved_ids(pqxx::connection& conn, const std::string& user_id) {
        std::unordered_set<std::string> set;
        pqxx::work txn(conn);
        auto rows = txn.exec_params("SELECT \"problemId\" FROM \"ProblemSolved\" WHERE \"userId\" = $1", user_id);
        for (const auto& r : rows) {
            set.insert(r[0].as<std::string>());
        }
        return set;
    }

    static std::unordered_map<std::string, int> get_attempted_counts(pqxx::connection& conn, const std::string& user_id) {
        std::unordered_map<std::string, int> map;
        pqxx::work txn(conn);
        auto rows = txn.exec_params("SELECT \"problemId\", count(*) FROM \"Submission\" WHERE \"userId\" = $1 GROUP BY \"problemId\"", user_id);
        for (const auto& r : rows) {
            map[r[0].as<std::string>()] = r[1].as<int>();
        }
        return map;
    }

    static std::vector<ProblemSummaryModel> find_all_problems(pqxx::connection& conn, const std::string& user_id = "") {
        std::unordered_set<std::string> solved_ids;
        std::unordered_map<std::string, int> attempted_counts;
        if (!user_id.empty()) {
            solved_ids = get_solved_ids(conn, user_id);
            attempted_counts = get_attempted_counts(conn, user_id);
        }

        pqxx::work txn(conn);
        auto rows = txn.exec("SELECT id, title, difficulty, tags FROM \"Problem\" ORDER BY \"createdAt\" ASC");
        std::vector<ProblemSummaryModel> list;

        for (const auto& r : rows) {
            ProblemSummaryModel p;
            p.id = r["id"].as<std::string>();
            p.title = r["title"].as<std::string>();
            std::string diff_raw = r["difficulty"].as<std::string>();
            p.difficulty = diff_raw == "EASY" ? "Easy" : (diff_raw == "MEDIUM" ? "Medium" : "Hard");
            p.tags = parse_pg_array(r["tags"].as<std::string>());

            p.status = "Unsolved";
            if (solved_ids.count(p.id)) {
                p.status = "Solved";
            } else if (attempted_counts.count(p.id)) {
                p.status = "Attempted";
            }
            p.submission_count = attempted_counts[p.id];
            list.push_back(p);
        }
        return list;
    }

    static std::optional<ProblemDetailModel> find_problem_by_id(pqxx::connection& conn, const std::string& problem_id, const std::string& user_id = "") {
        pqxx::work txn(conn);
        auto rows = txn.exec_params(
            "SELECT id, title, description, difficulty, tags, constraints, hints, editorial, "
            "examples, testcases, codesnippets, \"referneceSolution\" AS reference_solution "
            "FROM \"Problem\" WHERE id = $1",
            problem_id
        );

        if (rows.empty()) return std::nullopt;

        const auto& r = rows[0];
        ProblemDetailModel p;
        p.id = r["id"].as<std::string>();
        p.title = r["title"].as<std::string>();
        p.description = r["description"].as<std::string>();
        std::string diff_raw = r["difficulty"].as<std::string>();
        p.difficulty = diff_raw == "EASY" ? "Easy" : (diff_raw == "MEDIUM" ? "Medium" : "Hard");
        p.tags = parse_pg_array(r["tags"].as<std::string>());
        p.constraints = r["constraints"].as<std::string>();

        if (!r["hints"].is_null()) p.hints = r["hints"].as<std::string>();
        if (!r["editorial"].is_null()) p.editorial = r["editorial"].as<std::string>();

        p.examples = json::parse(r["examples"].as<std::string>());
        p.testcases = json::parse(r["testcases"].as<std::string>());
        p.starter_codes = json::parse(r["codesnippets"].as<std::string>());
        p.reference_solutions = json::parse(r["reference_solution"].as<std::string>());

        p.status = "Unsolved";
        p.submission_count = 0;
        if (!user_id.empty()) {
            auto solved = txn.exec_params("SELECT 1 FROM \"ProblemSolved\" WHERE \"userId\" = $1 AND \"problemId\" = $2", user_id, problem_id);
            if (!solved.empty()) {
                p.status = "Solved";
            } else {
                auto attempted = txn.exec_params("SELECT count(*) FROM \"Submission\" WHERE \"userId\" = $1 AND \"problemId\" = $2", user_id, problem_id);
                if (!attempted.empty()) {
                    p.submission_count = attempted[0][0].as<int>();
                    if (p.submission_count > 0) p.status = "Attempted";
                }
            }
        }

        return p;
    }
};

} // namespace campuslab

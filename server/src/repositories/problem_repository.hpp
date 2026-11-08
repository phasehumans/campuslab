#pragma once

#include <string>
#include <vector>
#include <optional>
#include <sstream>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>
#include <cctype>
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

    static PaginatedProblemsResult find_problems_paginated(
        pqxx::connection& conn,
        const ProblemQueryOptions& opts,
        const std::string& user_id = ""
    ) {
        pqxx::work txn(conn);

        // 1. Fetch all distinct tags from Problem table
        std::vector<std::string> all_tags;
        auto tag_rows = txn.exec("SELECT DISTINCT unnest(tags) AS tag FROM \"Problem\" ORDER BY tag ASC");
        for (const auto& tr : tag_rows) {
            if (!tr["tag"].is_null()) {
                all_tags.push_back(tr["tag"].as<std::string>());
            }
        }

        // 2. Build WHERE condition
        std::string where_clause = "WHERE 1=1";

        if (!opts.difficulty.empty() && opts.difficulty != "All") {
            std::string diff_raw = "";
            if (opts.difficulty == "Easy" || opts.difficulty == "EASY") diff_raw = "EASY";
            else if (opts.difficulty == "Medium" || opts.difficulty == "MEDIUM") diff_raw = "MEDIUM";
            else if (opts.difficulty == "Hard" || opts.difficulty == "HARD") diff_raw = "HARD";

            if (!diff_raw.empty()) {
                where_clause += " AND difficulty = '" + txn.esc(diff_raw) + "'";
            }
        }

        if (!opts.topic.empty() && opts.topic != "All") {
            where_clause += " AND '" + txn.esc(opts.topic) + "' = ANY(tags)";
        }

        if (!opts.search.empty()) {
            std::string esc_search = txn.esc(opts.search);
            where_clause += " AND (title ILIKE '%" + esc_search + "%' OR id ILIKE '%" + esc_search + "%' OR array_to_string(tags, ' ') ILIKE '%" + esc_search + "%')";
        }

        if (!opts.status.empty() && opts.status != "All") {
            if (user_id.empty()) {
                if (opts.status == "Solved" || opts.status == "Attempted") {
                    where_clause += " AND 1=0";
                }
            } else {
                std::string esc_uid = txn.esc(user_id);
                if (opts.status == "Solved") {
                    where_clause += " AND id IN (SELECT \"problemId\" FROM \"ProblemSolved\" WHERE \"userId\" = '" + esc_uid + "')";
                } else if (opts.status == "Attempted") {
                    where_clause += " AND id IN (SELECT \"problemId\" FROM \"Submission\" WHERE \"userId\" = '" + esc_uid + "') AND id NOT IN (SELECT \"problemId\" FROM \"ProblemSolved\" WHERE \"userId\" = '" + esc_uid + "')";
                } else if (opts.status == "Unsolved") {
                    where_clause += " AND id NOT IN (SELECT \"problemId\" FROM \"ProblemSolved\" WHERE \"userId\" = '" + esc_uid + "') AND id NOT IN (SELECT \"problemId\" FROM \"Submission\" WHERE \"userId\" = '" + esc_uid + "')";
                }
            }
        }

        // 3. Count total matching
        auto count_row = txn.exec("SELECT count(*) FROM \"Problem\" " + where_clause);
        int total = count_row[0][0].as<int>();

        int page = std::max(1, opts.page);
        int limit = std::clamp(opts.limit, 1, 100);
        int offset = (page - 1) * limit;
        int total_pages = total == 0 ? 1 : ((total + limit - 1) / limit);

        // 4. Fetch the page of problems
        std::string query = "SELECT id, title, difficulty, tags FROM \"Problem\" " + where_clause +
                            " ORDER BY \"createdAt\" ASC, id ASC LIMIT " + std::to_string(limit) +
                            " OFFSET " + std::to_string(offset);
        auto rows = txn.exec(query);

        std::unordered_set<std::string> solved_ids;
        std::unordered_map<std::string, int> attempted_counts;
        if (!user_id.empty() && !rows.empty()) {
            auto solved_rows = txn.exec_params("SELECT \"problemId\" FROM \"ProblemSolved\" WHERE \"userId\" = $1", user_id);
            for (const auto& r : solved_rows) {
                solved_ids.insert(r[0].as<std::string>());
            }
            auto att_rows = txn.exec_params("SELECT \"problemId\", count(*) FROM \"Submission\" WHERE \"userId\" = $1 GROUP BY \"problemId\"", user_id);
            for (const auto& r : att_rows) {
                attempted_counts[r[0].as<std::string>()] = r[1].as<int>();
            }
        }

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

        PaginatedProblemsResult result;
        result.problems = std::move(list);
        result.total = total;
        result.page = page;
        result.limit = limit;
        result.total_pages = total_pages;
        result.all_tags = std::move(all_tags);
        return result;
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

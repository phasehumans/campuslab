#pragma once

#include <string>
#include <vector>
#include <optional>
#include "../db/connection_pool.hpp"
#include "../models/models.hpp"
#include "../repositories/problem_repository.hpp"

namespace campuslab {

class ProblemService {
public:
    explicit ProblemService(DbConnectionPool& db_pool) : db_pool_(db_pool) {}

    std::vector<ProblemSummaryModel> get_all_problems(const std::string& user_id = "") {
        auto conn_guard = db_pool_.acquire();
        return ProblemRepository::find_all_problems(conn_guard.get(), user_id);
    }

    std::optional<ProblemDetailModel> get_problem_by_id(const std::string& problem_id, const std::string& user_id = "") {
        auto conn_guard = db_pool_.acquire();
        return ProblemRepository::find_problem_by_id(conn_guard.get(), problem_id, user_id);
    }

private:
    DbConnectionPool& db_pool_;
};

} // namespace campuslab

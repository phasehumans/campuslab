#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <pqxx/pqxx>
#include "connection_pool.hpp"

namespace campuslab {

// Idempotent schema migrations applied at API startup.
// Production deploys never re-run database/*.sql against an existing volume,
// so anything the server depends on must be ensured here as well.
// Keep in sync with database/03_potd_duels.sql.
class Migrations {
public:
    static void run(DbConnectionPool& pool) {
        static const std::vector<std::string> statements = {
            // Problem of the Day
            "CREATE TABLE IF NOT EXISTS public.\"DailyProblem\" ("
            "  \"date\" date NOT NULL,"
            "  \"problemId\" text NOT NULL,"
            "  \"createdAt\" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,"
            "  CONSTRAINT \"DailyProblem_pkey\" PRIMARY KEY (\"date\"),"
            "  CONSTRAINT \"DailyProblem_problemId_fkey\" FOREIGN KEY (\"problemId\")"
            "    REFERENCES public.\"Problem\"(id) ON UPDATE CASCADE ON DELETE CASCADE"
            ")",
            "CREATE INDEX IF NOT EXISTS \"DailyProblem_problemId_idx\" ON public.\"DailyProblem\" USING btree (\"problemId\")",

            // Duels (ContestRoom with mode = 'DUEL')
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS mode text DEFAULT 'ROOM' NOT NULL",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS status text DEFAULT 'LIVE' NOT NULL",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS difficulty text",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS \"readyUserIds\" text[] DEFAULT '{}'::text[] NOT NULL",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS warnings jsonb DEFAULT '{}'::jsonb NOT NULL",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS \"winnerId\" text",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS \"finishReason\" text",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS \"finishedAt\" timestamp(3) without time zone",
            "ALTER TABLE public.\"ContestRoom\" ADD COLUMN IF NOT EXISTS \"rematchCode\" text",
            "CREATE INDEX IF NOT EXISTS \"ContestRoom_mode_status_idx\" ON public.\"ContestRoom\" USING btree (mode, status)",

            // Submission -> room tagging (duel winner = earliest received Accepted)
            "ALTER TABLE public.\"Submission\" ADD COLUMN IF NOT EXISTS \"contestCode\" text",
            "CREATE INDEX IF NOT EXISTS \"Submission_contestCode_idx\" ON public.\"Submission\" USING btree (\"contestCode\")",
            "CREATE INDEX IF NOT EXISTS \"Submission_problemId_createdAt_idx\" ON public.\"Submission\" USING btree (\"problemId\", \"createdAt\")"
        };

        auto guard = pool.acquire();
        pqxx::work txn(guard.get());
        // Serialize concurrent API replicas running migrations at the same time
        txn.exec("SELECT pg_advisory_xact_lock(727274)");
        for (const auto& sql : statements) {
            txn.exec(sql);
        }
        txn.commit();
        std::cout << "[API] Schema migrations applied (" << statements.size() << " statements)." << std::endl;
    }
};

} // namespace campuslab

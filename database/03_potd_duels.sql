-- Problem of the Day + 1v1 Duels
-- Idempotent: safe to re-apply on an existing database.

-- -------------------------------------------------------------
-- Problem of the Day: one row per IST calendar day
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."DailyProblem" (
    "date" date NOT NULL,
    "problemId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "DailyProblem_pkey" PRIMARY KEY ("date"),
    CONSTRAINT "DailyProblem_problemId_fkey" FOREIGN KEY ("problemId")
        REFERENCES public."Problem"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "DailyProblem_problemId_idx" ON public."DailyProblem" USING btree ("problemId");

-- -------------------------------------------------------------
-- Duels reuse ContestRoom with mode = 'DUEL'
-- status: WAITING -> LOBBY -> LIVE -> FINISHED | CANCELLED
-- finishReason: SOLVED | TIMEOUT | FORFEIT | DISQUALIFIED | EXPIRED | CANCELLED
-- -------------------------------------------------------------
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS mode text DEFAULT 'ROOM' NOT NULL;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS status text DEFAULT 'LIVE' NOT NULL;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS difficulty text;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS "readyUserIds" text[] DEFAULT '{}'::text[] NOT NULL;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS warnings jsonb DEFAULT '{}'::jsonb NOT NULL;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS "winnerId" text;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS "finishReason" text;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS "finishedAt" timestamp(3) without time zone;
ALTER TABLE public."ContestRoom" ADD COLUMN IF NOT EXISTS "rematchCode" text;

CREATE INDEX IF NOT EXISTS "ContestRoom_mode_status_idx" ON public."ContestRoom" USING btree (mode, status);

-- Tag submissions with the room they were made in, so duel winners can be
-- decided by the time the server received each submission.
ALTER TABLE public."Submission" ADD COLUMN IF NOT EXISTS "contestCode" text;

CREATE INDEX IF NOT EXISTS "Submission_contestCode_idx" ON public."Submission" USING btree ("contestCode");
CREATE INDEX IF NOT EXISTS "Submission_problemId_createdAt_idx" ON public."Submission" USING btree ("problemId", "createdAt");

-- Multi-language: submissions store a language id; older rows were all C++
UPDATE public."Submission" SET language = 'cpp' WHERE language = 'C++ (GCC 13)';

--
-- PostgreSQL database dump
--

\restrict GegXP1okh26f6zv5VToxaasyNZwDpUDzOMoUH62LWacY1QwMZVAxSqMapHXesOc

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13 (Debian 16.13-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Difficulty; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Difficulty" AS ENUM (
    'EASY',
    'MEDIUM',
    'HARD'
);


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ContestRoom; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ContestRoom" (
    code text NOT NULL,
    "hostUserId" text NOT NULL,
    "maxParticipants" integer,
    "questionCount" integer NOT NULL,
    "timeLimitMinutes" integer NOT NULL,
    topics text[],
    "problemIds" text[],
    "problemPoints" jsonb NOT NULL,
    participants jsonb NOT NULL,
    standings jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "startsAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endsAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Problem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Problem" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    difficulty public."Difficulty" NOT NULL,
    tags text[],
    "userId" text NOT NULL,
    examples jsonb NOT NULL,
    constraints text NOT NULL,
    hints text,
    editorial text,
    testcases jsonb NOT NULL,
    codesnippets jsonb NOT NULL,
    "referneceSolution" jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ProblemSolved; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProblemSolved" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "problemId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Submission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Submission" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "problemId" text NOT NULL,
    "sourceCode" jsonb NOT NULL,
    language text NOT NULL,
    "compilationOutput" text,
    status text NOT NULL,
    "memoryUsage" text,
    "timeTaken" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: TestCaseResult; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TestCaseResult" (
    id text NOT NULL,
    "submissionId" text NOT NULL,
    "testCase" text NOT NULL,
    passed boolean NOT NULL,
    stdout text,
    "expectedOutput" text,
    stderr text,
    "compileOutput" text,
    status text NOT NULL,
    "memoryUsage" text,
    "timeTaken" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    avatar text,
    provider text DEFAULT 'github',
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ContestRoom ContestRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContestRoom"
    ADD CONSTRAINT "ContestRoom_pkey" PRIMARY KEY (code);


--
-- Name: ProblemSolved ProblemSolved_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProblemSolved"
    ADD CONSTRAINT "ProblemSolved_pkey" PRIMARY KEY (id);


--
-- Name: Problem Problem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Problem"
    ADD CONSTRAINT "Problem_pkey" PRIMARY KEY (id);


--
-- Name: Submission Submission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_pkey" PRIMARY KEY (id);


--
-- Name: TestCaseResult TestCaseResult_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TestCaseResult"
    ADD CONSTRAINT "TestCaseResult_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: ProblemSolved_userId_problemId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ProblemSolved_userId_problemId_key" ON public."ProblemSolved" USING btree ("userId", "problemId");


--
-- Name: TestCaseResult_submissionId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TestCaseResult_submissionId_idx" ON public."TestCaseResult" USING btree ("submissionId");


--
-- Name: ProblemSolved ProblemSolved_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProblemSolved"
    ADD CONSTRAINT "ProblemSolved_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemSolved ProblemSolved_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProblemSolved"
    ADD CONSTRAINT "ProblemSolved_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Problem Problem_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Problem"
    ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submission Submission_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submission Submission_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TestCaseResult TestCaseResult_submissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TestCaseResult"
    ADD CONSTRAINT "TestCaseResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES public."Submission"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict GegXP1okh26f6zv5VToxaasyNZwDpUDzOMoUH62LWacY1QwMZVAxSqMapHXesOc


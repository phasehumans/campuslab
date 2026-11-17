--
-- Seed users. Problems come from database/04_sheet_* (generated from problems/).
--

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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, name, email, avatar, provider, role, "createdAt", "updatedAt") FROM stdin;
ecb230ac-1ec0-4d64-a463-03014d6e0948	Chetan Sonawane	chetan@campuslab.dev	\N	github	USER	2026-07-03 07:09:34.479	2026-07-03 07:09:34.479
ccf6772f-27d4-4001-bd5e-763e3c380ba0	Admin	admin@campuslab.dev	\N	github	ADMIN	2026-07-03 07:10:09.898	2026-07-03 07:10:09.898
d576d2e0-d0fa-4387-86f5-40bb62237cde	Integration Admin	int_admin@campuslab.dev	\N	github	ADMIN	2026-08-07 15:39:25.26	2026-08-07 15:39:25.26
7c2a55e6-0eb0-4cbc-846f-8443fe5896f1	Integration User	int_user@campuslab.dev	\N	github	USER	2026-08-07 15:39:25.273	2026-08-07 15:39:25.273
317b028f-d6fc-4fe6-bbae-b9a5e6d3d1e5	Campus Lab Seed	seed@campuslab.dev	\N	github	ADMIN	2026-07-03 06:55:01.006	2026-10-10 05:47:31.89
5cee3fe9-3ffa-4289-bb4a-500095d08164	Cpp Tester	cpptester@campuslab.dev	\N	github	USER	2026-11-07 10:29:39.918	2026-11-07 10:29:39.918
\.


--
-- PostgreSQL database dump complete
--


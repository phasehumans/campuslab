# Campus Lab - Architecture

This document provides a comprehensive technical breakdown of the **Campus Lab** platform - a full-stack competitive programming judge system built for academic environments.

---

## Table of Contents

- [System Overview](#system-overview)
- [High-Level Architecture](#high-level-architecture)
- [Technology Stack](#technology-stack)
- [Backend Architecture](#backend-architecture)
  - [Module Structure](#module-structure)
  - [API Routes](#api-routes)
  - [Authentication Flow](#authentication-flow)
  - [Code Execution Pipeline](#code-execution-pipeline)
  - [Submission Pipeline](#submission-pipeline)
  - [Contest System](#contest-system)
- [Database Schema](#database-schema)
- [Frontend Architecture](#frontend-architecture)
  - [Page Structure](#page-structure)
  - [Component Hierarchy](#component-hierarchy)
  - [State Management](#state-management)
- [Infrastructure & Deployment](#infrastructure--deployment)
- [Data Flow Diagrams](#data-flow-diagrams)

---

## System Overview

Campus Lab is a **LeetCode-style competitive programming platform** designed for college lab environments. It allows students to:

- Browse and solve DSA problems across 15+ topics
- Write and execute code in **C++, Python, Java, and Rust**
- Get instant feedback via an integrated **Judge0** code execution engine
- Compete in real-time **contest rooms** with leaderboards
- Track their progress through a **profile dashboard**

---

## High-Level Architecture

```mermaid
graph TB
    subgraph Client["Frontend - React + Vite"]
        UI["React SPA<br/>Port 4000"]
        CM["CodeMirror Editor"]
        RR["React Router"]
        TQ["TanStack Query"]
    end

    subgraph Server["Backend - Express + TypeScript"]
        API["REST API<br/>Port 3000"]
        AUTH["Auth Module"]
        PROB["Problems Module"]
        EXEC["Execution Module"]
        SUB["Submission Module"]
        CONT["Contest Module"]
        PROF["Profile Module"]
    end

    subgraph Database["PostgreSQL"]
        PG["PostgreSQL 16<br/>Port 5433"]
        PRISMA["Prisma ORM"]
    end

    subgraph Judge["Judge0 CE"]
        J0["Judge0 Server<br/>Port 2358"]
        REDIS["Redis"]
        WORKERS["Workers"]
        J0DB["Judge0 PostgreSQL"]
    end

    UI -->|HTTP/REST| API
    CM --> UI
    RR --> UI
    TQ --> UI

    API --> AUTH
    API --> PROB
    API --> EXEC
    API --> SUB
    API --> CONT
    API --> PROF

    AUTH --> PRISMA
    PROB --> PRISMA
    SUB --> PRISMA
    CONT --> PRISMA
    PROF --> PRISMA
    PRISMA --> PG

    EXEC -->|Batch Submit| J0
    SUB -->|Batch Submit| J0
    J0 --> REDIS
    J0 --> WORKERS
    J0 --> J0DB

    style Client fill:#1a1a2e,stroke:#e94560,color:#fff
    style Server fill:#16213e,stroke:#0f3460,color:#fff
    style Database fill:#0f3460,stroke:#533483,color:#fff
    style Judge fill:#533483,stroke:#e94560,color:#fff
```

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite 6, TypeScript | SPA framework & build tool |
| **Styling** | TailwindCSS 4, Motion (Framer) | UI design & animations |
| **Code Editor** | CodeMirror 6 | In-browser code editing with syntax highlighting |
| **State** | TanStack React Query | Server-state caching & synchronization |
| **Routing** | React Router v7 | Client-side navigation |
| **Backend** | Express 5, TypeScript, tsx | REST API server |
| **ORM** | Prisma 7 (with `@prisma/adapter-pg`) | Type-safe database access |
| **Database** | PostgreSQL 16 | Primary relational data store |
| **Auth** | JWT (httpOnly cookies), bcrypt | Authentication & session management |
| **Validation** | Zod 4 | Request body schema validation |
| **Code Judge** | Judge0 CE v1.13.1 (self-hosted) | Sandboxed code compilation & execution |
| **Containerization** | Docker, Docker Compose | Service orchestration |

---

## Backend Architecture

### Module Structure

The backend follows a **modular architecture** where each domain feature is isolated into its own module with a consistent file structure:

```mermaid
graph LR
    subgraph Module["Each Module"]
        ROUTE["route.ts<br/>Express Router"]
        CTRL["controller.ts<br/>Request Handlers"]
        SVC["service.ts<br/>Business Logic"]
        SCHEMA["schema.ts<br/>Zod Validation"]
        UTILS["utils.ts<br/>Helpers"]
    end

    ROUTE --> CTRL
    CTRL --> SVC
    CTRL --> SCHEMA
    SVC --> UTILS

    style Module fill:#16213e,stroke:#0f3460,color:#fff
```

Each module (auth, problems, execution, submission, contest, profile) follows this convention with its own route, controller, service, schema, and utils files. Shared utilities like the Judge0 API client, code runner, and bootstrap logic reside in `server/src/shared/`.

### API Routes

```mermaid
graph LR
    subgraph Routes["REST API — /api/v1"]
        A1["/auth/signup"] --> POST1["POST"]
        A2["/auth/login"] --> POST2["POST"]
        A3["/auth/logout"] --> POST3["POST"]
        A4["/auth/me"] --> GET1["GET"]

        P1["/problems"] --> GET2["GET"]
        P2["/problems/:id"] --> GET3["GET"]
        P3["/problems/create"] --> POST4["POST"]

        E1["/code-execution/run"] --> POST5["POST"]

        S1["/submission/submit"] --> POST6["POST"]
        S2["/submission/:id"] --> GET4["GET"]

        C1["/contests/rooms"] --> POST7["POST"]
        C2["/contests/rooms/:code"] --> GET5["GET"]
        C3["/contests/rooms/:code/join"] --> POST8["POST"]

        PR1["/profile/me"] --> GET6["GET"]
    end

    style Routes fill:#1a1a2e,stroke:#e94560,color:#fff
```

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/auth/signup` | POST | No | Register a new user |
| `/auth/login` | POST | No | Login and receive JWT cookie |
| `/auth/logout` | POST | Yes | Clear session cookie |
| `/auth/me` | GET | Yes | Get current authenticated user |
| `/problems` | GET | Yes | List all problems (summary) |
| `/problems/:id` | GET | Yes | Get full problem details |
| `/problems/create` | POST | Yes (Admin) | Create a new problem |
| `/code-execution/run` | POST | Yes | Run code against custom test cases |
| `/submission/submit` | POST | Yes | Submit code for judging |
| `/submission/:id` | GET | Yes | Get submission details |
| `/contests/rooms` | POST | Yes | Create a contest room |
| `/contests/rooms/:code` | GET | Yes | Get contest room details |
| `/contests/rooms/:code/join` | POST | Yes | Join an existing contest |
| `/profile/me` | GET | Yes | Get user profile & stats |

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant S as Server
    participant DB as PostgreSQL

    U->>S: POST /auth/signup {name, prn, password}
    S->>S: Hash password (bcrypt, 10 rounds)
    S->>DB: INSERT User
    DB-->>S: User record
    S->>S: Sign JWT {userId, role}
    S-->>U: Set-Cookie: token=<JWT> (httpOnly, secure)

    Note over U,S: Subsequent Requests

    U->>S: GET /problems (Cookie: token=<JWT>)
    S->>S: Verify JWT from cookie
    S->>DB: Query problems
    DB-->>S: Problem list
    S-->>U: 200 {problems: [...]}
```

### Code Execution Pipeline

```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant J as Judge0

    U->>S: POST /code-execution/run<br/>{sourceCode, language, testcases}

    S->>S: Resolve Judge0 language ID
    S->>J: POST /submissions/batch<br/>[{source_code, language_id, stdin, expected_output}]
    J-->>S: [{token: "abc"}, {token: "def"}]

    loop Poll until all done
        S->>J: GET /submissions/batch?tokens=abc,def
        J-->>S: [{status: {id: 3}, stdout: "4"}, ...]
    end

    S->>S: Compare stdout vs expected_output
    S-->>U: {execution: {results: [{passed, stdout, expected}]}}
```

### Submission Pipeline

```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant J as Judge0
    participant DB as PostgreSQL

    U->>S: POST /submission/submit<br/>{problemId, sourceCode, language}

    S->>DB: Fetch problem testcases (10)
    DB-->>S: testcases[]

    S->>J: POST /submissions/batch (10 submissions)
    J-->>S: tokens[]

    loop Poll results
        S->>J: GET /submissions/batch?tokens=...
        J-->>S: results[]
    end

    S->>S: Evaluate: all passed?
    S->>DB: INSERT Submission + TestCaseResults
    S->>DB: UPSERT ProblemSolved (if all passed)
    S-->>U: {execution: {results, overallStatus}}
```

### Contest System

```mermaid
stateDiagram-v2
    [*] --> Created: Host creates room
    Created --> Active: Participants join
    Active --> Active: Participants solve & submit
    Active --> Ended: Time limit reached
    Ended --> [*]: Final standings

    state Active {
        [*] --> Solving
        Solving --> Submitted: Submit solution
        Submitted --> Accepted: All tests pass
        Submitted --> Rejected: Some tests fail
        Accepted --> Solving: Next problem
        Rejected --> Solving: Retry
    }
```

A contest room stores:
- **Room code** (unique 6-char identifier)
- **Problem IDs** (randomly selected from chosen topics)
- **Participants** (array of `{userId, joinedAt}`)
- **Standings** (per-user score, solved problem IDs, last accepted timestamp)
- **Time limit** and **start/end timestamps**

---

## Database Schema

```mermaid
erDiagram
    User {
        uuid id PK
        string name
        string prn UK
        enum role "ADMIN | USER"
        string password
        datetime createdAt
        datetime updatedAt
    }

    Problem {
        uuid id PK
        string title
        string description
        enum difficulty "EASY | MEDIUM | HARD"
        string[] tags
        uuid userId FK
        json examples
        string constraints
        string hints
        string editorial
        json testcases
        json codesnippets
        json referneceSolution
        datetime createdAt
        datetime updatedAt
    }

    Submission {
        uuid id PK
        uuid userId FK
        uuid problemId FK
        json sourceCode
        string language
        string stdin
        string stdout
        string stderr
        string compilationOutput
        string status
        string memoryUsage
        string timeTaken
        datetime createdAt
    }

    TestCaseResult {
        uuid id PK
        uuid submissionId FK
        string testCase
        boolean passed
        string stdout
        string expectedOutput
        string stderr
        string compileOutput
        string status
        string memoryUsage
        string timeTaken
    }

    ProblemSolved {
        uuid id PK
        uuid userId FK
        uuid problemId FK
        datetime createdAt
    }

    ContestRoom {
        string code PK
        string hostUserId
        int maxParticipants
        int questionCount
        int timeLimitMinutes
        string[] topics
        string[] problemIds
        json problemPoints
        json participants
        json standings
        datetime createdAt
        datetime startsAt
        datetime endsAt
    }

    User ||--o{ Problem : "creates"
    User ||--o{ Submission : "submits"
    User ||--o{ ProblemSolved : "solves"
    Problem ||--o{ Submission : "has"
    Problem ||--o{ ProblemSolved : "solved by"
    Submission ||--o{ TestCaseResult : "contains"
```

### Key Design Decisions

- **JSON fields** (`examples`, `testcases`, `codesnippets`, `referneceSolution`) store structured data that doesn't need relational querying — avoids excessive normalization
- **ProblemSolved** is a denormalized tracking table with a `@@unique([userId, problemId])` constraint for fast profile lookups
- **ContestRoom** uses JSON arrays/objects for participants and standings to support real-time contest state without complex joins

---

## Frontend Architecture

### Page Structure

```mermaid
graph TD
    subgraph App["React Application"]
        LP["/ — LandingPage"]
        PS["/practice — ProblemSet"]
        SS["/problem/:id — SolveScreen"]
        CT["/contest — Contest"]
        CR["/contest/:roomId — ContestRoom"]
        PR["/profile — Profile"]
    end

    LP --> PS
    PS --> SS
    LP --> CT
    CT --> CR
    LP --> PR

    subgraph Layout["Shared Layout (Navbar)"]
        PS
        CT
        CR
        PR
    end

    style App fill:#1a1a2e,stroke:#e94560,color:#fff
    style Layout fill:#16213e,stroke:#0f3460,color:#fff
```

### State Management

```mermaid
graph LR
    subgraph Global["Global State"]
        AC["AuthContext<br/>(React Context)"]
    end

    subgraph ServerState["Server State"]
        TQ["TanStack Query<br/>(Cache + Sync)"]
    end

    subgraph Local["Local State"]
        RS["React useState<br/>(Component-level)"]
    end

    AC -->|user, login, logout| Pages
    TQ -->|problems, submissions, profile| Pages
    RS -->|editor code, filters, modals| Pages

    style Global fill:#533483,stroke:#e94560,color:#fff
    style ServerState fill:#0f3460,stroke:#533483,color:#fff
    style Local fill:#16213e,stroke:#0f3460,color:#fff
```

- **AuthContext**: Global authentication state (current user, login/logout functions)
- **TanStack Query**: Caches API responses for problems, submissions, profiles, and contests
- **Local State**: Component-scoped state for editor content, UI interactions, and form inputs

---

## Infrastructure & Deployment

```mermaid
graph TB
    subgraph WSL["WSL 2 - Ubuntu"]
        subgraph Docker1["Docker - Campus Lab"]
            PG["PostgreSQL 16<br/>:5433"]
        end

        subgraph Docker2["Docker - Judge0 v1.13.1"]
            J0S["Judge0 Server<br/>:2358"]
            J0R["Redis"]
            J0W["Workers"]
            J0D["Judge0 DB"]
        end

        subgraph Dev["Development Servers"]
            BE["Backend (tsx watch)<br/>:3000"]
            FE["Frontend (Vite)<br/>:4000"]
        end
    end

    FE -->|REST API| BE
    BE -->|Prisma| PG
    BE -->|HTTP| J0S
    J0S --> J0R
    J0S --> J0W
    J0S --> J0D

    style WSL fill:#0d1117,stroke:#30363d,color:#fff
    style Docker1 fill:#1a1a2e,stroke:#e94560,color:#fff
    style Docker2 fill:#16213e,stroke:#0f3460,color:#fff
    style Dev fill:#533483,stroke:#e94560,color:#fff
```

### Ports Summary

| Service | Port | Description |
|---|---|---|
| Frontend (Vite) | `4000` | React development server |
| Backend (Express) | `3000` | REST API server |
| PostgreSQL | `5433` | Campus Lab database |
| Judge0 Server | `2358` | Code execution API |

---

## Data Flow Diagrams

### Complete User Journey: Solving a Problem

```mermaid
sequenceDiagram
    actor S as Student
    participant FE as Frontend
    participant BE as Backend
    participant DB as PostgreSQL
    participant J0 as Judge0

    S->>FE: Open /practice
    FE->>BE: GET /problems
    BE->>DB: SELECT problems
    DB-->>BE: Problem summaries
    BE-->>FE: {problems: [...]}
    FE-->>S: Render problem list

    S->>FE: Click problem
    FE->>BE: GET /problems/:id
    BE->>DB: SELECT problem with details
    DB-->>BE: Full problem data
    BE-->>FE: {problem: {description, examples, codesnippets}}
    FE-->>S: Render editor + problem

    S->>FE: Write code, click "Run"
    FE->>BE: POST /code-execution/run<br/>{sourceCode, language, examples}
    BE->>J0: Batch submit (2 test cases)
    J0-->>BE: Results
    BE-->>FE: {execution: {results}}
    FE-->>S: Show pass/fail for examples

    S->>FE: Click "Submit"
    FE->>BE: POST /submission/submit<br/>{problemId, sourceCode, language}
    BE->>DB: Fetch 10 testcases
    BE->>J0: Batch submit (10 test cases)
    J0-->>BE: Results
    BE->>DB: Store submission + results
    BE->>DB: Mark ProblemSolved (if all pass)
    BE-->>FE: {execution: {results, status}}
    FE-->>S: Show detailed verdict
```

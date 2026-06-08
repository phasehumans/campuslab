# Campus Lab

**Campus Lab** is competitive programming platform purpose-built for RCPIT (AIML branch). It provides a complete environment where students can practice Data Structures & Algorithms problems, write and execute code in multiple languages, and compete with peers in real-time contests — all within a self-hosted, campus-friendly deployment.

The platform ships with **200+ curated DSA problems** spanning 15 topic categories (Arrays, Trees, Graphs, Dynamic Programming, and more), each with working solutions in **C++, Python, Java, and Rust**.


![Campus Lab Demo](web/public/demo.gif)


## Features

- **200+ DSA Problems** -- Curated problems across 15 topics (Easy, Medium, Hard) sourced from competitive programming classics
- **Multi-Language Code Editor** -- In-browser CodeMirror editor with syntax highlighting for C++, Python, Java, and Rust
- **Instant Code Execution** -- Run code against sample test cases with real-time feedback via Judge0 CE
- **Full Submission Judging** -- Submit code against 10 hidden test cases per problem with pass/fail verdicts
- **Live Contest Rooms** -- Create or join real-time contest rooms with customizable topics, time limits, and live leaderboards
- **Profile Dashboard** -- Track solved problems, submission history, and progress across difficulty levels
- **Secure Authentication** -- JWT-based auth with httpOnly cookies and bcrypt password hashing
- **Problem Filtering** -- Filter problems by difficulty (Easy/Medium/Hard) and search by title
- **Rich Problem Statements** -- Detailed descriptions, constraints, hints, editorials, and worked examples
- **Dockerized Infrastructure** -- One-command setup for PostgreSQL and Judge0 via Docker Compose
- **Auto-Seeding** -- Database automatically seeds with all problems on first server startup


## Architecture Overview

```mermaid
graph LR
    subgraph Client["Frontend"]
        React["React + Vite<br/>:4000"]
    end

    subgraph Server["Backend"]
        Express["Express API<br/>:3000"]
    end

    subgraph Data["Data Layer"]
        PG["PostgreSQL<br/>:5433"]
        J0["Judge0 CE<br/>:2358"]
    end

    React -->|REST API| Express
    Express -->|Prisma ORM| PG
    Express -->|Batch Submit| J0

    style Client fill:#1a1a2e,stroke:#e94560,color:#fff
    style Server fill:#16213e,stroke:#0f3460,color:#fff
    style Data fill:#533483,stroke:#e94560,color:#fff
```

> **For detailed architecture documentation with comprehensive diagrams, see [ARCHITECTURE.md](ARCHITECTURE.md)**


## Technologies Used

| Category | Technologies |
|---|---|
| **Frontend** | React 19, Vite 6, TypeScript, TailwindCSS 4, CodeMirror 6, TanStack Query, React Router v7, Motion (Framer), Recharts |
| **Backend** | Express 5, TypeScript, Prisma 7, Zod 4, JWT, bcrypt |
| **Database** | PostgreSQL 16 |
| **Code Judge** | Judge0 CE v1.13.1 (self-hosted) |
| **Infrastructure** | Docker, Docker Compose, WSL 2 |
| **Languages Supported** | C++ (GCC), Python 3, Java, Rust |


## Project Phases

### Phase 1 - Foundation & Authentication
- Project scaffolding (Express + Vite + TypeScript)
- PostgreSQL database setup with Prisma ORM
- User registration and login system (JWT + bcrypt)
- Auth middleware and session management

### Phase 2 - Problem Management & Code Execution
- Problem schema design (description, examples, testcases, solutions)
- Judge0 CE integration for sandboxed code execution
- "Run" feature — execute code against sample test cases (2 cases)
- "Submit" feature — judge code against hidden test cases (10 cases)
- Multi-language support: C++, Python, Java, Rust

### Phase 3 - Frontend & User Experience
- Landing page with hero section and feature showcase
- Problem set page with difficulty filters and search
- Solve screen with split-panel layout (problem + code editor)
- CodeMirror integration with language-specific syntax highlighting
- Real-time execution results with pass/fail indicators

### Phase 4 - Contests & Profiles
- Contest room creation with topic selection and time limits
- Room code-based join system for multiplayer contests
- Live leaderboard with score tracking
- Profile dashboard with solve statistics and submission history

### Phase 5 - Data Seeding & Polish
- Curated 200+ DSA problems across 15 topic categories
- Working reference solutions in 4 languages per problem
- Auto-seeding on first startup via bootstrap script
- Rate limiting, error handling, and security hardening


## Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **WSL 2** (Windows) or Linux | Ubuntu 22.04+ |
| **Docker** + Docker Compose | v20+ |
| **Node.js** | v20+ |
| **Bun** (or npm) | Latest |

### 1. Clone the Repository

```bash
git clone https://github.com/phasehumans/campuslab.git
cd campuslab
```

### 2. Setup Judge0 CE

```bash
# Download and extract Judge0
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip

# Configure Judge0
cd judge0-v1.13.1
nano judge0.conf  # Set Redis and Postgres passwords

# Start Judge0
docker compose up -d db redis
sleep 10
docker compose up -d
sleep 5

# Verify Judge0 is running
curl http://localhost:2358/languages
```

### 3. Setup Campus Lab

```bash
cd /path/to/campuslab

# Start PostgreSQL
docker compose up -d

# Install dependencies
cd server && bun install && cd ..
cd web && bun install && cd ..
```

### 4. Configure Environment

Create `server/.env`:

```env
PORT=3000
JWT_SECRET=your-secret-key-here
JUDGE_API_URL=http://localhost:2358
DATABASE_URL=postgresql://myuser:mypassword@localhost:5433/campus_lab
```

### 5. Setup Database

```bash
cd server

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed problems (optional — auto-seeds on first startup)
npx tsx prisma/seed.ts
```

### 6. Start the Application

```bash
# Option A: Use the start script
./start.sh

# Option B: Start manually
# Terminal 1 -- Backend
cd server && bun run dev

# Terminal 2 -- Frontend
cd web && bun run dev
```

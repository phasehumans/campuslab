#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=========================================================="
echo "          Campus Lab - Automated Test Pipeline            "
echo "=========================================================="

cd "$ROOT_DIR"

SERVER_INCLUDES="-O2 -std=c++17 -I common -I common/third_party -I server/src"
SERVER_LIBS="-lcrypt -lssl -lcrypto -lpqxx -lpq -lhiredis -lcurl -lpthread"

JUDGE_INCLUDES="-O2 -std=c++17 -I common -I common/third_party -I judge/src"
JUDGE_LIBS="-lpqxx -lpq -lhiredis -pthread"

# -----------------------------------------------------------------------------
# Part 1: Core System & Architecture Deep Unit Tests
# -----------------------------------------------------------------------------
echo -e "\n\033[1;34m[1/14] Running Core System Unit Tests (test_unit.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/unit/test_unit.cpp $SERVER_LIBS -o /tmp/test_unit && /tmp/test_unit"

echo -e "\n\033[1;34m[2/14] Running Server Deep Architecture Tests (test_server_deep.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/unit/test_server_deep.cpp $SERVER_LIBS -o /tmp/test_server_deep && /tmp/test_server_deep"

echo -e "\n\033[1;34m[3/14] Running Judge Deep Execution Tests (test_judge_deep.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ $JUDGE_INCLUDES tests/unit/test_judge_deep.cpp $JUDGE_LIBS -o /tmp/test_judge_deep && /tmp/test_judge_deep"

# -----------------------------------------------------------------------------
# Part 2: Dedicated Server Feature & Route Test Suites
# -----------------------------------------------------------------------------
echo -e "\n\033[1;34m[4/14] Running Server Auth Routes Tests (test_auth_routes.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/server/test_auth_routes.cpp $SERVER_LIBS -o /tmp/test_auth_routes && /tmp/test_auth_routes"

echo -e "\n\033[1;34m[5/14] Running Server Problem Routes Tests (test_problem_routes.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/server/test_problem_routes.cpp $SERVER_LIBS -o /tmp/test_problem_routes && /tmp/test_problem_routes"

echo -e "\n\033[1;34m[6/14] Running Server Contest Routes Tests (test_contest_routes.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/server/test_contest_routes.cpp $SERVER_LIBS -o /tmp/test_contest_routes && /tmp/test_contest_routes"

echo -e "\n\033[1;34m[7/14] Running Server Execution & Submission Routes Tests (test_execution_routes.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/server/test_execution_routes.cpp $SERVER_LIBS -o /tmp/test_execution_routes && /tmp/test_execution_routes"

echo -e "\n\033[1;34m[8/14] Running Server Profile Routes Tests (test_profile_routes.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/server/test_profile_routes.cpp $SERVER_LIBS -o /tmp/test_profile_routes && /tmp/test_profile_routes"

echo -e "\n\033[1;34m[9/14] Running Server Middleware & Connection Pool Tests (test_middleware_and_pool.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ $SERVER_INCLUDES tests/server/test_middleware_and_pool.cpp $SERVER_LIBS -o /tmp/test_middleware_and_pool && /tmp/test_middleware_and_pool"

# -----------------------------------------------------------------------------
# Part 3: Dedicated Judge Feature & Containment Test Suites
# -----------------------------------------------------------------------------
echo -e "\n\033[1;34m[10/14] Running Judge Compiler Tests (test_judge_compiler.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ $JUDGE_INCLUDES tests/judge/test_judge_compiler.cpp $JUDGE_LIBS -o /tmp/test_judge_compiler && /tmp/test_judge_compiler"

echo -e "\n\033[1;34m[11/14] Running Judge Sandbox & Containment Tests (test_judge_sandbox.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ $JUDGE_INCLUDES tests/judge/test_judge_sandbox.cpp $JUDGE_LIBS -o /tmp/test_judge_sandbox && /tmp/test_judge_sandbox"

echo -e "\n\033[1;34m[12/14] Running Judge Redis Queue Tests (test_judge_queue.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ $JUDGE_INCLUDES tests/judge/test_judge_queue.cpp $JUDGE_LIBS -o /tmp/test_judge_queue && /tmp/test_judge_queue"

echo -e "\n\033[1;34m[13/14] Running Judge Database Storage Tests (test_judge_storage.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ $JUDGE_INCLUDES tests/judge/test_judge_storage.cpp $JUDGE_LIBS -o /tmp/test_judge_storage && /tmp/test_judge_storage"

echo -e "\n\033[1;34m[14/14] Running Judge Worker Engine Tests (test_judge_worker.cpp)...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ $JUDGE_INCLUDES tests/judge/test_judge_worker.cpp $JUDGE_LIBS -o /tmp/test_judge_worker && /tmp/test_judge_worker"

echo -e "\n\033[1;32m=========================================================="
echo "      ALL 14 C++ FEATURE & ROUTE TEST SUITES PASSED!       "
echo -e "==========================================================\033[0m"

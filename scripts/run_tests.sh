#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=========================================================="
echo "          Campus Lab - Automated Test Pipeline            "
echo "=========================================================="

cd "$ROOT_DIR"

# 1. Run General C++ Unit Tests in Container
echo -e "\n\033[1;34m[1/3] Running General C++ Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I server/src tests/unit/test_unit.cpp -lcrypt -lssl -lcrypto -lpqxx -lpq -o /tmp/test_unit && /tmp/test_unit"

# 2. Run Deep Server Database, Repositories & Pool Unit Tests
echo -e "\n\033[1;34m[2/3] Running Server DB & Pool Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I server/src tests/unit/test_server_deep.cpp -lcrypt -lssl -lcrypto -lpqxx -lpq -lhiredis -lcurl -lpthread -o /tmp/test_server_deep && /tmp/test_server_deep"

# 3. Run Deep Judge Sandbox, Compiler, Signals & Queue Unit Tests in Privileged Worker
echo -e "\n\033[1;34m[3/3] Running Judge Sandbox & Compiler Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I judge/src tests/unit/test_judge_deep.cpp -lpqxx -lpq -lhiredis -pthread -o /tmp/test_judge_deep && /tmp/test_judge_deep"

echo -e "\n\033[1;32m=========================================================="
echo "             ALL C++ UNIT TESTS PASSED!                   "
echo -e "==========================================================\033[0m"

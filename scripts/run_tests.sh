#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=========================================================="
echo "          Campus Lab - Automated Test Pipeline            "
echo "=========================================================="

cd "$ROOT_DIR"

# 1. Run General C++ Unit Tests in Container
echo -e "\n\033[1;34m[1/4] Running General C++ Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I server/src tests/unit/test_unit.cpp -lcrypt -lssl -lcrypto -lpqxx -lpq -o /tmp/test_unit && /tmp/test_unit"

# 2. Run Deep Server Database, Repositories & Pool Unit Tests
echo -e "\n\033[1;34m[2/4] Running Server DB & Pool Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I server/src tests/unit/test_server_deep.cpp -lcrypt -lssl -lcrypto -lpqxx -lpq -lpthread -o /tmp/test_server_deep && /tmp/test_server_deep"

# 3. Run Deep Judge Sandbox, Compiler, Signals & Queue Unit Tests in Privileged Worker
echo -e "\n\033[1;34m[3/4] Running Judge Sandbox & Compiler Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace judge bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I judge/src tests/unit/test_judge_deep.cpp -lpqxx -lpq -lhiredis -pthread -o /tmp/test_judge_deep && /tmp/test_judge_deep"

# 4. Run Python Master Integration Test Suite against live REST API & Isolate Worker
echo -e "\n\033[1;34m[4/4] Running Live Master REST API Integration Test Suite...\033[0m"
python3 tests/integration/test_suite.py

echo -e "\n\033[1;32m=========================================================="
echo "     ALL UNIT & INTEGRATION TESTS PASSED CLEANLY!         "
echo -e "==========================================================\033[0m"

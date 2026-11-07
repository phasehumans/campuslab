#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=========================================================="
echo "          Campus Lab - Automated Test Pipeline            "
echo "=========================================================="

cd "$ROOT_DIR"

# 1. Run C++ Unit Tests in Container
echo -e "\n\033[1;34m[1/2] Running C++ Unit Tests...\033[0m"
docker compose run --rm -v "$ROOT_DIR:/workspace" -w /workspace api bash -c \
    "g++ -O2 -std=c++17 -I common -I common/third_party -I server/src tests/unit/test_unit.cpp -lcrypt -lssl -lcrypto -lpqxx -lpq -o tests/unit/test_unit && ./tests/unit/test_unit"

# 2. Run Python Integration Test Suite against live REST API & Isolate Worker
echo -e "\n\033[1;34m[2/2] Running Integration Test Suite...\033[0m"
python3 tests/integration/test_suite.py

echo -e "\n\033[1;32m=========================================================="
echo "     ALL UNIT & INTEGRATION TESTS PASSED CLEANLY!         "
echo -e "==========================================================\033[0m"

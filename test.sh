#!/bin/bash
set -e

echo "============================================="
echo "Running All Tests (Server and Web)"
echo "============================================="

echo "[1/4] Running package test scripts (Bun test workspaces)"
bun run test

echo "[2/4] Running root-level Smoke Tests"
bun test test/smoke/


echo "============================================="
echo "All automated tests completed successfully!"
echo "To run Load Tests, ensure k6 is installed and run:"
echo "k6 run test/load/load.k6.js"
echo "============================================="

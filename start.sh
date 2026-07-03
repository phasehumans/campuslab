#!/bin/bash

# Campus Lab -- Start Script
# Starts all services: PostgreSQL, Judge0, Backend, Frontend

set -e

CAMPUSLAB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JUDGE0_DIR="${JUDGE0_DIR:-/home/chaitanya/code/judge0-v1.13.1}"

echo ""
echo "Campus Lab -- Starting all services"
echo ""

# Step 1: Start Campus Lab PostgreSQL
echo "[1/4] Starting Campus Lab PostgreSQL..."
cd "$CAMPUSLAB_DIR"
docker compose up -d
echo "  Done -- PostgreSQL is running on port 5433"

# Step 2: Start Judge0 CE
echo "[2/4] Starting Judge0 CE..."
if [ -d "$JUDGE0_DIR" ]; then
    cd "$JUDGE0_DIR"
    docker compose up -d
    echo "  Done -- Judge0 is running on port 2358"
else
    echo "  Skipped -- Judge0 directory not found at: $JUDGE0_DIR"
    echo "  Set JUDGE0_DIR environment variable to the correct path"
fi

# Step 3: Start Backend Server
echo "[3/4] Starting Backend Server..."
cd "$CAMPUSLAB_DIR/server"
bun run dev &
BACKEND_PID=$!
echo "  Done -- Backend starting on http://localhost:3000 (PID: $BACKEND_PID)"

sleep 3

# Step 4: Start Frontend Dev Server
echo "[4/4] Starting Frontend Dev Server..."
cd "$CAMPUSLAB_DIR/web"
bun run dev &
FRONTEND_PID=$!
echo "  Done -- Frontend starting on http://localhost:4000 (PID: $FRONTEND_PID)"

echo ""
echo "All services started:"
echo "  Frontend   -> http://localhost:4000"
echo "  Backend    -> http://localhost:3000"
echo "  PostgreSQL -> localhost:5433"
echo "  Judge0     -> http://localhost:2358"
echo ""
echo "Run ./stop.sh to stop all services"
echo ""

# Keep script running (wait for background processes)
wait

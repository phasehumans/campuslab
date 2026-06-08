#!/bin/bash

# Campus Lab -- Stop Script
# Stops all services: Frontend, Backend, Judge0, PostgreSQL

set -e

CAMPUSLAB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JUDGE0_DIR="${JUDGE0_DIR:-/mnt/c/Code/judge0-v1.13.1}"

echo ""
echo "Campus Lab -- Stopping all services"
echo ""

# Step 1: Stop Frontend Dev Server (Vite)
echo "[1/4] Stopping Frontend Dev Server..."
pkill -f "vite --port=4000" 2>/dev/null && \
    echo "  Done -- Frontend stopped" || \
    echo "  Skipped -- Frontend was not running"

# Step 2: Stop Backend Server (tsx)
echo "[2/4] Stopping Backend Server..."
pkill -f "tsx watch src/index.ts" 2>/dev/null && \
    echo "  Done -- Backend stopped" || \
    echo "  Skipped -- Backend was not running"

lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true

# Step 3: Stop Judge0 CE containers
echo "[3/4] Stopping Judge0 CE..."
if [ -d "$JUDGE0_DIR" ]; then
    cd "$JUDGE0_DIR"
    docker compose down
    echo "  Done -- Judge0 containers stopped"
else
    echo "  Skipped -- Judge0 directory not found at: $JUDGE0_DIR"
fi

# Step 4: Stop Campus Lab PostgreSQL
echo "[4/4] Stopping Campus Lab PostgreSQL..."
cd "$CAMPUSLAB_DIR"
docker compose down
echo "  Done -- PostgreSQL container stopped"

echo ""
echo "All services stopped."
echo "Run ./start.sh to restart services"
echo ""

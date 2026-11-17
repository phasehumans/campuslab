#!/bin/bash

# Campus Lab -- Stop Script
# Stops all services: Frontend, Backend containers

set -e

CAMPUSLAB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ""
echo "================================================="
echo "   Campus Lab -- Stopping all services           "
echo "================================================="
echo ""

# Step 1: Stop Frontend Dev Server (Vite)
echo "[1/2] Stopping Frontend Dev Server..."
pkill -f "vite" 2>/dev/null && \
    echo "  Done -- Frontend stopped" || \
    echo "  Skipped -- Frontend was not running"

# Step 2: Stop Docker Compose services
echo "[2/2] Stopping Backend Docker Containers..."
cd "$CAMPUSLAB_DIR"
docker compose down
echo "  Done -- Backend containers stopped"

echo ""
echo "All services stopped."
echo "Run ./start.sh to restart services"
echo ""

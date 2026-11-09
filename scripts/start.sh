#!/bin/bash

# Campus Lab -- Start Script
# Starts all services: PostgreSQL, Redis, C++ Judge Worker, C++ API Server, React Frontend

set -e

CAMPUSLAB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ""
echo "================================================="
echo "   Campus Lab -- Starting All Services (C++)     "
echo "================================================="
echo ""

# Step 1: Start PostgreSQL, Redis, C++ Judge, and C++ API via Docker Compose
echo "[1/2] Starting Backend Services (PostgreSQL, Redis, C++ Judge, C++ API)..."
cd "$CAMPUSLAB_DIR"
docker compose up -d --build
echo "  Done -- Backend services are running!"
echo "    PostgreSQL   -> localhost:5433"
echo "    Redis        -> localhost:6379"
echo "    C++ API      -> http://localhost:3000"

# Step 2: Start Frontend Dev Server
echo "[2/2] Starting Frontend Dev Server..."
cd "$CAMPUSLAB_DIR/web"
bun run dev &
FRONTEND_PID=$!
echo "  Done -- Frontend starting on http://localhost:5173 (PID: $FRONTEND_PID)"

echo ""
echo "================================================="
echo "All services successfully started:"
echo "  Frontend   -> http://localhost:5173"
echo "  C++ API    -> http://localhost:3000"
echo "================================================="
echo ""

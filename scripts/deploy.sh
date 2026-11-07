#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "   CampusLab - Pull & Deploy Latest Production Images     "
echo "=========================================================="

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "==> Pulling latest changes from main branch..."
git fetch origin main
git reset --hard origin/main

echo "==> Pulling pre-built images from GHCR..."
docker compose -f docker-compose.prod.yml pull

echo "==> Restarting production containers..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "==> Cleaning up unused/dangling Docker images..."
docker image prune -f

echo "==> Checking API health status..."
sleep 4
if curl -fsSL http://127.0.0.1:3000/health > /dev/null; then
    echo "=========================================================="
    echo "   ✅ CampusLab is LIVE and HEALTHY!                      "
    echo "=========================================================="
else
    echo "[-] Health check failed. Please inspect logs: docker compose -f docker-compose.prod.yml logs"
    exit 1
fi

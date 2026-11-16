#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "   CampusLab - Pull & Deploy Latest Production Images     "
echo "=========================================================="

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "==> Checking free disk space..."
avail_mb=$(df -Pm / | awk 'NR==2 {print $4}')
echo "    ${avail_mb} MB free on /"
if [ "$avail_mb" -lt 2048 ]; then
    echo "==> Low disk space, removing unused Docker data and apt cache..."
    docker builder prune -af || true
    docker image prune -af || true
    sudo apt-get clean || true
    avail_mb=$(df -Pm / | awk 'NR==2 {print $4}')
    echo "    ${avail_mb} MB free after cleanup"
fi
if [ "$avail_mb" -lt 1300 ]; then
    echo "[-] Only ${avail_mb} MB free; pulling new images needs ~1.3 GB. Free space or grow the EBS volume."
    exit 1
fi

echo "==> Pulling latest changes from main branch..."
git fetch origin main
git reset --hard origin/main

echo "==> Pulling pre-built images from GHCR..."
docker compose -f docker-compose.prod.yml pull

echo "==> Restarting production containers..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "==> Removing old images and build cache..."
docker image prune -af
docker builder prune -af

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

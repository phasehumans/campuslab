#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

# Source environment variables if .env exists
if [ -f .env ]; then
    # export non-comment lines
    export $(grep -v '^#' .env | xargs -d '\n' 2>/dev/null || true)
fi

POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-campuslab-postgres}"
POSTGRES_USER="${POSTGRES_USER:-myuser}"
POSTGRES_DB="${POSTGRES_DB:-campus_lab}"

# Determine whether sudo is needed for docker
DOCKER_CMD="docker"
if ! docker info >/dev/null 2>&1; then
    if sudo docker info >/dev/null 2>&1; then
        DOCKER_CMD="sudo docker"
    fi
fi

echo "=========================================================="
echo "   CampusLab - Database Schema & Seed Provisioning        "
echo "=========================================================="
echo "==> Target container: $POSTGRES_CONTAINER"
echo "==> Target database:  $POSTGRES_DB"
echo "==> Target user:      $POSTGRES_USER"

# Check if --fresh or --clean is passed
if [[ "${1:-}" == "--fresh" || "${1:-}" == "--clean" || "${1:-}" == "-f" ]]; then
    echo "==> [--fresh flag detected] Resetting 'public' schema..."
    $DOCKER_CMD exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
fi

echo "==> [1/2] Applying schema from database/01_schema.sql..."
$DOCKER_CMD exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$SCRIPT_DIR/database/01_schema.sql"

echo "==> [2/2] Seeding 250 problems and testcases from database/02_seed.sql..."
$DOCKER_CMD exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$SCRIPT_DIR/database/02_seed.sql"

echo "==> Verification check:"
$DOCKER_CMD exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT count(*) AS total_problems, AVG(jsonb_array_length(testcases::jsonb)) AS avg_testcases, MIN(jsonb_array_length(testcases::jsonb)) AS min_testcases, MAX(jsonb_array_length(testcases::jsonb)) AS max_testcases FROM \"Problem\";"

echo "=========================================================="
echo "   ✅ Database seeded successfully with 250 problems!     "
echo "=========================================================="

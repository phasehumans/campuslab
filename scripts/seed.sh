#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "Applying schema and seeding database from database/ directory..."
docker exec -i campuslab-postgres psql -U myuser -d campus_lab < "$SCRIPT_DIR/database/01_schema.sql"
docker exec -i campuslab-postgres psql -U myuser -d campus_lab < "$SCRIPT_DIR/database/02_seed.sql"
echo "Database seeded successfully!"

#!/bin/bash
set -e

echo "Seeding database..."
cd server
bun run src/shared/run-seed.ts
bun run prisma/seed.ts "$@"
echo "Done!"

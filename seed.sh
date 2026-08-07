#!/bin/bash
set -e

echo "Seeding database..."
cd server && bun run src/shared/run-seed.ts
echo "Done!"

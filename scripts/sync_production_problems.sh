#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "   CampusLab - Safe Production Problem & Testcase Sync   "
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-campuslab-postgres}"
POSTGRES_USER="${POSTGRES_USER:-myuser}"
POSTGRES_DB="${POSTGRES_DB:-campus_lab}"

echo "==> Target container: $POSTGRES_CONTAINER"
echo "==> Target database:  $POSTGRES_DB"

python3 - << EOF
import subprocess
import sys

sql_init = """
CREATE SCHEMA IF NOT EXISTS staging;
DROP TABLE IF EXISTS staging."Problem";
CREATE TABLE staging."Problem" (LIKE public."Problem" INCLUDING ALL);
"""

print("[1/4] Preparing temporary staging schema...")
res = subprocess.run([
    'docker', 'exec', '-i', '$POSTGRES_CONTAINER',
    'psql', '-U', '$POSTGRES_USER', '-d', '$POSTGRES_DB'
], input=sql_init.encode(), capture_output=True)

if res.returncode != 0:
    print(f"Error initializing staging table:\n{res.stderr.decode()}")
    sys.exit(1)

print("[2/4] Parsing 250 problems and testcases from database/02_seed.sql...")
with open('database/02_seed.sql', 'r') as f:
    lines = f.readlines()

in_copy = False
copy_lines = []
for line in lines:
    if line.startswith('COPY public."Problem"'):
        in_copy = True
        copy_lines.append(line.replace('COPY public."Problem"', 'COPY staging."Problem"'))
        continue
    if in_copy:
        copy_lines.append(line)
        if line.strip() == '\\\\.' or line.strip() == r'\.':
            in_copy = False
            break

sql_upsert = """
INSERT INTO public."Problem"
SELECT * FROM staging."Problem"
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    examples = EXCLUDED.examples,
    constraints = EXCLUDED.constraints,
    hints = EXCLUDED.hints,
    editorial = EXCLUDED.editorial,
    testcases = EXCLUDED.testcases,
    codesnippets = EXCLUDED.codesnippets,
    "referneceSolution" = EXCLUDED."referneceSolution",
    "updatedAt" = NOW();

DELETE FROM public."Problem"
WHERE id NOT IN (SELECT id FROM staging."Problem");

DROP SCHEMA staging CASCADE;
"""

print("[3/4] Executing zero-downtime UPSERT and purging removed duplicates...")
payload = ''.join(copy_lines) + sql_upsert
res = subprocess.run([
    'docker', 'exec', '-i', '$POSTGRES_CONTAINER',
    'psql', '-U', '$POSTGRES_USER', '-d', '$POSTGRES_DB'
], input=payload.encode(), capture_output=True)

if res.returncode != 0:
    print(f"Error during upsert sync:\n{res.stderr.decode()}")
    sys.exit(1)

print("[4/4] Verification check:")
subprocess.run([
    'docker', 'exec', '-i', '$POSTGRES_CONTAINER',
    'psql', '-U', '$POSTGRES_USER', '-d', '$POSTGRES_DB',
    '-c', 'SELECT count(*) AS total_problems, AVG(jsonb_array_length(testcases::jsonb)) AS avg_testcases FROM "Problem";'
], check=True)

print("==========================================================")
print("   ✅ Problem catalog synchronized successfully!          ")
print("==========================================================")
EOF

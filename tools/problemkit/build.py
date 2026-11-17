#!/usr/bin/env python3
"""
CampusLab problem sheet builder.

Every problem lives in problems/<NN-section>/<NNN-slug>/ with:

  meta.json       {"title", "difficulty": EASY|MEDIUM|HARD, "tags": [...],
                   "legacy_id": "<uuid>" (existing problems only),
                   "time_limit_ms": 1000, "memory_mb": 256}
  statement.md    statement incl. **Input Format:** / **Output Format:** sections
  constraints.txt
  hints.md
  editorial.md
  examples.json   [{"input": "...", "explanation": "..."}]   (outputs are computed)
  gen.py          def generate(rng: random.Random) -> list[str]   extra test inputs
                  def validate(inp: str) -> None                  asserts the constraints
  sol.cpp         reference solution (C++)
  sol.py          independent reference solution (Python)

The sheet order is the folder order: sections sort by their NN- prefix and
problems inside a section by their NNN- prefix.

For each problem the builder:
  1. builds TESTS_PER_PROBLEM inputs: the examples first, then generate()'s inputs
     (deduplicated, seeded per problem so the output is reproducible)
  2. checks every input with validate()
  3. runs sol.cpp and sol.py on every input and requires identical answers
     (token-wise, like the judge compares)
  4. emits one idempotent upsert per problem into database/04_sheet_*.sql(.gz):
     a setup file, one gzip file per section, and a finish file

Text is written with dollar quoting ($cl$...$cl$), never COPY escapes, so the
"\\n inside string literals" class of bug (issue #13) can't recur.

Usage:
  python3 tools/problemkit/build.py                 # build everything
  python3 tools/problemkit/build.py --only two-sum  # problems whose slug contains this
  python3 tools/problemkit/build.py --section 02-   # one section (verify only)
  python3 tools/problemkit/build.py --check         # verify only, don't write SQL
"""

from __future__ import annotations

import argparse
import concurrent.futures as cf
import gzip
import hashlib
import importlib.util
import json
import os
import random
import re
import subprocess
import sys
import tempfile
import uuid
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PROBLEMS_DIR = ROOT / "problems"
DB_DIR = ROOT / "database"
CACHE_DIR = ROOT / ".problemkit-cache"

TESTS_PER_PROBLEM = 50
STRESS_TESTS_KEPT = 3               # largest inputs that fit are always kept
CPP_TIMEOUT_S = 5
PY_TIMEOUT_S = 20
MAX_INPUT_BYTES = 64_000             # per test (about 10^4 numbers)
PROBLEM_INPUT_BUDGET = 400_000       # all inputs of one problem together
GEN_ROUNDS = 8                       # extra generator calls (new seeds) to fill the pool
UUID_NAMESPACE = uuid.UUID("6f2b6a1e-4c1b-4f1e-9a57-0c1a5b0e2d77")
SEED_USER_FALLBACK = "317b028f-d6fc-4fe6-bbae-b9a5e6d3d1e5"

SECTION_RE = re.compile(r"^(\d{2})-(.+)$")
PROBLEM_RE = re.compile(r"^(\d{3})-(.+)$")


@dataclass
class Problem:
    path: Path
    section_order: int
    section_slug: str
    order: int
    slug: str
    meta: dict
    files: dict = field(default_factory=dict)
    tests: list = field(default_factory=list)   # [{"input", "output"}]
    examples: list = field(default_factory=list)

    @property
    def id(self) -> str:
        return self.meta.get("legacy_id") or str(uuid.uuid5(UUID_NAMESPACE, self.slug))


def section_title(slug: str) -> str:
    titles = json.loads((PROBLEMS_DIR / "sections.json").read_text())
    return titles.get(slug, slug.replace("-", " ").title())


def discover(only: str | None, section: str | None = None) -> list[Problem]:
    problems: list[Problem] = []
    for sdir in sorted(p for p in PROBLEMS_DIR.iterdir() if p.is_dir()):
        sm = SECTION_RE.match(sdir.name)
        if not sm:
            continue
        if section and section not in sdir.name:
            continue
        for pdir in sorted(p for p in sdir.iterdir() if p.is_dir()):
            pm = PROBLEM_RE.match(pdir.name)
            if not pm:
                continue
            slug = pm.group(2)
            if only and only not in slug:
                continue
            meta = json.loads((pdir / "meta.json").read_text())
            problems.append(Problem(pdir, int(sm.group(1)), sm.group(2), int(pm.group(1)), slug, meta))
    return problems


def normalize(out: str) -> list[str]:
    return out.split()


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)  # type: ignore[union-attr]
    return mod


def compile_cpp(src: Path) -> Path:
    digest = hashlib.sha256(src.read_bytes()).hexdigest()[:16]
    CACHE_DIR.mkdir(exist_ok=True)
    binary = CACHE_DIR / f"sol-{digest}"
    if not binary.exists():
        res = subprocess.run(
            ["g++", "-O2", "-std=c++20", "-pipe", "-o", str(binary), str(src)],
            capture_output=True, text=True,
        )
        if res.returncode != 0:
            raise RuntimeError(f"sol.cpp does not compile:\n{res.stderr[:2000]}")
    return binary


def run(cmd: list[str], inp: str, timeout: int) -> str:
    res = subprocess.run(cmd, input=inp, capture_output=True, text=True, timeout=timeout)
    if res.returncode != 0:
        raise RuntimeError(f"{cmd[0]} exited {res.returncode}: {res.stderr[:500]}")
    return res.stdout


def build_problem(p: Problem) -> Problem:
    for name in ["statement.md", "constraints.txt", "hints.md", "editorial.md", "sol.cpp", "sol.py"]:
        f = p.path / name
        if not f.exists():
            raise RuntimeError(f"missing {name}")
        p.files[name] = f.read_text().strip("\n")

    examples = json.loads((p.path / "examples.json").read_text())
    if not 1 <= len(examples) <= 4:
        raise RuntimeError("need 1-4 examples")

    gen = load_module(p.path / "gen.py", f"gen_{p.slug.replace('-', '_')}")
    seed = int(hashlib.sha256(p.slug.encode()).hexdigest()[:12], 16)
    exhaustive = getattr(gen, "EXHAUSTIVE", False)

    # Candidate pool: examples, then the generator's inputs. Inputs that differ only in
    # whitespace are the same test to the judge. Inputs over the per-test cap are left out
    # (they would bloat the seed and every judge job); if that leaves too few, the
    # generator is called again with new seeds for more random tests.
    seen: set[str] = set()
    example_inputs: list[str] = []
    pool: list[str] = []

    def add(raw: str, is_example: bool = False) -> None:
        inp = raw if raw.endswith("\n") else raw + "\n"
        key = " ".join(inp.split())
        if key in seen:
            return
        seen.add(key)
        if is_example:
            example_inputs.append(inp)
        elif len(inp.encode()) <= MAX_INPUT_BYTES:
            pool.append(inp)

    for e in examples:
        add(e["input"], is_example=True)
    for round_no in range(GEN_ROUNDS):
        for raw in gen.generate(random.Random(seed + round_no)):
            add(raw)
        if exhaustive or len(example_inputs) + len(pool) >= TESTS_PER_PROBLEM + 10:
            break

    # Selection: the examples, the largest inputs that fit (stress tests), then the rest in
    # generator order, all within the per-problem input budget.
    need = TESTS_PER_PROBLEM - len(example_inputs)
    budget = PROBLEM_INPUT_BUDGET - sum(len(x.encode()) for x in example_inputs)
    chosen: list[int] = []
    for i in sorted(range(len(pool)), key=lambda i: -len(pool[i]))[:STRESS_TESTS_KEPT]:
        size = len(pool[i].encode())
        if size <= budget // 2:          # stress tests may use at most half the budget
            chosen.append(i)
            budget -= size
    for i in range(len(pool)):
        if len(chosen) >= need:
            break
        size = len(pool[i].encode())
        if i not in chosen and size <= budget:
            chosen.append(i)
            budget -= size
    if len(chosen) < need:               # last resort: smallest remaining first
        for i in sorted(range(len(pool)), key=lambda i: len(pool[i])):
            if len(chosen) >= need:
                break
            size = len(pool[i].encode())
            if i not in chosen and size <= budget:
                chosen.append(i)
                budget -= size

    inputs = example_inputs + [pool[i] for i in sorted(chosen)]
    if len(inputs) < TESTS_PER_PROBLEM and not exhaustive:
        raise RuntimeError(
            f"only {len(inputs)} tests fit (need {TESTS_PER_PROBLEM}; pool {len(pool)}, "
            f"cap {MAX_INPUT_BYTES} B/test, budget {PROBLEM_INPUT_BUDGET} B). Make some tests "
            "smaller, or set EXHAUSTIVE = True if that is every possible input"
        )

    for i, inp in enumerate(inputs):
        if len(inp.encode()) > MAX_INPUT_BYTES:
            raise RuntimeError(f"test {i + 1} input is {len(inp)} bytes (max {MAX_INPUT_BYTES})")
        try:
            gen.validate(inp)
        except Exception as e:  # noqa: BLE001
            raise RuntimeError(f"test {i + 1} violates constraints: {e!r}\n{inp[:300]}") from None

    binary = compile_cpp(p.path / "sol.cpp")
    sol_py = str(p.path / "sol.py")
    for i, inp in enumerate(inputs):
        out_cpp = run([str(binary)], inp, CPP_TIMEOUT_S)
        out_py = run([sys.executable, sol_py], inp, PY_TIMEOUT_S)
        if normalize(out_cpp) != normalize(out_py):
            raise RuntimeError(
                f"test {i + 1}: sol.cpp and sol.py disagree\ninput: {inp[:300]}\n"
                f"cpp: {out_cpp[:300]}\npy:  {out_py[:300]}"
            )
        if not out_cpp.strip():
            raise RuntimeError(f"test {i + 1}: empty output")
        p.tests.append({"input": inp.rstrip("\n"), "output": out_cpp.strip()})

    p.examples = [
        {
            "title": f"Example {i + 1}",
            "input": e["input"].rstrip("\n"),
            "output": p.tests[i]["output"],
            **({"explanation": e["explanation"]} if e.get("explanation") else {}),
        }
        for i, e in enumerate(examples)
    ]
    return p


def dq(text: str) -> str:
    """Dollar-quote text for PostgreSQL with a tag that can't occur in it."""
    tag = "cl"
    while f"${tag}$" in text:
        tag += "x"
    return f"${tag}${text}${tag}$"


SETUP_SQL = """-- Generated by tools/problemkit/build.py. Do not edit by hand.
-- CampusLab DSA sheet, part 1/3: columns, then clear sheet numbers (they're reassigned
-- by the section files) so the unique index never collides mid-update.
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS number integer;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS section text;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "sectionOrder" integer;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "timeLimitMs" integer DEFAULT 1000 NOT NULL;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "memoryLimitMb" integer DEFAULT 256 NOT NULL;
UPDATE public."Problem" SET number = NULL WHERE number IS NOT NULL;
"""

FINISH_SQL = """-- Generated by tools/problemkit/build.py. Do not edit by hand.
-- CampusLab DSA sheet, part 3/3.
CREATE UNIQUE INDEX IF NOT EXISTS "Problem_number_key" ON public."Problem" (number);
"""

SEED_USER = (
    "COALESCE((SELECT id FROM public.\"User\" WHERE id = '" + SEED_USER_FALLBACK + "'), "
    "(SELECT id FROM public.\"User\" WHERE role = 'ADMIN' ORDER BY \"createdAt\" LIMIT 1), "
    "(SELECT id FROM public.\"User\" ORDER BY \"createdAt\" LIMIT 1))"
)


def insert_sql(p: Problem, number: int) -> str:
    """One idempotent upsert (never deletes)."""
    meta = p.meta
    tags = "ARRAY[" + ", ".join(dq(t) for t in meta.get("tags", [])) + "]::text[]"
    ref = json.dumps({"cpp": p.files["sol.cpp"] + "\n", "python": p.files["sol.py"] + "\n"})
    return (
        "INSERT INTO public.\"Problem\" (id, title, description, difficulty, tags, \"userId\", examples, "
        "constraints, hints, editorial, testcases, codesnippets, \"referneceSolution\", \"createdAt\", "
        "\"updatedAt\", number, section, \"sectionOrder\", \"timeLimitMs\", \"memoryLimitMb\") VALUES ("
        f"'{p.id}', {dq(meta['title'])}, {dq(p.files['statement.md'])}, '{meta['difficulty']}', {tags}, "
        f"{SEED_USER}, {dq(json.dumps(p.examples))}::jsonb, {dq(p.files['constraints.txt'])}, "
        f"{dq(p.files['hints.md'])}, {dq(p.files['editorial.md'])}, {dq(json.dumps(p.tests))}::jsonb, "
        f"'{{}}'::jsonb, {dq(ref)}::jsonb, NOW(), NOW(), {number}, {dq(section_title(p.section_slug))}, "
        f"{p.section_order}, {int(meta.get('time_limit_ms', 1000))}, {int(meta.get('memory_mb', 256))}) "
        "ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, "
        "difficulty = EXCLUDED.difficulty, tags = EXCLUDED.tags, examples = EXCLUDED.examples, "
        "constraints = EXCLUDED.constraints, hints = EXCLUDED.hints, editorial = EXCLUDED.editorial, "
        "testcases = EXCLUDED.testcases, codesnippets = EXCLUDED.codesnippets, "
        "\"referneceSolution\" = EXCLUDED.\"referneceSolution\", \"updatedAt\" = NOW(), "
        "number = EXCLUDED.number, section = EXCLUDED.section, \"sectionOrder\" = EXCLUDED.\"sectionOrder\", "
        "\"timeLimitMs\" = EXCLUDED.\"timeLimitMs\", \"memoryLimitMb\" = EXCLUDED.\"memoryLimitMb\";"
    )


def write_sheet(problems: list[Problem]) -> list[Path]:
    """
    Writes database/04_sheet_00_setup.sql, one gzip file per section
    (04_sheet_NN_<section>.sql.gz, one transaction each) and 04_sheet_99_finish.sql.
    The names sort in apply order, for scripts/seed.sh, scripts/sync_production_problems.sh
    and Postgres' docker-entrypoint-initdb.d (which reads .sql.gz natively).
    """
    for old in list(DB_DIR.glob("04_sheet_*")) + [DB_DIR / "04_problem_sheet.sql"]:
        old.unlink(missing_ok=True)

    written = [DB_DIR / "04_sheet_00_setup.sql"]
    written[0].write_text(SETUP_SQL)

    by_section: dict[tuple[int, str], list[tuple[int, Problem]]] = {}
    for n, p in enumerate(problems, start=1):
        by_section.setdefault((p.section_order, p.section_slug), []).append((n, p))
    for (order, slug), items in sorted(by_section.items()):
        path = DB_DIR / f"04_sheet_{order:02d}_{slug}.sql.gz"
        body = "\n".join(
            [f"-- Generated by tools/problemkit/build.py. Section {order:02d}: {section_title(slug)}", "BEGIN;"]
            + [insert_sql(p, n) for n, p in items]
            + ["COMMIT;", ""]
        )
        # mtime=0 keeps the gzip bytes identical across rebuilds (clean git diffs)
        with gzip.GzipFile(path, "wb", compresslevel=9, mtime=0) as f:
            f.write(body.encode())
        written.append(path)

    finish = DB_DIR / "04_sheet_99_finish.sql"
    finish.write_text(FINISH_SQL)
    written.append(finish)
    return written


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", help="only problems whose slug contains this (implies --check)")
    ap.add_argument("--section", help="only sections whose folder name contains this (implies --check)")
    ap.add_argument("--check", action="store_true", help="verify only, don't write SQL")
    ap.add_argument("--jobs", type=int, default=os.cpu_count() or 2)
    args = ap.parse_args()

    problems = discover(args.only, args.section)
    if not problems:
        print("no problems found", file=sys.stderr)
        return 1

    slugs = [p.slug for p in problems]
    dupes = {s for s in slugs if slugs.count(s) > 1}
    if dupes:
        print(f"duplicate slugs: {sorted(dupes)}", file=sys.stderr)
        return 1

    failures: list[tuple[str, str]] = []
    built: dict[str, Problem] = {}
    with cf.ThreadPoolExecutor(max_workers=args.jobs) as pool:
        futures = {pool.submit(build_problem, p): p for p in problems}
        for fut in cf.as_completed(futures):
            p = futures[fut]
            try:
                built[p.slug] = fut.result()
                print(f"  ok  {p.section_order:02d}/{p.order:03d} {p.slug}")
            except Exception as e:  # noqa: BLE001
                failures.append((str(p.path.relative_to(ROOT)), str(e)))
                print(f"  FAIL {p.path.relative_to(ROOT)}: {str(e).splitlines()[0]}")

    if failures:
        print(f"\n{len(failures)} problem(s) failed:\n", file=sys.stderr)
        for path, err in failures:
            print(f"--- {path}\n{err}\n", file=sys.stderr)
        return 1

    ordered = [built[p.slug] for p in problems]
    by_diff = {d: sum(1 for p in ordered if p.meta["difficulty"] == d) for d in ("EASY", "MEDIUM", "HARD")}
    print(f"\n{len(ordered)} problems verified ({by_diff}), {sum(len(p.tests) for p in ordered)} tests")

    if args.check or args.only or args.section:
        return 0
    files = write_sheet(ordered)
    total = sum(f.stat().st_size for f in files)
    print(f"wrote {len(files)} files database/04_sheet_* ({total / 1e6:.1f} MB, "
          f"largest {max(f.stat().st_size for f in files) / 1e6:.1f} MB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""
One-off: export the existing problems from the local database into
problems/_existing/<slug>/ (meta.json, statement.md, constraints.txt, hints.md,
editorial.md, examples.json, sol.cpp, tests_existing.json), repairing the
issue #13 damage in reference solutions on the way, then report which reference
solutions compile and pass the stored tests.

Usage: python3 tools/problemkit/export_existing.py
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "problems" / "_existing"


def psql_json(query: str):
    res = subprocess.run(
        ["docker", "exec", "campuslab-postgres", "psql", "-U", "myuser", "-d", "campus_lab", "-At", "-c", query],
        capture_output=True, text=True, check=True,
    )
    return json.loads(res.stdout)


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


def repair_newlines(src: str) -> str:
    """Issue #13: "\\n" inside string/char literals was stored as a real line break."""
    src = src.replace('"\n"', '"\\n"').replace("'\n'", "'\\n'")
    # string literals that *end* with a broken newline, e.g. "Yes\n" -> "Yes<newline>"
    src = re.sub(r'"([^"\n]*)\n"', lambda m: '"' + m.group(1) + '\\n"', src)
    return src


def tokens(s: str) -> list[str]:
    return s.split()


def main() -> int:
    rows = psql_json(
        "SELECT json_agg(t) FROM (SELECT id, title, description, difficulty, tags, examples, constraints, "
        "hints, editorial, testcases, \"referneceSolution\" AS ref FROM \"Problem\" ORDER BY \"createdAt\", id) t"
    )
    OUT.mkdir(parents=True, exist_ok=True)
    report = {"compiled": 0, "compile_failed": [], "passes_tests": 0, "wrong_tests": [], "repaired": 0}

    with tempfile.TemporaryDirectory() as tmp:
        for r in rows:
            slug = slugify(r["title"])
            d = OUT / slug
            d.mkdir(parents=True, exist_ok=True)
            meta = {
                "title": r["title"],
                "difficulty": r["difficulty"],
                "tags": r["tags"] or [],
                "legacy_id": r["id"],
                "time_limit_ms": 1000,
                "memory_mb": 256,
            }
            (d / "meta.json").write_text(json.dumps(meta, indent=2) + "\n")
            (d / "statement.md").write_text(r["description"].strip() + "\n")
            (d / "constraints.txt").write_text((r["constraints"] or "").strip() + "\n")
            (d / "hints.md").write_text((r["hints"] or "").strip() + "\n")
            (d / "editorial.md").write_text((r["editorial"] or "").strip() + "\n")
            examples = [
                {"input": e["input"], **({"explanation": e["explanation"]} if e.get("explanation") else {})}
                for e in (r["examples"] or [])
            ]
            (d / "examples.json").write_text(json.dumps(examples, indent=2) + "\n")
            (d / "tests_existing.json").write_text(json.dumps(r["testcases"]) + "\n")

            raw = (r["ref"] or {}).get("cpp", "")
            src = repair_newlines(raw)
            if src != raw:
                report["repaired"] += 1
            (d / "sol.cpp").write_text(src.rstrip("\n") + "\n")

            binary = Path(tmp) / slug
            c = subprocess.run(["g++", "-O2", "-std=c++20", "-o", str(binary), str(d / "sol.cpp")],
                               capture_output=True, text=True)
            if c.returncode != 0:
                report["compile_failed"].append(slug)
                continue
            report["compiled"] += 1

            bad = []
            for i, tc in enumerate(r["testcases"] or []):
                try:
                    res = subprocess.run([str(binary)], input=tc["input"] + "\n", capture_output=True,
                                         text=True, timeout=5)
                    if tokens(res.stdout) != tokens(tc["output"]):
                        bad.append(i + 1)
                except subprocess.TimeoutExpired:
                    bad.append(i + 1)
            if bad:
                report["wrong_tests"].append({"slug": slug, "tests": bad})
            else:
                report["passes_tests"] += 1

    (OUT / "_report.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({k: (v if not isinstance(v, list) else len(v)) for k, v in report.items()}))
    print("details: problems/_existing/_report.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())

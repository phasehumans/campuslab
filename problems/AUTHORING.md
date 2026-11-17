# Authoring problems for the CampusLab DSA sheet

The sheet is the original 250 CampusLab problems in 18 topic sections (`problems/sections.json`),
ordered as a learning path: beginner to advanced across sections, and Easy → Medium → Hard
inside each section. `tools/problemkit/build.py` verifies every problem and generates
`database/04_sheet_*` (applied by `scripts/seed.sh` and `scripts/sync_production_problems.sh`).

## Folder layout

```
problems/<NN-section>/<NNN-slug>/
  meta.json        {"title", "difficulty": "EASY"|"MEDIUM"|"HARD", "tags": ["kebab-case", ...],
                    "legacy_id": "<uuid>"  (existing problems only, never change it),
                    "time_limit_ms": 1000, "memory_mb": 256}
  statement.md     markdown statement, ends with **Input Format:** and **Output Format:** sections
  constraints.txt  one constraint per line, e.g. "1 <= n <= 10^5"
  hints.md         1-3 short hints (plain sentences, no full solution)
  editorial.md     approach + time/space complexity, concise markdown, no full code
  examples.json    [{"input": "...", "explanation": "..."}]   1-3 examples; outputs are computed
  gen.py           test generator + constraint validator (see below)
  sol.cpp          reference solution, C++20
  sol.py           independent reference solution, Python 3
```

- `NNN` sets the order inside a section. Use 010, 020, 030 … (gaps let problems be inserted later).
- The slug is the folder name without the number: lowercase, `a-z0-9-`, unique across the whole sheet.

## Rules for every problem

1. **stdin → stdout only.** No interactive problems, no special checkers. The judge compares
   whitespace-separated tokens exactly.
2. **Exactly one correct output for every input.** If several answers could be valid, define a
   canonical one (count them, print the minimum, lexicographically smallest, sorted order…).
3. **Integers only in output.** Avoid floating point. If unavoidable, require a fixed number of
   decimals from an integer-exact computation.
4. **Original wording.** Classic problems (Two Sum, Kadane, BFS on a grid…) are fine and may keep
   their well-known name, but write the statement in your own words. Never copy text from
   LeetCode, GeeksforGeeks, Codeforces or any other site.
5. **Sizes:** an efficient C++ solution must run well under 1 s on the largest test, and an
   efficient Python solution should stay within a few seconds (the judge gives Python 3× + 0.5 s).
   Typical maxima: n ≤ 10^5 for O(n log n), n ≤ 2000 for O(n²), n ≤ 20 for 2^n. Each test input
   must be ≤ 2 MB; keep large tests few (≤ 5 per problem).
6. **Difficulty:** EASY = one idea, direct implementation; MEDIUM = a standard technique applied
   with some thought; HARD = combines techniques or needs a non-obvious insight.

## gen.py

```python
import random

def generate(rng: random.Random) -> list[str]:
    """Return at least 50 test inputs (as text). The examples are added in front automatically;
    duplicates are dropped and 50 distinct inputs are kept (see below)."""
    tests = []
    # 1. edge cases: smallest n, largest values, all equal, sorted, reverse sorted, negatives,
    #    zeros, single element, answer at the boundaries, "no answer" cases …
    # 2. random small cases (good at finding bugs)
    # 3. random medium cases
    # 4. a few (<= 5) maximum-size stress cases
    return tests

def validate(inp: str) -> None:
    """Parse the input and assert every constraint in constraints.txt (raise AssertionError)."""
```

Use only `rng` for randomness (never `random.*` directly) so the tests are reproducible.

- Inputs that differ only in whitespace count as the same test.
- If more than 50 distinct inputs are generated, the builder keeps the examples, the 3 largest
  inputs that fit the size budget, and fills the rest in generator order.
- If the problem has fewer than 50 possible inputs (e.g. `1 <= n <= 20`), list all of them and set
  `EXHAUSTIVE = True` at the top of `gen.py`; the builder then accepts fewer tests.

## The two solutions

- `sol.cpp` and `sol.py` must both be correct and **written independently**. Prefer a different
  method for one of them when it's cheap (for example a straightforward O(n²) Python solution
  when the constraints allow it), because two copies of the same idea can share the same bug.
- The builder runs both on all 50 tests and rejects the problem if any output differs.

## Existing problems (they have `legacy_id`)

Every problem in the sheet came from the live database and keeps its `legacy_id` in
`meta.json`: it links the problem to existing submissions, solves, duels and POTD history.
Never change it, and keep each problem's input/output format so accepted solutions keep
working. New problems simply omit `legacy_id` (an id is derived from the slug).

## Linked lists and trees

Follow the input format the existing problems in that section already use (read their
`statement.md`), so the whole section is consistent.

## Verify

```bash
python3 tools/problemkit/build.py --only <slug>        # one problem
python3 tools/problemkit/build.py --section 02-arrays  # one section
```

A problem is done only when the builder reports `ok` for it.

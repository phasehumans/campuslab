import random


def generate(rng: random.Random) -> list[str]:
    tests = ["1 1\n0 0", "5 5\n0 0", "5 5\n0 1", "5 5\n2 2", "5 5\n1 2", "4 4\n0 0", "3 3\n1 1", "3 3\n0 0",
             "1 5\n0 2", "2 5\n0 0", "3 4\n0 1", "4 5\n0 0", "5 4\n1 0", "3 5\n1 2", "5 3\n0 0"]
    all_cases = [f"{R} {C}\n{r} {c}" for R in range(1, 6) for C in range(1, 6)
                 for r in range(R) for c in range(C)]
    rng.shuffle(all_cases)
    # prefer the boards where a tour can exist at all (3x4, 4x3, 3x5, 5x3, 4x5, 5x4, 5x5, 1x1)
    big = [t for t in all_cases if t.split("\n")[0] in ("3 4", "4 3", "3 5", "5 3", "4 5", "5 4", "5 5")]
    other = [t for t in all_cases if t not in big]
    tests += big[:30] + other[:15]
    return tests


def validate(inp: str) -> None:
    R, C, r, c = map(int, inp.split())
    assert 1 <= R <= 5 and 1 <= C <= 5 and R * C <= 25
    assert 0 <= r < R and 0 <= c < C

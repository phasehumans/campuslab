import random

M = 2**31 - 1


def generate(rng: random.Random) -> list[str]:
    tests = [(0, 0), (0, M), (M, M), (M, 0), (1, 2), (2**30, 0), (5, 5), (0, 1)]
    for _ in range(20):
        tests.append((rng.randint(0, 100), rng.randint(0, 100)))
    for _ in range(25):
        tests.append((rng.randint(0, M), rng.randint(0, M)))
    return [f"{a} {b}\n" for a, b in tests]


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    assert len(t) == 2 and all(0 <= x <= M for x in t)

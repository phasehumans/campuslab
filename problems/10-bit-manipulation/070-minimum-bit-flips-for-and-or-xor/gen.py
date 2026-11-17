import random

M = 10**9


def generate(rng: random.Random) -> list[str]:
    tests = [(0, 0, 0), (0, 0, 1), (1, 1, 0), (7, 7, 0), (4, 2, 7), (8, 3, 5),
             (M, M - 1, 0), (0, 0, M), (M, M, M), (M, 0, M - 1), (2**29, 2**29, 2**29 - 1)]
    for _ in range(20):
        tests.append(tuple(rng.randint(0, 64) for _ in range(3)))
    for _ in range(22):
        tests.append(tuple(rng.randint(0, M) for _ in range(3)))
    return [f"{a} {b} {c}\n" for a, b, c in tests]


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    assert len(t) == 3 and all(0 <= x <= M for x in t)

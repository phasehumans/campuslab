import random

M = 10**18


def generate(rng: random.Random) -> list[str]:
    tests = [(0, 0), (0, M), (M, M), (5, 7), (1, 2147483647), (2**59, 2**59 + 12345), (2**59 - 1, 2**59),
             (7, 7), (12, 15), (M - 1, M), (2**40, 2**41 - 1)]
    for _ in range(20):
        a = rng.randint(0, 200)
        tests.append((a, a + rng.randint(0, 50)))
    for _ in range(12):
        a = rng.randint(0, M)
        tests.append((a, min(M, a + rng.randint(0, 10**6))))
    for _ in range(10):
        a, b = sorted(rng.randint(0, M) for _ in range(2))
        tests.append((a, b))
    return [f"{a} {b}\n" for a, b in tests]


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    assert len(t) == 2 and 0 <= t[0] <= t[1] <= M

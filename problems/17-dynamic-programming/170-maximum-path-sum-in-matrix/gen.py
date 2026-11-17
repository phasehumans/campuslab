import random


def grid(n, m, rng, lo=-10**4, hi=10**4):
    return f"{n} {m}\n" + "\n".join(" ".join(str(rng.randint(lo, hi)) for _ in range(m)) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    tests = ["1 1\n5", "1 1\n-10000", "1 5\n-3 -1 -2 -9 -4", "5 1\n1\n-2\n3\n-4\n5", "2 2\n-1 -1\n-1 -1",
             "3 3\n10000 10000 10000\n10000 10000 10000\n10000 10000 10000"]
    for _ in range(25):
        tests.append(grid(rng.randint(1, 6), rng.randint(1, 6), rng, -rng.choice([0, 10, 10**4]), rng.choice([0, 10, 10**4])))
    for _ in range(14):
        tests.append(grid(rng.randint(5, 100), rng.randint(5, 100), rng))
    tests.append(grid(100, 100, rng))
    tests.append(grid(100, 100, rng, -10**4, -9000))
    tests.append(grid(100, 100, rng, 9000, 10**4))
    tests.append(grid(100, 1, rng))
    tests.append(grid(1, 100, rng))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    n, m = map(int, lines[0].split())
    assert 1 <= n <= 100 and 1 <= m <= 100
    assert len(lines) == n + 1
    for line in lines[1:]:
        row = list(map(int, line.split()))
        assert len(row) == m
        assert all(-10**4 <= x <= 10**4 for x in row)

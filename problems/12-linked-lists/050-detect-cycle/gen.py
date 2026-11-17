import random

def case(n, pos, rng, lo=-10**9, hi=10**9):
    return f"{n} {pos}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["1 -1\n5", "1 0\n5", "2 0\n1 2", "2 1\n1 2", "3 -1\n7 7 7", "3 2\n7 7 7"]
    for _ in range(25):
        n = rng.randint(1, 12)
        pos = rng.choice([-1, rng.randrange(n)])
        t.append(case(n, pos, rng, -5, 5))
    for _ in range(15):
        n = rng.randint(12, 1000)
        pos = rng.choice([-1, rng.randrange(n), n - 1, 0])
        t.append(case(n, pos, rng))
    t.append(case(5000, -1, rng))
    t.append(case(5000, 0, rng))
    t.append(case(5000, 4999, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, pos = int(d[0]), int(d[1])
    assert 1 <= n <= 5000 and -1 <= pos < n and len(d) == n + 2
    assert all(-10**9 <= int(x) <= 10**9 for x in d[2:])

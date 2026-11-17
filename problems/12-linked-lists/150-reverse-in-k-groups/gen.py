import random

def case(n, k, rng, lo=-1000, hi=1000):
    return f"{n} {k}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["1 1\n5", "2 1\n1 2", "2 2\n1 2", "3 2\n1 2 3", "6 3\n1 2 3 4 5 6", "7 7\n1 2 3 4 5 6 7",
         "7 3\n-1000 1000 0 1 2 3 4"]
    for _ in range(25):
        n = rng.randint(1, 12)
        t.append(case(n, rng.randint(1, n), rng, -9, 9))
    for _ in range(14):
        n = rng.randint(12, 2000)
        t.append(case(n, rng.choice([1, n, rng.randint(1, 50), rng.randint(1, n)]), rng))
    for k in (1, 5000, 7, 2500):
        t.append(case(5000, k, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    assert 1 <= k <= n <= 5000 and len(d) == n + 2
    assert all(-1000 <= int(x) <= 1000 for x in d[2:])

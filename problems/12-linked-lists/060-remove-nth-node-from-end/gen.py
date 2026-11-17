import random

def case(n, k, rng, lo=-10**9, hi=10**9):
    return f"{n} {k}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["2 1\n1 2", "3 3\n1 2 3", "3 1\n1 2 3", "3 2\n1 2 3", "4 2\n5 5 5 5",
         "2 1\n-1000000000 1000000000"]
    for _ in range(25):
        n = rng.randint(2, 10)
        t.append(case(n, rng.randint(1, n), rng, -9, 9))
    for _ in range(15):
        n = rng.randint(10, 1000)
        t.append(case(n, rng.choice([1, n, rng.randint(1, n)]), rng))
    for k in (1, 5000, 2500):
        t.append(case(5000, k, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    assert 2 <= n <= 5000 and 1 <= k <= n and len(d) == n + 2
    assert all(-10**9 <= int(x) <= 10**9 for x in d[2:])

import random

def case(n, k, rng):
    return f"{n} {k}\n" + " ".join(str(rng.randint(-100, 100)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["1 0\n5", "1 2000000000\n-100", "4 4\n1 2 3 4", "4 0\n1 2 3 4", "4 1\n1 2 3 4", "4 3\n1 2 3 4",
         "3 2000000000\n1 2 3", "5 7\n1 2 3 4 5"]
    for _ in range(25):
        n = rng.randint(1, 10)
        t.append(case(n, rng.randint(0, 25), rng))
    for _ in range(14):
        n = rng.randint(10, 2000)
        t.append(case(n, rng.choice([rng.randint(0, 2 * 10**9), rng.randint(0, n), n]), rng))
    t.append(case(10000, 2 * 10**9, rng))
    t.append(case(10000, 9999, rng))
    t.append(case(10000, 1, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    assert 1 <= n <= 10000 and 0 <= k <= 2 * 10**9 and len(d) == n + 2
    assert all(-100 <= int(x) <= 100 for x in d[2:])

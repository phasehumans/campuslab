import random

def case(n, x, lo, hi, rng):
    return f"{n} {x}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["1 0\n0", "1 1\n0", "3 -1000000000\n1 -1000000000 5", "3 1000000000\n1000000000 1 1000000000",
         "5 3\n3 3 3 3 3", "5 10\n1 2 3 4 5", "5 0\n1 2 3 4 5", "4 3\n5 4 3 2"]
    for _ in range(25):
        t.append(case(rng.randint(1, 10), rng.randint(-5, 5), -5, 5, rng))
    for _ in range(13):
        t.append(case(rng.randint(10, 3000), rng.randint(-1000, 1000), -1000, 1000, rng))
    for _ in range(3):
        t.append(case(10**5, rng.randint(-10**9, 10**9), -10**9, 10**9, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, x = int(d[0]), int(d[1])
    assert 1 <= n <= 10**5 and len(d) == n + 2 and -10**9 <= x <= 10**9
    assert all(-10**9 <= int(v) <= 10**9 for v in d[2:])

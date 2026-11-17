import random

def case(n, rng, lo=-10**9, hi=10**9, p_null=0.3):
    v = [rng.randint(lo, hi) for _ in range(n)]
    r = [-1 if rng.random() < p_null else rng.randrange(n) for _ in range(n)]
    return f"{n}\n" + " ".join(map(str, v)) + "\n" + " ".join(map(str, r))

def generate(rng: random.Random) -> list[str]:
    t = ["1\n7\n-1", "1\n7\n0", "2\n1 2\n-1 -1", "2\n1 2\n1 0", "3\n-1000000000 0 1000000000\n2 2 2",
         "4\n5 5 5 5\n0 1 2 3"]
    for _ in range(25):
        t.append(case(rng.randint(1, 8), rng, -9, 9, rng.random()))
    for _ in range(15):
        t.append(case(rng.randint(8, 600), rng, p_null=rng.random()))
    t.append(case(1000, rng, p_null=0.0))
    t.append(case(1000, rng, p_null=1.0))
    t.append(case(1000, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 1000 and len(d) == 1 + 2 * n
    assert all(-10**9 <= int(x) <= 10**9 for x in d[1:1 + n])
    assert all(-1 <= int(x) < n for x in d[1 + n:])

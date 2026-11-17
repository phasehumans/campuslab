import random

def lst(n, lo, hi, rng):
    return f"{n}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["1\n7", "1\n-5000", "2\n5000 -5000", "2\n3 9", "3\n0 0 0", "6\n1 2 3 4 5 6", "7\n1 2 3 4 5 6 7",
         "5\n5 4 3 2 1", "4\n1 2 2 1"]
    for _ in range(25):
        t.append(lst(rng.randint(1, 10), -10, 10, rng))
    for _ in range(15):
        t.append(lst(rng.randint(10, 500), -5000, 5000, rng))
    for _ in range(3):
        t.append(lst(5000 - rng.randint(0, 1), -5000, 5000, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 5000 and len(d) == n + 1
    assert all(-5000 <= int(x) <= 5000 for x in d[1:])

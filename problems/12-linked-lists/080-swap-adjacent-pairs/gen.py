import random

def lst(n, lo, hi, rng):
    return f"{n}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = ["1\n5", "2\n1 2", "3\n1 2 3", "2\n-100 100", "4\n7 7 7 7", "5\n1 2 3 4 5"]
    for _ in range(25):
        t.append(lst(rng.randint(1, 11), -9, 9, rng))
    for _ in range(15):
        t.append(lst(rng.randint(11, 1000), -100, 100, rng))
    t.append(lst(5000, -100, 100, rng))
    t.append(lst(4999, -100, 100, rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 5000 and len(d) == n + 1
    assert all(-100 <= int(x) <= 100 for x in d[1:])

import random


def arr(n, rng, lo=0, hi=100):
    return f"{n}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    t = ["1\n0", "1\n100", "2\n0 100", "5\n7 7 7 7 7", "101\n" + " ".join(map(str, range(101))),
         "101\n" + " ".join(map(str, range(100, -1, -1)))]
    for _ in range(20):
        t.append(arr(rng.randint(1, 10), rng, 0, rng.choice([3, 10, 100])))
    for _ in range(20):
        t.append(arr(rng.randint(10, 1000), rng, 0, rng.choice([5, 50, 100])))
    for _ in range(3):
        t.append(arr(100000, rng))
    t.append(arr(100000, rng, 42, 43))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == n + 1
    assert all(0 <= int(x) <= 100 for x in tok[1:])

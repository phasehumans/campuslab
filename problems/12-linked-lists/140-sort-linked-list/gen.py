import random

def fmt(a):
    return f"{len(a)}\n" + " ".join(map(str, a))

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5]), fmt([2, 1]), fmt([1, 2]), fmt([-100000, 100000, 0]), fmt([3, 3, 3]),
         fmt(list(range(10, 0, -1))), fmt(list(range(1, 11)))]
    for _ in range(25):
        t.append(fmt([rng.randint(-9, 9) for _ in range(rng.randint(1, 12))]))
    for _ in range(13):
        t.append(fmt([rng.randint(-10**5, 10**5) for _ in range(rng.randint(12, 3000))]))
    t.append(fmt([rng.randint(-10**5, 10**5) for _ in range(10000)]))
    t.append(fmt(list(range(10000, 0, -1))))
    t.append(fmt([rng.randint(-2, 2) for _ in range(10000)]))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 10000 and len(d) == n + 1
    assert all(-10**5 <= int(x) <= 10**5 for x in d[1:])

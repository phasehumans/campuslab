import random

def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([0], 1), fmt([10**9], 1), fmt([0, 0, 0], 3), fmt([0, 0, 5, 0], 2), fmt([1, 2, 3], 3),
         fmt([1, 2, 3], 1), fmt([10**9] * 5, 2), fmt([1, 4, 4], 3)]
    for _ in range(27):
        n = rng.randint(1, 12)
        a = [rng.randint(0, 20) for _ in range(n)]
        k = rng.randint(1, min(n, 100))
        t.append(fmt(a, k))
    for _ in range(10):
        n = rng.randint(30, 60) if _ < 5 else rng.randint(100, 5000)
        a = [rng.randint(0, 10**9) for _ in range(n)]
        k = rng.randint(1, min(n, 100))
        t.append(fmt(a, k))
    n = 10**5
    t.append(fmt([rng.randint(0, 10**9) for _ in range(n)], 100))
    t.append(fmt([rng.randint(0, 10**9) for _ in range(n)], 1))
    t.append(fmt([rng.randint(0, 10**9) for _ in range(n)], rng.randint(2, 99)))
    t.append(fmt([rng.choice([0, 10**9]) for _ in range(n)], 37))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert 1 <= k <= min(n, 100)
    assert all(0 <= x <= 10**9 for x in a)

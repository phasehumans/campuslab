import random

def fmt(a, m):
    return f"{len(a)} {m}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5], 1), fmt([5], 2), fmt([10**9], 1), fmt([1, 2, 3], 3), fmt([1, 2, 3], 1),
         fmt([10**9] * 4, 2), fmt([7, 7, 7, 7], 4), fmt([1, 1, 1], 10**5), fmt([100, 1, 1, 1, 1], 2)]
    for _ in range(26):
        n = rng.randint(1, 10)
        a = [rng.randint(1, 30) for _ in range(n)]
        m = rng.randint(1, n + 1)
        t.append(fmt(a, m))
    for _ in range(10):
        n = rng.randint(100, 3000)
        a = [rng.randint(1, 10**9) for _ in range(n)]
        m = rng.randint(1, n)
        t.append(fmt(a, m))
    n = 10**5
    t.append(fmt([rng.randint(1, 10**9) for _ in range(n)], rng.randint(1, 100)))
    t.append(fmt([rng.randint(1, 10**9) for _ in range(n)], n))
    t.append(fmt([rng.randint(1, 10**9) for _ in range(n)], rng.randint(1000, n)))
    t.append(fmt([10**9] * n, 1))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, m = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert 1 <= m <= 10**5
    assert all(1 <= x <= 10**9 for x in a)

import random

def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([0, 0], 1), fmt([0, 10**6], 1), fmt([5, 5, 5], 3), fmt([1, 6, 1], 1), fmt([1, 6, 1], 3),
         fmt([10**6, 0, 500000], 2), fmt([1, 2, 3, 4], 6)]
    for _ in range(28):
        n = rng.randint(2, 12)
        a = [rng.randint(0, 20) for _ in range(n)]
        t.append(fmt(a, rng.randint(1, n * (n - 1) // 2)))
    for _ in range(10):
        n = rng.randint(100, 2000)
        a = [rng.randint(0, 10**6) for _ in range(n)]
        t.append(fmt(a, rng.randint(1, n * (n - 1) // 2)))
    n = 5 * 10**4
    tot = n * (n - 1) // 2
    t.append(fmt([rng.randint(0, 10**6) for _ in range(n)], 1))
    t.append(fmt([rng.randint(0, 10**6) for _ in range(n)], tot))
    t.append(fmt([rng.randint(0, 10**6) for _ in range(n)], rng.randint(1, tot)))
    t.append(fmt([rng.randint(0, 1000) for _ in range(n)], rng.randint(1, tot)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 2 <= n <= 5 * 10**4
    assert 1 <= k <= n * (n - 1) // 2
    assert all(0 <= x <= 10**6 for x in a)

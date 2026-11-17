import random

def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = []
    for a, k in [([1], 0), ([1], 1), ([1], 2), ([1, 3, 5, 6], 7), ([1, 3, 5, 6], 0),
                 ([1, 3, 5, 6], 6), ([-10**9, 10**9], 0), ([-10**9, 10**9], 10**9),
                 ([-10**9], -10**9), ([2, 4, 6, 8, 10], 5)]:
        t.append(fmt(a, k))
    for _ in range(25):
        n = rng.randint(1, 15)
        a = sorted(rng.sample(range(-25, 26), n))
        k = rng.randint(-30, 30)
        t.append(fmt(a, k))
    for _ in range(10):
        n = rng.randint(100, 3000)
        a = sorted(rng.sample(range(-10**9, 10**9 + 1), n))
        k = rng.choice(a) if rng.random() < 0.4 else rng.randint(-10**9, 10**9)
        t.append(fmt(a, k))
    for i in range(4):
        a = sorted(rng.sample(range(-10**9, 10**9 + 1), 10**5))
        k = [10**9, -10**9, rng.choice(a), rng.randint(-10**9, 10**9)][i]
        t.append(fmt(a, k))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert -10**9 <= k <= 10**9
    assert all(-10**9 <= x <= 10**9 for x in a)
    assert all(a[i] < a[i + 1] for i in range(n - 1))

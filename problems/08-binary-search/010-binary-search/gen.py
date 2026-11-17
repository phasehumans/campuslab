import random

def make(rng, n, lo=-10**9, hi=10**9):
    return sorted(rng.sample(range(lo, hi + 1), n))

def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = []
    t.append(fmt([5], 5))
    t.append(fmt([5], 2))
    t.append(fmt([5], 9))
    t.append(fmt([-10**9, 10**9], -10**9))
    t.append(fmt([-10**9, 10**9], 10**9))
    t.append(fmt([-10**9, 10**9], 0))
    t.append(fmt(list(range(1, 11)), 1))
    t.append(fmt(list(range(1, 11)), 10))
    t.append(fmt(list(range(1, 11)), 11))
    t.append(fmt(list(range(1, 11)), 0))
    for _ in range(25):
        n = rng.randint(1, 20)
        a = make(rng, n, -30, 30)
        k = rng.choice(a) if rng.random() < 0.5 else rng.randint(-35, 35)
        t.append(fmt(a, k))
    for _ in range(10):
        n = rng.randint(100, 2000)
        a = make(rng, n)
        k = rng.choice(a) if rng.random() < 0.6 else rng.randint(-10**9, 10**9)
        t.append(fmt(a, k))
    for i in range(4):
        a = make(rng, 10**5)
        k = [a[0], a[-1], rng.choice(a), a[50000] + 1 if a[50000] + 1 != a[50001] else -10**9 - 0][i]
        k = max(-10**9, min(10**9, k))
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

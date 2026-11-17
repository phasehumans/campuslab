import random

def rot(rng, n, lo, hi, k=None):
    a = sorted(rng.sample(range(lo, hi + 1), n))
    if k is None:
        k = rng.randint(0, n - 1)
    return a[k:] + a[:k]

def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([1], 0), fmt([1], 1), fmt([3, 1], 1), fmt([3, 1], 3), fmt([3, 1], 2),
         fmt([5, 1, 3], 5), fmt([5, 1, 3], 3), fmt(list(range(1, 11)), 10), fmt(list(range(1, 11)), 1),
         fmt([10**9, -10**9], -10**9)]
    for _ in range(25):
        n = rng.randint(1, 20)
        a = rot(rng, n, -30, 30)
        k = rng.choice(a) if rng.random() < 0.6 else rng.randint(-32, 32)
        t.append(fmt(a, k))
    for _ in range(10):
        n = rng.randint(100, 5000)
        a = rot(rng, n, -10**9, 10**9)
        k = rng.choice(a) if rng.random() < 0.6 else rng.randint(-10**9, 10**9)
        t.append(fmt(a, k))
    n = 10**5
    for i, kk in enumerate([0, 1, n - 1, rng.randint(0, n - 1)]):
        a = rot(rng, n, -10**9, 10**9, kk)
        k = [a[-1], a[0], rng.choice(a), 10**9][i]
        t.append(fmt(a, k))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert -10**9 <= k <= 10**9
    assert all(-10**9 <= x <= 10**9 for x in a)
    assert len(set(a)) == n
    drops = sum(1 for i in range(n - 1) if a[i] > a[i + 1])
    assert drops == 0 or (drops == 1 and a[-1] < a[0])

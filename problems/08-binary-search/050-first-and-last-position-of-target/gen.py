import random

def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = []
    for a, k in [([1], 1), ([1], 2), ([7, 7, 7, 7], 7), ([7, 7, 7, 7], 6), ([1, 2, 3], 1),
                 ([1, 2, 3], 3), ([1, 1, 2, 2, 3, 3], 2), ([-10**9, -10**9, 10**9], -10**9),
                 ([-10**9, 10**9, 10**9], 10**9), ([5, 7, 7, 8, 8, 10], 11)]:
        t.append(fmt(a, k))
    for _ in range(25):
        n = rng.randint(1, 20)
        a = sorted(rng.randint(-5, 5) for _ in range(n))
        k = rng.randint(-6, 6)
        t.append(fmt(a, k))
    for _ in range(10):
        n = rng.randint(100, 5000)
        a = sorted(rng.randint(-50, 50) for _ in range(n))
        k = rng.randint(-55, 55)
        t.append(fmt(a, k))
    a = [3] * 10**5
    t.append(fmt(a, 3))
    for i in range(3):
        a = sorted(rng.randint(-10**9 if i == 0 else -1000, 10**9 if i == 0 else 1000) for _ in range(10**5))
        k = rng.choice(a)
        t.append(fmt(a, k))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert -10**9 <= k <= 10**9
    assert all(-10**9 <= x <= 10**9 for x in a)
    assert all(a[i] <= a[i + 1] for i in range(n - 1))

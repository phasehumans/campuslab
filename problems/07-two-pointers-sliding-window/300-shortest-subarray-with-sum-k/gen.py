import random


def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}\n"


def generate(rng):
    M = 10**5
    N = 10**5
    t = [fmt([-1], 1), fmt([M], 10**9), fmt([M], M), fmt([2, -1, 2], 3), fmt([1, 2], 4),
         fmt([84, -37, 32, 40, 95], 167), fmt([-M] * 5, 1)]
    t.append(fmt([rng.randint(-M, M) for _ in range(N)], rng.randint(10**5, 10**6)))
    t.append(fmt([M] * N, 10**9))
    t.append(fmt([rng.randint(-M, M // 2) for _ in range(N)], 10**9))
    t.append(fmt([rng.randint(-M // 2, M) for _ in range(N)], 10**9))
    for _ in range(25):
        n = rng.randint(1, 10)
        t.append(fmt([rng.randint(-5, 6) for _ in range(n)], rng.randint(1, 15)))
    for _ in range(15):
        n = rng.randint(10, 3000)
        t.append(fmt([rng.randint(-1000, 1200) for _ in range(n)], rng.randint(1, 50000)))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, k = d[0], d[1]
    assert 1 <= n <= 10**5 and 1 <= k <= 10**9 and len(d) == n + 2
    assert all(-10**5 <= x <= 10**5 for x in d[2:])

import random


def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}\n"


def generate(rng):
    M = 10**4
    N = 10**5
    t = [fmt([-M], 1), fmt([1, 2, 3], 3), fmt([3, 2, 1], 2), fmt([5, 5, 5, 5], 2),
         fmt([1, 3, 1, 2, 0, 5], 3), fmt([-1, -2, -3, -4], 1)]
    t.append(fmt([rng.randint(-M, M) for _ in range(N)], 1000))
    t.append(fmt([M - (i % (2 * M + 1)) for i in range(N)], 50000))
    t.append(fmt([rng.randint(-M, M) for _ in range(N)], N))
    t.append(fmt([rng.randint(-5, 5) for _ in range(N)], 7))
    for _ in range(25):
        n = rng.randint(1, 10)
        t.append(fmt([rng.randint(-5, 5) for _ in range(n)], rng.randint(1, n)))
    for _ in range(15):
        n = rng.randint(10, 3000)
        t.append(fmt([rng.randint(-M, M) for _ in range(n)], rng.randint(1, n)))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, k = d[0], d[1]
    assert 1 <= n <= 10**5 and 1 <= k <= n and len(d) == n + 2
    assert all(-10**4 <= x <= 10**4 for x in d[2:])

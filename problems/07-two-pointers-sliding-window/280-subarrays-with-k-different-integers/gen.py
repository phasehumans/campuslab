import random


def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}\n"


def generate(rng):
    N = 10**5
    t = [fmt([1], 1), fmt([1, 1, 1], 1), fmt([1, 2, 3], 3), fmt([1, 2, 3], 2), fmt([1, 1, 2], 3),
         fmt([2, 1, 2, 1, 2], 2)]
    t.append(fmt([rng.randint(1, 3) for _ in range(N)], 2))
    t.append(fmt([rng.randint(1, N) for _ in range(N)], 300))
    t.append(fmt(list(range(1, N + 1)), 1))
    t.append(fmt([rng.randint(1, 50) for _ in range(N)], 25))
    for _ in range(25):
        n = rng.randint(1, 10)
        t.append(fmt([rng.randint(1, min(n, 4)) for _ in range(n)], rng.randint(1, n)))
    for _ in range(15):
        n = rng.randint(10, 3000)
        v = rng.randint(1, n)
        t.append(fmt([rng.randint(1, v) for _ in range(n)], rng.randint(1, min(n, v + 2))))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, k = d[0], d[1]
    assert 1 <= n <= 10**5 and 1 <= k <= n and len(d) == n + 2
    assert all(1 <= x <= n for x in d[2:])

import random


def fmt(a, k):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}\n"


def generate(rng):
    t = [fmt([0], 0), fmt([0], 1), fmt([1], 0), fmt([0, 0, 0], 0), fmt([0, 0, 0], 3),
         fmt([1, 1, 1], 0), fmt([1, 0, 1, 0, 1], 1)]
    N = 10**5
    t.append(fmt([rng.randint(0, 1) for _ in range(N)], 500))
    t.append(fmt([1 if rng.random() < 0.9 else 0 for _ in range(N)], 3))
    t.append(fmt([0] * N, N))
    t.append(fmt([rng.randint(0, 1) for _ in range(N)], 0))
    for _ in range(35):
        n = rng.randint(1, 12)
        t.append(fmt([rng.randint(0, 1) for _ in range(n)], rng.randint(0, n)))
    for _ in range(15):
        n = rng.randint(10, 3000)
        p = rng.random()
        t.append(fmt([1 if rng.random() < p else 0 for _ in range(n)], rng.randint(0, n // 4)))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, k = d[0], d[1]
    assert 1 <= n <= 10**5 and 0 <= k <= n and len(d) == n + 2
    assert all(x in (0, 1) for x in d[2:])

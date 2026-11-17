import random


def fmt(a, lim):
    return f"{len(a)} {lim}\n{' '.join(map(str, a))}\n"


def generate(rng):
    M = 3 * 10**4
    t = [fmt([1], 1), fmt([M], M), fmt([1, 1], 1), fmt([1, 1], 2), fmt([3, 5, 3, 4], 5),
         fmt([2, 2, 2, 2, 2], 4), fmt([1, 2, 3, 4, 5, 6], 7)]
    N = 5 * 10**4
    t.append(fmt([rng.randint(1, M) for _ in range(N)], M))
    t.append(fmt([M // 2] * N, M))
    t.append(fmt([rng.randint(1, 100) for _ in range(N)], 150))
    for _ in range(25):
        lim = rng.randint(1, 12)
        t.append(fmt([rng.randint(1, lim) for _ in range(rng.randint(1, 10))], lim))
    for _ in range(15):
        lim = rng.randint(10, M)
        t.append(fmt([rng.randint(1, lim) for _ in range(rng.randint(10, 3000))], lim))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, lim = d[0], d[1]
    assert 1 <= n <= 5 * 10**4 and len(d) == n + 2 and lim <= 3 * 10**4
    assert all(1 <= x <= lim for x in d[2:])

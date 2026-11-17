import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def blocks(rng, n, k):
    a = []
    while len(a) < n:
        a.extend([rng.randint(0, k)] * rng.randint(1, 8))
    return a[:n]


def generate(rng):
    t = [fmt([0]), fmt([7, 7, 7]), fmt([1, 2, 3, 2, 2]), fmt([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]),
         fmt([1, 2, 3, 4, 5]), fmt([100000, 0])]
    N = 10**5
    t.append(fmt([rng.randint(0, 10**5) for _ in range(N)]))
    t.append(fmt([rng.randint(0, 2) for _ in range(N)]))
    t.append(fmt([i % 2 for i in range(N)]))
    t.append(fmt(blocks(rng, N, 3)))
    for _ in range(25):
        t.append(fmt([rng.randint(0, 3) for _ in range(rng.randint(1, 12))]))
    for _ in range(15):
        t.append(fmt(blocks(rng, rng.randint(10, 3000), rng.randint(2, 6))))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n = d[0]
    assert 1 <= n <= 10**5 and len(d) == n + 1
    assert all(0 <= x <= 10**5 for x in d[1:])

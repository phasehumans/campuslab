import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def generate(rng):
    M = 10**4
    t = [fmt([0, 0]), fmt([M, M]), fmt([0, M]), fmt([1, 2, 1]), fmt([5, 4, 3, 2, 1]),
         fmt([1, 2, 3, 4, 5]), fmt([M] + [0] * 98 + [M])]
    t.append(fmt([rng.randint(0, M) for _ in range(100000)]))
    t.append(fmt([M] * 100000))
    t.append(fmt([i % (M + 1) for i in range(100000)]))
    t.append(fmt([min(i, 100000 - 1 - i) % (M + 1) for i in range(100000)]))
    for _ in range(25):
        t.append(fmt([rng.randint(0, 10) for _ in range(rng.randint(2, 10))]))
    for _ in range(15):
        t.append(fmt([rng.randint(0, M) for _ in range(rng.randint(10, 2000))]))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n = d[0]
    assert 2 <= n <= 10**5 and len(d) == n + 1
    assert all(0 <= x <= 10**4 for x in d[1:])

import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def generate(rng):
    M = 10**5
    N = 10**5
    t = [fmt([0]), fmt([M]), fmt([5, 0]), fmt([3, 0, 3]), fmt([0, 0, 0]), fmt([1, 2, 3, 4]),
         fmt([4, 3, 2, 1]), fmt([5, 1, 5, 1, 5]), fmt([2, 0, 5, 0, 2])]
    t.append(fmt([M] + [0] * (N - 2) + [M]))
    t.append(fmt([rng.randint(0, M) for _ in range(N)]))
    t.append(fmt([abs(N // 2 - i) for i in range(N)]))
    t.append(fmt([min(i, N - 1 - i) for i in range(N)]))
    for _ in range(25):
        t.append(fmt([rng.randint(0, 6) for _ in range(rng.randint(1, 12))]))
    for _ in range(15):
        t.append(fmt([rng.randint(0, rng.choice([10, 1000, M])) for _ in range(rng.randint(10, 3000))]))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n = d[0]
    assert 1 <= n <= 10**5 and len(d) == n + 1
    assert all(0 <= x <= 10**5 for x in d[1:])

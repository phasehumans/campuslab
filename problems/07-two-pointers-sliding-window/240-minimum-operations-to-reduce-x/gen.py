import random


def fmt(a, x):
    return f"{len(a)} {x}\n{' '.join(map(str, a))}\n"


def pick(rng, a):
    n = len(a)
    l = rng.randint(0, n)
    r = rng.randint(0, n - l)
    x = sum(a[:l]) + sum(a[n - r:]) if r else sum(a[:l])
    return max(1, x)


def generate(rng):
    t = [fmt([5], 5), fmt([5], 4), fmt([1, 1], 3), fmt([3, 2, 20, 1, 1, 3], 10),
         fmt([1, 1, 1, 1], 4), fmt([10**4] * 3, 10**9)]
    N = 10**5
    a = [rng.randint(1, 10**4) for _ in range(N)]
    t.append(fmt(a, pick(rng, a)))
    a = [rng.randint(1, 10**4) for _ in range(N)]
    t.append(fmt(a, sum(a)))
    a = [1] * N
    t.append(fmt(a, 77777))
    a = [rng.randint(1, 10**4) for _ in range(N)]
    t.append(fmt(a, rng.randint(1, 10**9)))
    for _ in range(25):
        n = rng.randint(1, 10)
        a = [rng.randint(1, 6) for _ in range(n)]
        t.append(fmt(a, pick(rng, a) if rng.random() < 0.7 else rng.randint(1, 30)))
    for _ in range(15):
        n = rng.randint(10, 3000)
        a = [rng.randint(1, 10**4) for _ in range(n)]
        t.append(fmt(a, pick(rng, a) if rng.random() < 0.8 else rng.randint(1, 10**7)))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, x = d[0], d[1]
    assert 1 <= n <= 10**5 and len(d) == n + 2 and 1 <= x <= 10**9
    assert all(1 <= v <= 10**4 for v in d[2:])

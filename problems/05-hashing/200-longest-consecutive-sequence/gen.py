import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def runs(rng, n, nruns, lo, hi):
    a = []
    while len(a) < n:
        s = rng.randint(lo, hi)
        L = rng.randint(1, max(1, n // nruns))
        a.extend(range(s, min(s + L, 10**9 + 1)))
    a = a[:n]
    rng.shuffle(a)
    return a


def generate(rng):
    t = ["0\n", fmt([5]), fmt([-10**9, 10**9]), fmt([10**9, 10**9 - 1]), fmt([3, 3, 3]),
         fmt([1, 3, 5, 7]), fmt([-1, 0, 1]), fmt(list(range(10, 0, -1)))]
    for _ in range(22):
        t.append(fmt([rng.randint(-10, 10) for _ in range(rng.randint(1, 12))]))
    for _ in range(12):
        t.append(fmt(runs(rng, rng.randint(10, 500), rng.randint(1, 10), -1000, 1000)))
    for _ in range(6):
        t.append(fmt([rng.randint(-10**9, 10**9) for _ in range(rng.randint(100, 2000))]))
    t.append(fmt(runs(rng, 100000, 3, -10**9, 10**9 - 100000)))
    a = list(range(-50000, 50000)); rng.shuffle(a); t.append(fmt(a))
    t.append(fmt([rng.randint(-10**9, 10**9) for _ in range(100000)]))
    t.append(fmt(runs(rng, 100000, 1000, -10**6, 10**6)))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    d = inp.split()
    n = int(d[0])
    assert 0 <= n <= 10**5 and len(d) == n + 1
    assert all(-10**9 <= int(x) <= 10**9 for x in d[1:])

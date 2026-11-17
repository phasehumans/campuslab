import random

LO, HI = -2**31, 2**31 - 1


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def perm_missing(rng, n, extra_noise):
    m = rng.randint(1, n + 1)
    a = [x for x in range(1, n + 2) if x != m][:n]
    for i in range(len(a)):
        if rng.random() < extra_noise:
            a[i] = rng.choice([rng.randint(LO, 0), rng.randint(n + 1, HI), rng.randint(1, n)])
    rng.shuffle(a)
    return a


def generate(rng):
    t = [fmt([1]), fmt([2]), fmt([0]), fmt([-5]), fmt([HI]), fmt([LO, HI]), fmt([1, 1]),
         fmt([2, 2]), fmt([7, 8, 9, 11, 12]), fmt(list(range(1, 11))), fmt(list(range(10, 0, -1)))]
    for _ in range(22):
        t.append(fmt([rng.randint(-3, 8) for _ in range(rng.randint(1, 8))]))
    for _ in range(12):
        t.append(fmt(perm_missing(rng, rng.randint(5, 500), rng.choice([0, 0.05, 0.3]))))
    for _ in range(4):
        t.append(fmt([rng.randint(LO, HI) for _ in range(1000)]))
    a = list(range(1, 100001)); rng.shuffle(a); t.append(fmt(a))
    t.append(fmt(perm_missing(rng, 100000, 0.0)))
    t.append(fmt(perm_missing(rng, 100000, 0.01)))
    t.append(fmt([rng.randint(1, 3) for _ in range(100000)]))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 10**5 and len(d) == n + 1
    assert all(LO <= int(x) <= HI for x in d[1:])

import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def unique_counts(rng, k):
    vals = rng.sample(range(-1000, 1001), k)
    cnts = rng.sample(range(1, 40), k)
    a = [v for v, c in zip(vals, cnts) for _ in range(c)]
    rng.shuffle(a)
    return a


def generate(rng):
    t = [fmt([5]), fmt([-1000]), fmt([1000, 1000]), fmt([1, 1, 2]), fmt([1, 2, 3]),
         fmt([7] * 1000), fmt(list(range(-1000, 0)))]
    for _ in range(15):
        n = rng.randint(1, 12)
        t.append(fmt([rng.randint(-3, 3) for _ in range(n)]))
    for _ in range(12):
        t.append(fmt(unique_counts(rng, rng.randint(1, 10))))
    for _ in range(8):
        a = unique_counts(rng, rng.randint(2, 20))
        a.append(a[0])  # may break uniqueness
        rng.shuffle(a)
        t.append(fmt(a[:1000]))
    for _ in range(6):
        t.append(fmt([rng.randint(-1000, 1000) for _ in range(1000)]))
    t.append(fmt(unique_counts(rng, 30)[:1000]))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 1000 and len(d) == n + 1
    assert all(-1000 <= int(x) <= 1000 for x in d[1:])

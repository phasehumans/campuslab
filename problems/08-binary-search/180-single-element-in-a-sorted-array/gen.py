import random

def make(rng, m, lo, hi, pos=None):
    vals = sorted(rng.sample(range(lo, hi + 1), m))
    if pos is None:
        pos = rng.randint(0, m - 1)
    a = []
    for i, v in enumerate(vals):
        a += [v] if i == pos else [v, v]
    return a

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([0]), fmt([10**9]), fmt([1, 2, 2]), fmt([1, 1, 2]), fmt([0, 0, 10**9]),
         fmt([0, 10**9, 10**9]), fmt([1, 1, 2, 3, 3]), fmt([4, 4, 5, 5, 6, 6, 7])]
    for _ in range(27):
        m = rng.randint(1, 10)
        t.append(fmt(make(rng, m, 0, 30)))
    for _ in range(10):
        m = rng.randint(50, 2500)
        t.append(fmt(make(rng, m, 0, 10**9)))
    m = 50000
    for p in [0, m - 1, rng.randint(0, m - 1), m // 2]:
        t.append(fmt(make(rng, m, 0, 10**9, p)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    a = list(map(int, d[1:]))
    assert len(a) == n and 1 <= n <= 10**5 and n % 2 == 1
    assert all(0 <= x <= 10**9 for x in a)
    assert all(a[i] <= a[i + 1] for i in range(n - 1))
    from collections import Counter
    c = Counter(a)
    assert sorted(c.values()).count(1) == 1 and all(v in (1, 2) for v in c.values())

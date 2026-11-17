import random

LO, HI = -2**31, 2**31 - 1

def unimodal(rng, n, p, lo=-1000, hi=1000):
    # strictly increasing up to index p, strictly decreasing after it
    vals = sorted(rng.sample(range(lo, hi + 1), n))
    peak = vals[-1]
    rest = vals[:-1]
    rng.shuffle(rest)
    left = sorted(rest[:p])
    right = sorted(rest[p:], reverse=True)
    return left + [peak] + right

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([7]), fmt([LO]), fmt([HI]), fmt([1, 2]), fmt([2, 1]), fmt([LO, HI]), fmt([HI, LO]),
         fmt(list(range(1, 21))), fmt(list(range(20, 0, -1))), fmt([LO, LO + 1, HI, HI - 1])]
    for _ in range(25):
        n = rng.randint(1, 20)
        t.append(fmt(unimodal(rng, n, rng.randint(0, n - 1), -30, 30)))
    for _ in range(10):
        n = rng.randint(100, 5000)
        t.append(fmt(unimodal(rng, n, rng.randint(0, n - 1), LO, HI)))
    n = 10**5
    t.append(fmt(unimodal(rng, n, 0, LO, HI)))
    t.append(fmt(unimodal(rng, n, n - 1, LO, HI)))
    t.append(fmt(unimodal(rng, n, rng.randint(0, n - 1), LO, HI)))
    t.append(fmt(unimodal(rng, n, n // 2, LO, HI)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    a = list(map(int, d[1:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert all(LO <= x <= HI for x in a)
    p = max(range(n), key=lambda i: a[i])
    assert all(a[i] < a[i + 1] for i in range(p))
    assert all(a[i] > a[i + 1] for i in range(p, n - 1))

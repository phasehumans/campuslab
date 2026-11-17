import random

def rot(rng, n, lo, hi, k=None):
    a = sorted(rng.sample(range(lo, hi + 1), n))
    if k is None:
        k = rng.randint(0, n - 1)
    return a[k:] + a[:k]

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5]), fmt([-10**9]), fmt([1, 2]), fmt([2, 1]), fmt([10**9, -10**9]),
         fmt(list(range(1, 11))), fmt(list(range(2, 11)) + [1]), fmt([10] + list(range(1, 10)))]
    for _ in range(27):
        n = rng.randint(1, 20)
        t.append(fmt(rot(rng, n, -30, 30)))
    for _ in range(10):
        n = rng.randint(100, 5000)
        t.append(fmt(rot(rng, n, -10**9, 10**9)))
    n = 10**5
    for k in [0, 1, n - 1, rng.randint(0, n - 1)]:
        t.append(fmt(rot(rng, n, -10**9, 10**9, k)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    a = list(map(int, d[1:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert all(-10**9 <= x <= 10**9 for x in a)
    assert len(set(a)) == n
    drops = sum(1 for i in range(n - 1) if a[i] > a[i + 1])
    assert drops == 0 or (drops == 1 and a[-1] < a[0])

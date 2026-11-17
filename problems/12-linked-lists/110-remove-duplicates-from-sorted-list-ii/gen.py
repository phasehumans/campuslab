import random

def fmt(a):
    return f"{len(a)}\n" + " ".join(map(str, a))

def mk(n, lo, hi, rng):
    from collections import Counter
    a = sorted(rng.randint(lo, hi) for _ in range(n))
    if 1 not in Counter(a).values():
        a.append(hi + 1)
    return a

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5]), fmt([1, 2]), fmt([1, 1, 2]), fmt([1, 2, 2]), fmt([-10**9, -10**9, 10**9]),
         fmt([1, 1, 1, 2, 3, 3, 3]), fmt([1, 2, 3, 4, 5])]
    for _ in range(35):
        t.append(fmt(mk(rng.randint(1, 12), -4, 4, rng)))
    for _ in range(13):
        n = rng.randint(10, 3000)
        t.append(fmt(mk(n, -n // 2, n // 2, rng)))
    a = sorted(rng.randint(-10**9, 10**9) for _ in range(10**5)); t.append(fmt(a))
    a = sorted([rng.randint(-50000, 50000) for _ in range(99999)] + [10**9]); t.append(fmt(a))
    a = [i // 2 for i in range(99998)] + [10**6]; t.append(fmt(a))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 10**5 and len(d) == n + 1
    a = [int(v) for v in d[1:]]
    assert all(-10**9 <= v <= 10**9 for v in a)
    assert a == sorted(a)
    from collections import Counter
    assert 1 in Counter(a).values()

import random

def fmt(ls):
    return f"{len(ls)}\n" + "\n".join(" ".join(map(str, [len(l)] + l)) for l in ls)

def rl(m, lo, hi, rng):
    return sorted(rng.randint(lo, hi) for _ in range(m))

def mk(k, maxm, lo, hi, rng):
    ls = [rl(rng.randint(0, maxm), lo, hi, rng) for _ in range(k)]
    if not any(ls):
        ls[rng.randrange(k)] = rl(rng.randint(1, maxm if maxm else 1), lo, hi, rng)
    return ls

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[5]]), fmt([[], [1]]), fmt([[1, 1, 1], [1, 1]]), fmt([[1, 2, 3], [], [4, 5]]),
         fmt([[-10**9], [10**9], [0]]), fmt([[3], [2], [1]])]
    for _ in range(25):
        t.append(fmt(mk(rng.randint(1, 5), 5, -10, 10, rng)))
    for _ in range(14):
        t.append(fmt(mk(rng.randint(1, 200), 50, -10**9, 10**9, rng)))
    t.append(fmt(mk(10**4, 10, -10**9, 10**9, rng)))
    t.append(fmt(mk(2, 50000, -10**9, 10**9, rng)))
    t.append(fmt(mk(100, 1000, -5, 5, rng)))
    t.append(fmt([[] for _ in range(9999)] + [rl(10, -3, 3, rng)]))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    k = int(d[0])
    assert 1 <= k <= 10**4
    p = 1
    total = 0
    for _ in range(k):
        m = int(d[p]); p += 1
        a = [int(x) for x in d[p:p + m]]; p += m
        assert len(a) == m and a == sorted(a)
        assert all(-10**9 <= x <= 10**9 for x in a)
        total += m
    assert p == len(d)
    assert 1 <= total <= 10**5

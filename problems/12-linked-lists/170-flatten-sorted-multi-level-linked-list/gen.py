import random

def fmt(ls):
    return f"{len(ls)}\n" + " ".join(str(len(l)) for l in ls) + "\n" + " ".join(" ".join(map(str, l)) for l in ls)

def rl(m, lo, hi, rng):
    return sorted(rng.randint(lo, hi) for _ in range(m))

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[5]]), fmt([[1], [1]]), fmt([[3], [2], [1]]), fmt([[-10**9, 10**9], [0]]),
         fmt([[1, 2, 3], [4, 5, 6]]), fmt([[4, 5, 6], [1, 2, 3]])]
    for _ in range(25):
        n = rng.randint(1, 6)
        t.append(fmt([rl(rng.randint(1, 5), -10, 10, rng) for _ in range(n)]))
    for _ in range(15):
        n = rng.randint(5, 100)
        t.append(fmt([rl(rng.randint(1, 50), -10**9, 10**9, rng) for _ in range(n)]))
    t.append(fmt([rl(50, -10**9, 10**9, rng) for _ in range(100)]))
    t.append(fmt([rl(50, -3, 3, rng) for _ in range(100)]))
    t.append(fmt([rl(1, -10**9, 10**9, rng) for _ in range(100)]))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 100
    sizes = [int(x) for x in d[1:1 + n]]
    assert len(sizes) == n and all(1 <= m <= 50 for m in sizes)
    vals = [int(x) for x in d[1 + n:]]
    assert len(vals) == sum(sizes)
    p = 0
    for m in sizes:
        a = vals[p:p + m]; p += m
        assert a == sorted(a)
    assert all(-10**9 <= v <= 10**9 for v in vals)

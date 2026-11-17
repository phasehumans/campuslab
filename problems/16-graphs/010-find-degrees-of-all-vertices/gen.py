import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def re(rng, n, m):
    out = []
    for _ in range(m):
        u = rng.randrange(n); v = rng.randrange(n - 1)
        if v >= u: v += 1
        out.append((u, v))
    return out

def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, []), fmt(2, []), fmt(2, [(0, 1)]), fmt(2, [(0, 1), (1, 0), (0, 1)]), fmt(5, [(0, i) for i in range(1, 5)]),
         fmt(6, [(i, i + 1) for i in range(5)])]
    N = 10**5
    t.append(fmt(N, re(rng, N, 150000)))
    t.append(fmt(N, []))
    t.append(fmt(N, [(0, i) for i in range(1, N)]))
    t.append(fmt(1000, re(rng, 1000, 150000)))
    for _ in range(12):
        n = rng.randint(2, 3000)
        t.append(fmt(n, re(rng, n, rng.randint(0, 3 * n))))
    for _ in range(60):
        n = rng.randint(2, 7)
        t.append(fmt(n, re(rng, n, rng.randint(0, 8))))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 10**5 and 0 <= m <= 2 * 10**5 and len(d) == 2 + 2 * m
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        assert 0 <= u < n and 0 <= v < n and u != v

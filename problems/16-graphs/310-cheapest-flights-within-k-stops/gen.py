import random

def fmt(n, edges, s, t, k):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v} {w}" for u, v, w in edges] + [f"{s} {t} {k}"])

def rg(rng, n, m, whi):
    pairs = set()
    m = min(m, n * (n - 1))
    if m > n * (n - 1) // 2:
        allp = [(u, v) for u in range(n) for v in range(n) if u != v]
        rng.shuffle(allp)
        pairs = allp[:m]
    else:
        while len(pairs) < m:
            u, v = rng.randrange(n), rng.randrange(n)
            if u != v:
                pairs.add((u, v))
        pairs = list(pairs)
    return [(u, v, rng.randint(1, whi)) for u, v in pairs]

def query(rng, n):
    s, t = rng.sample(range(n), 2)
    return s, t, rng.randrange(n)

def generate(rng: random.Random) -> list[str]:
    W = 10**4
    t = [fmt(2, [], 0, 1, 0), fmt(2, [(0, 1, 5)], 0, 1, 0), fmt(2, [(1, 0, 5)], 0, 1, 1),
         fmt(3, [(0, 1, 1), (1, 2, 1), (0, 2, 10)], 0, 2, 0), fmt(3, [(0, 1, 1), (1, 2, 1), (0, 2, 10)], 0, 2, 1)]
    # long cheap chain vs expensive shortcut
    chain = [(i, i + 1, 1) for i in range(99)] + [(0, 99, W)]
    t.append(fmt(100, chain, 0, 99, 98))
    t.append(fmt(100, chain, 0, 99, 97))
    t.append(fmt(100, rg(rng, 100, 9900, W), *query(rng, 100)))
    t.append(fmt(100, rg(rng, 100, 9900, W), 0, 99, 0))
    t.append(fmt(100, rg(rng, 100, 300, W), *query(rng, 100)))
    for _ in range(14):
        n = rng.randint(3, 100)
        s, tt, _ = query(rng, n)
        t.append(fmt(n, rg(rng, n, rng.randint(0, min(n * (n - 1), 4 * n)), rng.choice([10, W])), s, tt, rng.randrange(min(n, 6))))
    for _ in range(60):
        n = rng.randint(2, 6)
        s, tt, k = query(rng, n)
        t.append(fmt(n, rg(rng, n, rng.randint(0, n * (n - 1)), 20), s, tt, k))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 100 and 0 <= m <= n * (n - 1) and len(d) == 5 + 3 * m
    seen = set()
    for i in range(m):
        u, v, w = d[2 + 3 * i:5 + 3 * i]
        assert 0 <= u < n and 0 <= v < n and u != v and 1 <= w <= 10**4
        assert (u, v) not in seen
        seen.add((u, v))
    s, t, k = d[2 + 3 * m:]
    assert 0 <= s < n and 0 <= t < n and s != t and 0 <= k < n

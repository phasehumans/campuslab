import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def connected(rng, n, m):
    """Random simple connected graph with n vertices and m edges (n-1 <= m)."""
    perm = list(range(n)); rng.shuffle(perm)
    es = set()
    for i in range(1, n):
        u, v = perm[i], perm[rng.randrange(i)]
        es.add((min(u, v), max(u, v)))
    maxm = n * (n - 1) // 2
    m = min(m, maxm)
    while len(es) < m:
        u, v = rng.randrange(n), rng.randrange(n)
        if u != v:
            es.add((min(u, v), max(u, v)))
    out = [(u, v) if rng.random() < 0.5 else (v, u) for u, v in es]
    rng.shuffle(out)
    return out

def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, []), fmt(2, [(1, 0)]), fmt(3, [(0, 1), (1, 2), (2, 0)]), fmt(5, [(0, 4), (0, 3), (0, 2), (0, 1)])]
    t.append(fmt(100, connected(rng, 100, 1000)))
    t.append(fmt(100, connected(rng, 100, 99)))
    t.append(fmt(46, connected(rng, 46, 1000)))
    t.append(fmt(100, [(i, i + 1) for i in range(99)]))
    for _ in range(14):
        n = rng.randint(5, 100)
        t.append(fmt(n, connected(rng, n, rng.randint(n - 1, min(1000, 4 * n)))))
    for _ in range(60):
        n = rng.randint(2, 7)
        t.append(fmt(n, connected(rng, n, rng.randint(n - 1, n + 3))))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 100 and 0 <= m <= 1000 and len(d) == 2 + 2 * m
    par = list(range(n))
    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]; x = par[x]
        return x
    seen = set()
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        assert 0 <= u < n and 0 <= v < n and u != v
        key = (min(u, v), max(u, v)); assert key not in seen; seen.add(key)
        par[find(u)] = find(v)
    assert len({find(x) for x in range(n)}) == 1, "graph must be connected"

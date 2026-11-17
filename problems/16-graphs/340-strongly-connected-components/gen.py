import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def planted(rng, n, k, m):
    """k groups, each made strongly connected by a cycle, plus DAG edges between groups and noise inside."""
    perm = list(range(n)); rng.shuffle(perm)
    cuts = sorted(rng.sample(range(1, n), k - 1)) if k > 1 else []
    groups = [perm[a:b] for a, b in zip([0] + cuts, cuts + [n])]
    out = []
    for g in groups:
        if len(g) > 1:
            out += [(g[i], g[(i + 1) % len(g)]) for i in range(len(g))]
    while len(out) < m:
        a = rng.randrange(k); b = rng.randrange(k)
        if a > b:
            a, b = b, a
        out.append((rng.choice(groups[a]), rng.choice(groups[b])))
    out = out[:max(m, 0)] if len(out) > m else out
    rng.shuffle(out)
    return out

def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, []), fmt(1, [(0, 0)]), fmt(2, [(0, 1)]), fmt(2, [(0, 1), (1, 0)]), fmt(3, [(0, 1), (1, 2), (2, 0)]),
         fmt(8, [(0, 1), (1, 2), (2, 3), (2, 4), (3, 0), (4, 5), (5, 6), (6, 7), (7, 4)])]
    N = 5 * 10**4
    t.append(fmt(N, [(i, i + 1) for i in range(N - 1)] + [(N - 1, 0)]))
    t.append(fmt(N, [(i, i + 1) for i in range(N - 1)]))
    t.append(fmt(N, planted(rng, N, 500, 10**5)))
    t.append(fmt(N, [(rng.randrange(N), rng.randrange(N)) for _ in range(10**5)]))
    t.append(fmt(N, planted(rng, N, 20000, 70000)))
    for _ in range(14):
        n = rng.randint(5, 3000)
        k = rng.randint(1, n)
        es = planted(rng, n, k, 0)
        es = planted(rng, n, k, len(es) + rng.randint(0, 2 * n))
        t.append(fmt(n, es))
    for _ in range(60):
        n = rng.randint(1, 7)
        t.append(fmt(n, [(rng.randrange(n), rng.randrange(n)) for _ in range(rng.randint(0, 2 * n))]))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 5 * 10**4 and 0 <= m <= 10**5 and len(d) == 2 + 2 * m
    assert all(0 <= x < n for x in d[2:])

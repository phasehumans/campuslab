import random

def fmt(n, s, edges):
    return "\n".join([f"{n} {len(edges)} {s}"] + [f"{u} {v} {w}" for u, v, w in edges])

def rand_graph(rng, n, m, whi, comps=1):
    label = [rng.randrange(comps) for _ in range(n)]
    groups = {}
    for v, g in enumerate(label):
        groups.setdefault(g, []).append(v)
    out = []
    for g in groups.values():
        rng.shuffle(g)
        for i in range(1, len(g)):
            out.append((g[i], g[rng.randrange(i)], rng.randint(1, whi)))
    gl = list(groups.values())
    while len(out) < m:
        g = rng.choice(gl)
        out.append((rng.choice(g), rng.choice(g), rng.randint(1, whi)))
    rng.shuffle(out)
    return out[:m] if len(out) > m else out

def generate(rng: random.Random) -> list[str]:
    W = 10**4
    t = [fmt(1, 0, []), fmt(2, 1, []), fmt(2, 0, [(0, 1, 7), (1, 0, 3)]), fmt(3, 2, [(0, 0, 5), (1, 2, 4)]),
         fmt(4, 0, [(0, 1, 10), (0, 2, 1), (2, 1, 2), (1, 3, 1)]), fmt(5, 0, [(0, 1, 2), (0, 2, 4), (1, 2, 1), (1, 3, 7), (2, 4, 3), (3, 4, 1)])]
    N = 10**4
    t.append(fmt(N, 0, rand_graph(rng, N, 5 * 10**4, W)))
    t.append(fmt(N, rng.randrange(N), rand_graph(rng, N, 5 * 10**4, 10, 3)))
    t.append(fmt(N, 0, [(i, i + 1, W) for i in range(N - 1)]))
    t.append(fmt(N, N - 1, rand_graph(rng, N, 5 * 10**4, W, 50)))
    for i in range(14):
        n = rng.randint(2, 2000)
        t.append(fmt(n, rng.randrange(n), rand_graph(rng, n, rng.randint(n, 4 * n), rng.choice([5, W]), rng.choice([1, 1, 3]))))
    for _ in range(60):
        n = rng.randint(1, 7)
        es = [(rng.randrange(n), rng.randrange(n), rng.randint(1, 9)) for _ in range(rng.randint(0, 2 * n))]
        t.append(fmt(n, rng.randrange(n), es))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m, s = d[0], d[1], d[2]
    assert 1 <= n <= 10**4 and 0 <= m <= 5 * 10**4 and 0 <= s < n and len(d) == 3 + 3 * m
    for i in range(m):
        u, v, w = d[3 + 3 * i:6 + 3 * i]
        assert 0 <= u < n and 0 <= v < n and 1 <= w <= 10**4

import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def graph(rng, n, extra, blocks=1):
    """Connected simple graph: a random tree plus `extra` non-tree edges, mostly inside
    `blocks` vertex groups so that some tree edges stay bridges. Vertex n-1 is always a leaf."""
    core = n - 1
    perm = list(range(core)); rng.shuffle(perm)
    es = set()
    for i in range(1, core):
        u, v = perm[i], perm[rng.randrange(max(0, i - 3), i) if rng.random() < 0.7 else rng.randrange(i)]
        es.add((min(u, v), max(u, v)))
    es.add((rng.randrange(core), n - 1))
    group = [rng.randrange(blocks) for _ in range(core)]
    members = {}
    for v in range(core):
        members.setdefault(group[v], []).append(v)
    gl = [g for g in members.values() if len(g) >= 2]
    tries = 0
    target = len(es) + extra
    while gl and len(es) < target and tries < 20 * extra + 10:
        tries += 1
        g = rng.choice(gl)
        u, v = rng.sample(g, 2)
        es.add((min(u, v), max(u, v)))
    out = [(u, v) if rng.random() < 0.5 else (v, u) for u, v in es]
    rng.shuffle(out)
    return out

def generate(rng: random.Random) -> list[str]:
    t = [fmt(2, [(1, 0)]), fmt(3, [(0, 1), (1, 2)]), fmt(5, [(0, 1), (1, 2), (2, 0), (2, 3), (3, 4)]),
         fmt(6, [(0, 1), (1, 2), (2, 0), (3, 4), (4, 5), (5, 3), (2, 3)]), fmt(5, [(0, 1), (0, 2), (0, 3), (0, 4)])]
    N = 10**5
    t.append(fmt(N, [(i, i + 1) for i in range(N - 1)]))
    t.append(fmt(N, graph(rng, N, 0)))
    t.append(fmt(N, graph(rng, N, 1, 1)))
    t.append(fmt(N, graph(rng, N, 10**5 - N + 1, 300)))
    t.append(fmt(N // 2, graph(rng, N // 2, 50000, 5000)))
    for _ in range(14):
        n = rng.randint(5, 3000)
        t.append(fmt(n, graph(rng, n, rng.randint(0, 2 * n), rng.randint(1, max(1, n // 3)))))
    for _ in range(60):
        n = rng.randint(2, 8)
        t.append(fmt(n, graph(rng, n, rng.randint(0, n), rng.randint(1, 3))))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 2 <= n <= 10**5 and n - 1 <= m <= 10**5 and len(d) == 2 + 2 * m
    par = list(range(n))
    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]; x = par[x]
        return x
    seen = set()
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        assert 0 <= u < n and 0 <= v < n and u != v
        k = (min(u, v), max(u, v)); assert k not in seen; seen.add(k)
        par[find(u)] = find(v)
    assert len({find(x) for x in range(n)}) == 1, "network must be connected"

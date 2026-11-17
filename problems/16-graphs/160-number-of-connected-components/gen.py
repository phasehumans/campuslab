import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def clustered(rng, n, k, m):
    # k groups of vertices, edges only inside groups
    label = [rng.randrange(k) for _ in range(n)]
    groups = {}
    for v, g in enumerate(label):
        groups.setdefault(g, []).append(v)
    gl = list(groups.values())
    out = []
    for _ in range(m):
        g = rng.choice(gl)
        out.append((rng.choice(g), rng.choice(g)))
    return out

def generate(rng: random.Random) -> list[str]:
    N = 10**5
    t = [fmt(1, []), fmt(1, [(0, 0)]), fmt(2, []), fmt(2, [(1, 0)]), fmt(4, [(0, 1), (1, 0), (2, 2)]), fmt(6, [(0, 5), (1, 4), (2, 3)])]
    t.append(fmt(N, []))
    t.append(fmt(N, clustered(rng, N, 1000, 150000)))
    t.append(fmt(N, [(rng.randrange(N), rng.randrange(N)) for _ in range(150000)]))
    t.append(fmt(N, [(i, i + 1) for i in range(0, N - 1, 2)]))
    for _ in range(14):
        n = rng.randint(10, 3000)
        t.append(fmt(n, clustered(rng, n, rng.randint(1, n), rng.randint(0, 2 * n))))
    for _ in range(60):
        n = rng.randint(1, 8)
        t.append(fmt(n, [(rng.randrange(n), rng.randrange(n)) for _ in range(rng.randint(0, n))]))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 10**5 and 0 <= m <= 2 * 10**5 and len(d) == 2 + 2 * m
    assert all(0 <= x < n for x in d[2:])

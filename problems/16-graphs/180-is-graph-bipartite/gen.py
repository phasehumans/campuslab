import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def bip(rng, n, m, odd_edges=0):
    side = [rng.randrange(2) for _ in range(n)]
    A = [v for v in range(n) if side[v] == 0]; B = [v for v in range(n) if side[v] == 1]
    out = []
    if A and B:
        for _ in range(m):
            u, v = rng.choice(A), rng.choice(B)
            out.append((u, v) if rng.random() < 0.5 else (v, u))
    for _ in range(odd_edges):
        S = A if (len(A) >= 2 and (rng.random() < 0.5 or len(B) < 2)) else B
        if len(S) >= 2:
            u, v = rng.sample(S, 2)
            out.insert(rng.randrange(len(out) + 1), (u, v))
    return out

def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, []), fmt(2, [(0, 1)]), fmt(3, [(0, 1), (1, 2)]), fmt(5, [(0, 1), (1, 2), (2, 3), (3, 4), (4, 0)]),
         fmt(6, [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 0)]), fmt(6, [(0, 1), (2, 3), (3, 4), (4, 2)])]
    N = 10**4
    t.append(fmt(N, bip(rng, N, 2 * 10**4)))
    t.append(fmt(N, bip(rng, N, 2 * 10**4 - 1, 1)))
    cyc = [(i, (i + 1) % N) for i in range(N)]
    t.append(fmt(N, cyc))
    t.append(fmt(N - 1, [(i, (i + 1) % (N - 1)) for i in range(N - 1)]))
    for i in range(14):
        n = rng.randint(3, 2000)
        t.append(fmt(n, bip(rng, n, rng.randint(0, 3 * n), i % 2)))
    for i in range(60):
        n = rng.randint(2, 8)
        t.append(fmt(n, bip(rng, n, rng.randint(0, n + 2), int(rng.random() < 0.4))))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 10**4 and 0 <= m <= 2 * 10**4 and len(d) == 2 + 2 * m
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        assert 0 <= u < n and 0 <= v < n and u != v

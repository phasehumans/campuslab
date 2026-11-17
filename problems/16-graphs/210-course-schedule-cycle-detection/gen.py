import random

def fmt(n, edges):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges])

def dag(rng, n, m, back=0):
    order = list(range(n)); rng.shuffle(order)
    out = []
    if n >= 2:
        for _ in range(m):
            i, j = sorted(rng.sample(range(n), 2))
            out.append((order[i], order[j]))
        for _ in range(back):
            i, j = sorted(rng.sample(range(n), 2))
            out.insert(rng.randrange(len(out) + 1), (order[j], order[i]))
    return out

def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, []), fmt(1, [(0, 0)]), fmt(3, [(0, 1), (1, 2)]), fmt(3, [(0, 1), (1, 2), (2, 0)]), fmt(3, [(0, 1), (0, 1)]),
         fmt(4, [(0, 1), (2, 3), (3, 2)])]
    t.append(fmt(2000, dag(rng, 2000, 5000)))
    t.append(fmt(2000, dag(rng, 2000, 4999, 1)))
    chain = [(i, i + 1) for i in range(1999)]
    t.append(fmt(2000, chain))
    t.append(fmt(2000, chain + [(1999, 0)]))
    for i in range(14):
        n = rng.randint(2, 500)
        t.append(fmt(n, dag(rng, n, rng.randint(0, min(5000, 3 * n)), i % 2)))
    for i in range(60):
        n = rng.randint(2, 7)
        t.append(fmt(n, dag(rng, n, rng.randint(0, n + 2), int(rng.random() < 0.4))))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 2000 and 0 <= m <= 5000 and len(d) == 2 + 2 * m
    assert all(0 <= x < n for x in d[2:])

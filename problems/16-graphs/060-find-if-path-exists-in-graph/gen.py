import random

def fmt(n, edges, s, t):
    return "\n".join([f"{n} {len(edges)}"] + [f"{u} {v}" for u, v in edges] + [f"{s} {t}"])

def re(rng, n, m):
    return [(rng.randrange(n), rng.randrange(n)) for _ in range(m)]

def two_blobs(rng, n, m):
    # edges only inside the halves [0, n/2) and [n/2, n), then one query across
    h = n // 2
    out = []
    for _ in range(m):
        if rng.random() < 0.5:
            out.append((rng.randrange(h), rng.randrange(h)))
        else:
            out.append((rng.randrange(h, n), rng.randrange(h, n)))
    return out

def generate(rng: random.Random) -> list[str]:
    N = 10**5
    t = [fmt(1, [], 0, 0), fmt(2, [], 0, 1), fmt(2, [(0, 1)], 1, 0), fmt(3, [(0, 0), (1, 2)], 0, 2),
         fmt(4, [(0, 1), (2, 3)], 3, 2), fmt(5, [(0, 1), (1, 2), (2, 3), (3, 4)], 0, 4)]
    path = [(i, i + 1) for i in range(N - 1)]
    rng.shuffle(path)
    t.append(fmt(N, path, 0, N - 1))
    t.append(fmt(N, [e for e in path if e != (N // 2, N // 2 + 1)], 0, N - 1))
    t.append(fmt(N, two_blobs(rng, N, 150000), 0, N - 1))
    t.append(fmt(N, re(rng, N, 150000), rng.randrange(N), rng.randrange(N)))
    for i in range(14):
        n = rng.randint(10, 3000)
        es = two_blobs(rng, n, rng.randint(0, 2 * n)) if i % 2 else re(rng, n, rng.randint(0, n))
        t.append(fmt(n, es, rng.randrange(n), rng.randrange(n)))
    for _ in range(60):
        n = rng.randint(1, 7)
        t.append(fmt(n, re(rng, n, rng.randint(0, n)), rng.randrange(n), rng.randrange(n)))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n, m = d[0], d[1]
    assert 1 <= n <= 10**5 and 0 <= m <= 2 * 10**5 and len(d) == 4 + 2 * m
    assert all(0 <= x < n for x in d[2:])

import random

MAXV = 2 * 10**9

def fmt(g, s):
    return f"{len(g)}\n{' '.join(map(str, g))}\n{len(s)}\n{' '.join(map(str, s))}"

def generate(rng: random.Random) -> list[str]:
    t = []
    t.append(fmt([1], [1]))
    t.append(fmt([2], [1]))
    t.append(fmt([MAXV], [MAXV]))
    t.append(fmt([MAXV, MAXV], [MAXV - 1]))
    t.append(fmt([1, 1, 1], [1]))
    t.append(fmt([5], [1, 2, 3, 4]))
    t.append(fmt([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]))
    t.append(fmt([10, 9, 8, 7], [1, 2, 3]))
    N = 3 * 10**4
    t.append(fmt([rng.randint(1, MAXV) for _ in range(N)], [rng.randint(1, MAXV) for _ in range(N)]))
    t.append(fmt([rng.randint(1, 1000) for _ in range(N)], [rng.randint(1, 1000) for _ in range(N)]))
    t.append(fmt([MAXV] * N, [rng.randint(1, MAXV) for _ in range(N)]))
    t.append(fmt([1] * N, [rng.randint(1, MAXV) for _ in range(rng.randint(1, N))]))
    for _ in range(40):
        n = rng.randint(1, 10); m = rng.randint(1, 10)
        t.append(fmt([rng.randint(1, 12) for _ in range(n)], [rng.randint(1, 12) for _ in range(m)]))
    for _ in range(12):
        n = rng.randint(50, 3000); m = rng.randint(50, 3000)
        hi = rng.choice([100, 10**6, MAXV])
        t.append(fmt([rng.randint(1, hi) for _ in range(n)], [rng.randint(1, hi) for _ in range(m)]))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); assert 1 <= n <= 3 * 10**4
    g = list(map(int, d[1:1 + n]))
    m = int(d[1 + n]); assert 1 <= m <= 3 * 10**4
    s = list(map(int, d[2 + n:]))
    assert len(g) == n and len(s) == m
    assert all(1 <= x <= MAXV for x in g + s)

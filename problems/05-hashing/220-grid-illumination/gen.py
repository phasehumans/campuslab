import random


def fmt(n, lamps, qs):
    return (f"{n} {len(lamps)} {len(qs)}\n" + "".join(f"{r} {c}\n" for r, c in lamps)
            + "".join(f"{r} {c}\n" for r, c in qs))


def rnd(rng, n, L, Q):
    lamps = [(rng.randrange(n), rng.randrange(n)) for _ in range(L)]
    qs = [(rng.randrange(n), rng.randrange(n)) for _ in range(Q)]
    return fmt(n, lamps, qs)


def near(rng, n, L, Q):
    lamps = [(rng.randrange(n), rng.randrange(n)) for _ in range(L)]
    qs = []
    for _ in range(Q):
        r, c = rng.choice(lamps)
        r = min(n - 1, max(0, r + rng.randint(-2, 2)))
        c = min(n - 1, max(0, c + rng.randint(-2, 2)))
        qs.append((r, c))
    return fmt(n, lamps, qs)


def generate(rng):
    N = 10**9
    t = [fmt(1, [(0, 0)], [(0, 0), (0, 0)]), fmt(2, [(0, 0), (0, 0)], [(1, 1), (1, 1)]),
         fmt(N, [(0, 0)], [(N - 1, N - 1)]), fmt(N, [(N - 1, 0)], [(0, N - 1), (0, N - 1)]),
         fmt(N, [(0, N - 1), (N - 1, 0)], [(N - 1, N - 1), (5, 5)]),
         fmt(3, [(1, 1)], [(0, 0), (2, 2)]), fmt(5, [(0, 0), (4, 4)], [(2, 2), (1, 3), (2, 2)])]
    for _ in range(4):
        t.append(rnd(rng, N, 20000, 20000))
    t.append(near(rng, 10**5, 20000, 20000))
    for _ in range(20):
        n = rng.randint(1, 6)
        t.append(rnd(rng, n, rng.randint(1, 6), rng.randint(1, 6)))
    for _ in range(12):
        n = rng.randint(5, 50)
        t.append(near(rng, n, rng.randint(1, 60), rng.randint(1, 60)))
    for _ in range(10):
        t.append(rnd(rng, rng.choice([100, 1000, N]), rng.randint(100, 2000), rng.randint(100, 2000)))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, L, Q = d[0], d[1], d[2]
    assert 1 <= n <= 10**9 and 1 <= L <= 20000 and 1 <= Q <= 20000
    assert len(d) == 3 + 2 * (L + Q)
    assert all(0 <= x < n for x in d[3:])

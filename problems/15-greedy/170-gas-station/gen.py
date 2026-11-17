import random

def count_valid_starts(gas, cost):
    n = len(gas)
    P = [0] * (n + 1)
    for i in range(n):
        P[i + 1] = P[i] + gas[i] - cost[i]
    total = P[n]
    if total < 0:
        return 0
    suf = [0] * (n + 2)
    suf[n + 1] = float("inf")
    for j in range(n, 0, -1):
        suf[j] = min(P[j], suf[j + 1])
    cnt = 0
    pre = float("inf")  # min of P[1..s]
    for s in range(n):
        if s >= 1:
            pre = min(pre, P[s])
        if suf[s + 1] >= P[s] and (s == 0 or total + pre >= P[s]):
            cnt += 1
    return cnt

def fmt(g, c):
    return f"{len(g)}\n{' '.join(map(str, g))}\n{' '.join(map(str, c))}"

def make(rng, n, hi, want_ok):
    for _ in range(200):
        g = [rng.randint(0, hi) for _ in range(n)]
        c = [rng.randint(0, hi) for _ in range(n)]
        if want_ok:
            # nudge the total up so a solution likely exists
            i = rng.randrange(n)
            g[i] = min(10**4, g[i] + rng.randint(0, hi))
        k = count_valid_starts(g, c)
        if want_ok and k == 1:
            return fmt(g, c)
        if not want_ok and k == 0:
            return fmt(g, c)
    return None

def construct_unique(rng, n, hi):
    """Unique start by construction: starting at 0 every prefix sum stays >= 1, the final
    total T is below every intermediate prefix sum, so any other start runs dry at the end.
    The whole circuit is then rotated randomly."""
    if n == 1:
        c = rng.randint(0, hi)
        return fmt([rng.randint(c, hi)], [c])
    top = max(2, hi - 1)
    d = []
    P = 0
    lo_seen = None
    for i in range(n - 1):
        lo = 1 - P
        up = min(top - P, hi)
        lo = max(lo, -hi)
        x = rng.randint(lo, up)
        d.append(x)
        P += x
        lo_seen = P if lo_seen is None else min(lo_seen, P)
    T = rng.randint(0, lo_seen - 1)
    d.append(T - P)
    g, c = [], []
    for x in d:
        if x >= 0:
            cc = rng.randint(0, hi - x); g.append(x + cc); c.append(cc)
        else:
            gg = rng.randint(0, hi + x); g.append(gg); c.append(gg - x)
    r = rng.randrange(n)
    return fmt(g[r:] + g[:r], c[r:] + c[:r])

def construct_none(rng, n, hi):
    g = [rng.randint(0, hi) for _ in range(n)]
    c = [rng.randint(0, hi) for _ in range(n)]
    while sum(g) >= sum(c):
        i = rng.randrange(n)
        c[i] = hi; g[i] = 0
    return fmt(g, c)

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5], [3]), fmt([3], [5]), fmt([0], [0]), fmt([2, 0], [0, 2]), fmt([0, 3], [2, 1]),
         fmt([1, 1, 1], [1, 1, 2]), fmt([4, 0, 0], [1, 1, 1]), fmt([10**4, 0], [0, 10**4 - 1])]
    t.append(construct_unique(rng, 10**5, 10**4))
    t.append(construct_unique(rng, 10**5, 50))
    t.append(construct_unique(rng, 10**5, 2))
    t.append(construct_none(rng, 10**5, 10**4))
    for i in range(12):
        n = rng.randint(100, 3000); hi = rng.choice([3, 100, 10**4])
        t.append(construct_none(rng, n, hi) if i % 4 == 0 else construct_unique(rng, n, hi))
    for i in range(80):
        x = make(rng, rng.randint(1, 10), rng.choice([3, 6, 10]), i % 3 != 0)
        if x:
            t.append(x)
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); assert 1 <= n <= 10**5
    v = list(map(int, d[1:]))
    assert len(v) == 2 * n
    assert all(0 <= x <= 10**4 for x in v)
    assert count_valid_starts(v[:n], v[n:]) <= 1, "solution not unique"

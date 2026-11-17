import random

def matrix(rng, m, n, lo, step):
    # a[i][j] = max(a[i-1][j], a[i][j-1]) + random step >= 1 -> strictly increasing rows/cols
    a = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            base = lo
            if i:
                base = max(base, a[i - 1][j] + 1)
            if j:
                base = max(base, a[i][j - 1] + 1)
            a[i][j] = base + rng.randint(0, step)
    return a

def fmt(a, k):
    return f"{len(a)} {len(a[0])} {k}\n" + "\n".join(" ".join(map(str, r)) for r in a)

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[5]], 5), fmt([[5]], 4), fmt([[-10**9, 10**9]], 10**9), fmt([[-10**9], [10**9]], 0),
         fmt([[1, 2, 3]], 3), fmt([[1], [2], [3]], 1)]
    for _ in range(29):
        m, n = rng.randint(1, 6), rng.randint(1, 6)
        a = matrix(rng, m, n, rng.randint(-20, 0), 3)
        flat = [x for r in a for x in r]
        k = rng.choice(flat) if rng.random() < 0.5 else rng.randint(min(flat) - 2, max(flat) + 2)
        t.append(fmt(a, k))
    for _ in range(10):
        m, n = rng.randint(20, 200), rng.randint(20, 200)
        a = matrix(rng, m, n, -10**6, 50)
        flat = [x for r in a for x in r]
        k = rng.choice(flat) if rng.random() < 0.5 else rng.randint(min(flat), max(flat))
        t.append(fmt(a, k))
    for i in range(4):
        m, n = (1000, 150) if i % 2 == 0 else (150, 1000)
        a = matrix(rng, m, n, -10**9, 1000)
        flat = [x for r in a for x in r]
        k = [a[-1][0], a[0][-1], rng.choice(flat) + 0, max(flat) + 1][i] if i != 2 else rng.randint(min(flat), max(flat))
        t.append(fmt(a, k))
    return t

def validate(inp: str) -> None:
    lines = inp.split("\n")
    m, n, k = map(int, lines[0].split())
    assert 1 <= m <= 1000 and 1 <= n <= 1000
    assert -10**9 <= k <= 10**9
    a = [list(map(int, lines[1 + i].split())) for i in range(m)]
    for i in range(m):
        assert len(a[i]) == n
        for j in range(n):
            assert -10**9 <= a[i][j] <= 10**9
            if j:
                assert a[i][j - 1] < a[i][j]
            if i:
                assert a[i - 1][j] < a[i][j]

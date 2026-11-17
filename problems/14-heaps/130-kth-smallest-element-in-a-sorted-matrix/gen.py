import random


def fmt(k, m):
    return f"{len(m)} {k}\n" + "\n".join(" ".join(map(str, r)) for r in m)


def rand_matrix(rng, n, step):
    m = [[0] * n for _ in range(n)]
    base = rng.randint(-10**9 // 2, 0) if step > 1000 else rng.randint(-50, 50)
    for i in range(n):
        for j in range(n):
            lo = base
            if i: lo = max(lo, m[i - 1][j])
            if j: lo = max(lo, m[i][j - 1])
            m[i][j] = lo + rng.randint(0, step)
    return m


def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, [[10**9]]), fmt(4, [[1, 2], [3, 4]]), fmt(1, [[-10**9, 0], [0, 10**9]]),
         fmt(9, [[5] * 3] * 3), fmt(5, [[1, 2, 3], [2, 3, 4], [3, 4, 5]])]
    for i in range(40):
        n = rng.randint(1, 5 if i < 20 else 40)
        step = rng.choice([0, 1, 3, 100, 3000000])
        k = rng.randint(1, n * n)
        t.append(fmt(k, rand_matrix(rng, n, step)))
    for k_frac in (0.001, 0.5, 1.0):
        n = 300
        k = max(1, int(n * n * k_frac))
        t.append(fmt(k, rand_matrix(rng, n, 5000)))
    return t


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    n, k = tok[0], tok[1]
    assert 1 <= n <= 300 and 1 <= k <= n * n
    v = tok[2:]
    assert len(v) == n * n
    m = [v[i * n:(i + 1) * n] for i in range(n)]
    for i in range(n):
        for j in range(n):
            assert -10**9 <= m[i][j] <= 10**9
            if i: assert m[i - 1][j] <= m[i][j]
            if j: assert m[i][j - 1] <= m[i][j]

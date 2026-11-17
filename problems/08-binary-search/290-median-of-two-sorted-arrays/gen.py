import random

def fmt(a, b):
    return f"{len(a)} {len(b)}\n{' '.join(map(str, a))}\n{' '.join(map(str, b))}"

def arr(rng, n, lo, hi):
    return sorted(rng.randint(lo, hi) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = [fmt([1], []), fmt([], [1]), fmt([], [-1, 0]), fmt([-1], [0]), fmt([-3, -2], []),
         fmt([0, 0], [0, 0]), fmt([1, 2], [3, 4, 5, 6]), fmt([-10**6], [10**6]), fmt([10**6] * 3, [-10**6] * 2),
         fmt([1, 3, 5], [2, 4, 6])]
    for _ in range(25):
        m, n = rng.randint(0, 8), rng.randint(0, 8)
        if m + n == 0:
            m = 1
        t.append(fmt(arr(rng, m, -10, 10), arr(rng, n, -10, 10)))
    for _ in range(10):
        m, n = rng.randint(0, 3000), rng.randint(1, 3000)
        t.append(fmt(arr(rng, m, -10**6, 10**6), arr(rng, n, -10**6, 10**6)))
    N = 10**5
    t.append(fmt(arr(rng, N, -10**6, 10**6), arr(rng, N, -10**6, 10**6)))
    t.append(fmt(arr(rng, N, -10**6, 10**6), arr(rng, N - 1, -10**6, 10**6)))
    t.append(fmt([], arr(rng, N, -10**6, 10**6)))
    t.append(fmt(arr(rng, N, -10**6, 0), arr(rng, N, 1, 10**6)))
    return t

def validate(inp: str) -> None:
    lines = inp.split("\n")
    m, n = map(int, lines[0].split())
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[2].split()))
    assert len(a) == m and len(b) == n
    assert 0 <= m <= 10**5 and 0 <= n <= 10**5 and m + n >= 1
    for x in (a, b):
        assert all(-10**6 <= v <= 10**6 for v in x)
        assert all(x[i] <= x[i + 1] for i in range(len(x) - 1))

import random


def fmt(k, w, p, c):
    return f"{len(p)} {k} {w}\n{' '.join(map(str, p))}\n{' '.join(map(str, c))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(0, 5, [1], [0]), fmt(1, 0, [0], [0]), fmt(1, 0, [10], [1]), fmt(3, 10**9, [10**4] * 3, [10**9] * 3),
         fmt(10**5, 0, [1, 1, 1], [0, 1, 2]), fmt(2, 1, [5, 1, 3], [2, 1, 1]), fmt(5, 0, [0, 0, 7], [0, 0, 0])]
    for i in range(39):
        n = rng.randint(1, 8 if i < 20 else 400)
        k = rng.randint(0, n + 2)
        w = rng.randint(0, 20)
        p = [rng.randint(0, rng.choice([5, 100, 10**4])) for _ in range(n)]
        c = [rng.randint(0, rng.choice([10, 200, 5000])) for _ in range(n)]
        t.append(fmt(k, w, p, c))
    n = 10**5
    t.append(fmt(n, 0, [rng.randint(0, 10**4) for _ in range(n)], [rng.randint(0, 10**9) for _ in range(n)]))
    t.append(fmt(n // 2, 1, [rng.randint(0, 10**4) for _ in range(n)], [rng.randint(0, 2 * 10**8) for _ in range(n)]))
    t.append(fmt(n, 10**9, [rng.randint(0, 10**4) for _ in range(n)], [rng.randint(0, 10**9) for _ in range(n)]))
    t.append(fmt(1000, 50, [rng.randint(0, 10**4) for _ in range(n)], [rng.randint(0, 10**6) for _ in range(n)]))
    return t


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    n, k, w = tok[0], tok[1], tok[2]
    assert 1 <= n <= 10**5 and 0 <= k <= 10**5 and 0 <= w <= 10**9
    p = tok[3:3 + n]
    c = tok[3 + n:3 + 2 * n]
    assert len(tok) == 3 + 2 * n
    assert all(0 <= x <= 10**4 for x in p) and all(0 <= x <= 10**9 for x in c)

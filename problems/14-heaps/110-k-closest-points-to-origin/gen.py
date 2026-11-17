import random


def fmt(k, pts):
    return f"{len(pts)} {k}\n" + "\n".join(f"{x} {y}" for x, y in pts)


def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, [(0, 0)]), fmt(1, [(10**4, -10**4)]), fmt(2, [(3, 4), (-3, 4), (4, 3), (5, 0)]),
         fmt(4, [(3, 4), (-3, 4), (4, 3), (5, 0)]), fmt(3, [(1, 1)] * 3), fmt(2, [(0, 1), (1, 0), (0, -1), (-1, 0)])]
    for i in range(40):
        n = rng.randint(1, 10 if i < 20 else 500)
        k = rng.randint(1, n)
        hi = rng.choice([2, 5, 100, 10**4])
        t.append(fmt(k, [(rng.randint(-hi, hi), rng.randint(-hi, hi)) for _ in range(n)]))
    n = 10**5
    for k, hi in ((1, 10**4), (n // 3, 10**4), (n, 50)):
        t.append(fmt(k, [(rng.randint(-hi, hi), rng.randint(-hi, hi)) for _ in range(n)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= k <= n <= 10**5
    v = list(map(int, tok[2:]))
    assert len(v) == 2 * n and all(-10**4 <= x <= 10**4 for x in v)

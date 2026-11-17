import random


def fmt(k, a):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, [7]), fmt(1, [-10**9, 10**9]), fmt(2, [-10**9, 10**9]), fmt(3, [5, 5, 5]),
         fmt(4, [1, 2, 3, 4, 5, 6, 7]), fmt(7, [1, 2, 3, 4, 5, 6, 7])]
    for i in range(40):
        n = rng.randint(1, 10 if i < 20 else 500)
        k = rng.randint(1, n)
        hi = rng.choice([3, 100, 10**9])
        t.append(fmt(k, [rng.randint(-hi, hi) for _ in range(n)]))
    n = 10**5
    for k in (1, n // 2, n):
        t.append(fmt(k, [rng.randint(-10**9, 10**9) for _ in range(n)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= k <= n <= 10**5
    a = list(map(int, tok[2:]))
    assert len(a) == n and all(-10**9 <= x <= 10**9 for x in a)

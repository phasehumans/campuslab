import random


def fmt(k, a):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, [5]), fmt(2, [1, 2]), fmt(3, [3, 1, 2]), fmt(1, [-10**9, 10**9]),
         fmt(2, [4, 4, -4, -4, 0]), fmt(3, [9, 9, 9, 8, 8, 7, 6, 6, 6, 6])]
    for i in range(40):
        n = rng.randint(1, 12 if i < 20 else 600)
        hi = rng.choice([2, 5, 30, 10**9])
        a = [rng.randint(-hi, hi) for _ in range(n)]
        k = rng.randint(1, len(set(a)))
        t.append(fmt(k, a))
    n = 10**5
    a = [rng.randint(-10**9, 10**9) for _ in range(n)]
    t.append(fmt(len(set(a)), a))
    a = [rng.randint(-1000, 1000) for _ in range(n)]
    t.append(fmt(500, a))
    a = [int(rng.paretovariate(1.2)) * rng.choice([1, -1]) for _ in range(n)]
    a = [max(-10**9, min(10**9, x)) for x in a]
    t.append(fmt(min(10, len(set(a))), a))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= k <= n <= 10**5
    a = list(map(int, tok[2:]))
    assert len(a) == n and all(-10**9 <= x <= 10**9 for x in a)
    assert len(set(a)) >= k

import random

LIM = 10**9


def fmt(k, a):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(5, [42]), fmt(0, [1, 2, 3, 4, 5]), fmt(5, [1, 2, 3, 4, 5]), fmt(7, [1, 2, 3, 4, 5]),
         fmt(100000, [1, 2, 3, 4, 5, 6]), fmt(1, [LIM, -LIM]), fmt(0, [7]), fmt(99999, list(range(1, 11)))]
    for _ in range(27):
        n = rng.randint(1, 20)
        t.append(fmt(rng.randint(0, 50), [rng.randint(-100, 100) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 3000)
        t.append(fmt(rng.randint(0, 10**5), [rng.randint(-LIM, LIM) for _ in range(n)]))
    t.append(fmt(10**5, [rng.randint(-LIM, LIM) for _ in range(10**5)]))
    t.append(fmt(rng.randint(1, 10**5 - 1), [rng.randint(-LIM, LIM) for _ in range(10**5)]))
    t.append(fmt(1, list(range(10**5))))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= n <= 10**5 and 0 <= k <= 10**5
    a = list(map(int, tok[2:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

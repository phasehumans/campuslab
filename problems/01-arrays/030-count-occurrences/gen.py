import random

LIM = 10**9


def fmt(k, a):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(5, [5]), fmt(5, [6]), fmt(2, [2] * 10), fmt(-1, [-1, 0] * 4), fmt(LIM, [LIM, 0, -LIM, LIM]),
         fmt(-LIM, [-LIM] * 3), fmt(0, [0, 1, 0, 2, 0, 3]), fmt(7, [1, 2, 3, 4, 5, 6, 8])]
    for _ in range(27):
        n = rng.randint(1, 25)
        a = [rng.randint(-5, 5) for _ in range(n)]
        k = rng.choice(a) if rng.random() < 0.7 else rng.randint(-7, 7)
        t.append(fmt(k, a))
    for _ in range(10):
        n = rng.randint(100, 3000)
        a = [rng.randint(-20, 20) for _ in range(n)]
        t.append(fmt(rng.randint(-20, 20), a))
    t.append(fmt(3, [rng.choice([3, -3, LIM]) for _ in range(10**5)]))
    t.append(fmt(LIM, [rng.randint(-LIM, LIM) for _ in range(10**5)]))
    t.append(fmt(-7, [-7] * 10**5))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= n <= 10**5 and -LIM <= k <= LIM
    a = list(map(int, tok[2:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

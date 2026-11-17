import random

LIM = 10**9


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([10, 20]), fmt([10**6] * 3), fmt([1] * 5), fmt([2] * 6), fmt([-2, 3, -4, 5]), fmt([0, 0, 1, 2, 3]),
         fmt([0, 5, 0, 2, 3]), fmt([0, 7]), fmt([-LIM, LIM]), fmt([-1, -1, -1]), fmt([0, 0])]
    for _ in range(24):
        n = rng.randint(2, 15)
        t.append(fmt([rng.randint(-10, 10) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 3000)
        t.append(fmt([rng.randint(-LIM, LIM) for _ in range(n)]))
    t.append(fmt([rng.randint(-LIM, LIM) for _ in range(10**5)]))
    a = [rng.randint(-LIM, LIM) or 1 for _ in range(10**5)]
    a[rng.randrange(10**5)] = 0
    t.append(fmt(a))
    t.append(fmt([rng.choice([-1, 1, 2]) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 2 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

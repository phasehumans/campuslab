import random

LIM = 10**9


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([0]), fmt([-LIM]), fmt([LIM]), fmt([-5, -5, -5]), fmt([-LIM, LIM]), fmt([LIM, -LIM]),
         fmt(list(range(1, 21))), fmt(list(range(20, 0, -1))), fmt([-3, -1, -2]), fmt([7, 7, 8, 7])]
    for _ in range(24):
        n = rng.randint(1, 20)
        t.append(fmt([rng.randint(-50, 50) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 2000)
        t.append(fmt([rng.randint(-LIM, LIM) for _ in range(n)]))
    for _ in range(3):
        t.append(fmt([rng.randint(-LIM, LIM) for _ in range(10**5)]))
    t.append(fmt([rng.randint(-LIM, -1) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

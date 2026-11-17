import random

LIM = 10**9


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([42]), fmt([1, 2]), fmt([0, 0, 0, 0]), fmt([LIM, -LIM]), fmt([-LIM]), fmt([1, 2, 1]),
         fmt(list(range(1, 11)))]
    for _ in range(28):
        n = rng.randint(1, 20)
        t.append(fmt([rng.randint(-100, 100) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 3000)
        t.append(fmt([rng.randint(-LIM, LIM) for _ in range(n)]))
    for _ in range(3):
        t.append(fmt([rng.randint(-LIM, LIM) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

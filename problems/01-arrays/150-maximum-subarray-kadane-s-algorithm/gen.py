import random

LIM = 10**9


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([5, 4, -1, 7, 8]), fmt([-1, -2, -3]), fmt([-LIM]), fmt([LIM] * 5), fmt([-5] * 9),
         fmt([1, -1] * 4), fmt([-5, 5]), fmt([0]), fmt([0, -1, 0])]
    for _ in range(25):
        n = rng.randint(1, 20)
        t.append(fmt([rng.randint(-20, 15) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 3000)
        t.append(fmt([rng.randint(-LIM, LIM) for _ in range(n)]))
    t.append(fmt([LIM] * 10**5))
    t.append(fmt([rng.randint(-LIM, LIM) for _ in range(10**5)]))
    t.append(fmt([rng.randint(-LIM, -1) for _ in range(10**5)]))
    t.append(fmt([rng.randint(-LIM, LIM // 2) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

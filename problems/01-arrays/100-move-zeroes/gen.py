import random

LO, HI = -2**31, 2**31 - 1


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([42]), fmt([0, 0, 0, 1, 2, 3]), fmt([1, 2, 3, 0, 0]), fmt([0] * 4), fmt([1, 0] * 4),
         fmt([2, 1]), fmt([LO, 0, HI]), fmt([0, LO])]
    for _ in range(27):
        n = rng.randint(1, 20)
        p = rng.random()
        t.append(fmt([0 if rng.random() < p else rng.randint(-50, 50) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 3000)
        t.append(fmt([0 if rng.random() < 0.4 else rng.randint(LO, HI) for _ in range(n)]))
    t.append(fmt([0 if rng.random() < 0.5 else rng.randint(LO, HI) for _ in range(10**5)]))
    t.append(fmt([0] * 50000 + [rng.randint(1, 9) for _ in range(50000)]))
    t.append(fmt([0] * 10**5))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(LO <= x <= HI for x in a)

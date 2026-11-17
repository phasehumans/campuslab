import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([0]), fmt([1]), fmt([1] * 4), fmt([0, 0, 0, 1, 1, 1]), fmt([1, 1, 0, 0, 1, 1]), fmt([0, 1] * 6),
         fmt([0] * 16), fmt([1, 0]), fmt([0, 1, 0, 0, 1, 1, 0])]
    t.append(fmt([rng.randint(0, 1) for _ in range(10**5)]))
    t.append(fmt([0, 1] * 50000))
    t.append(fmt([1] * 10**5))
    t.append(fmt([1 if rng.random() < 0.6 else 0 for _ in range(10**5)]))
    for _ in range(8):
        n = rng.randint(200, 3000)
        p = rng.choice([0.3, 0.5, 0.7])
        t.append(fmt([1 if rng.random() < p else 0 for _ in range(n)]))
    for _ in range(60):
        n = rng.randint(1, 20)
        p = rng.random()
        t.append(fmt([1 if rng.random() < p else 0 for _ in range(n)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(x in (0, 1) for x in a)

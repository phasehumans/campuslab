import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([1]), fmt([10**6]), fmt([1, 1]), fmt([10**6, 10**6]), fmt([1, 2, 3, 4, 5]),
         fmt([5, 4, 3, 2, 1]), fmt([7] * 9), fmt([1, 10**6, 1, 10**6])]
    for i in range(40):
        n = rng.randint(1, 8 if i < 20 else 300)
        hi = rng.choice([5, 100, 10**6])
        t.append(fmt([rng.randint(1, hi) for _ in range(n)]))
    t.append(fmt([10**6] * 10**5))
    for i in range(2):
        t.append(fmt([rng.randint(1, 10**6) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n and all(1 <= x <= 10**6 for x in a)

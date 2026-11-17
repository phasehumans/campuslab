import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([1]), fmt([1000]), fmt([5, 5]), fmt([1, 1000]), fmt([3, 3, 3]), fmt([1000] * 7),
         fmt(list(range(1, 21))), fmt([2, 2, 4])]
    for i in range(40):
        n = rng.randint(1, 8 if i < 20 else 200)
        hi = rng.choice([3, 10, 1000])
        t.append(fmt([rng.randint(1, hi) for _ in range(n)]))
    for i in range(3):
        t.append(fmt([rng.randint(1, 1000) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n and all(1 <= x <= 1000 for x in a)

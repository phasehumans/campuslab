import random


def fmt(k, a):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(1, [1]), fmt(1, [10**9]), fmt(10**5, [10**9]), fmt(3, [2, 3, 4]), fmt(5, [10**9] * 5),
         fmt(100, [999999999, 1000000000, 4]), fmt(2, [1, 1, 1])]
    for i in range(40):
        n = rng.randint(1, 8 if i < 20 else 500)
        hi = rng.choice([10, 1000, 10**9])
        k = rng.randint(1, 20 if i < 20 else 3000)
        t.append(fmt(k, [rng.randint(1, hi) for _ in range(n)]))
    for i in range(3):
        t.append(fmt(rng.randint(5 * 10**4, 10**5), [rng.randint(1, 10**9) for _ in range(10**5)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= n <= 10**5 and 1 <= k <= 10**5
    a = list(map(int, tok[2:]))
    assert len(a) == n and all(1 <= x <= 10**9 for x in a)

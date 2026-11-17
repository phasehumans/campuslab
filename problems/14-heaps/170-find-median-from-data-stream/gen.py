import random


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([7]), fmt([-1, 0]), fmt([0, -1, -2]), fmt([10**9, 10**9 - 1]), fmt([-10**9, -10**9 + 1]),
         fmt([-10**9, 10**9]), fmt([1, 2, 3, 4, 5]), fmt([5, 4, 3, 2, 1]), fmt([10, -10, 20, -20, 30]),
         fmt([1, 3, -1, -3, 5, 7, -5, -7]), fmt([4] * 6), fmt([-3, -4, 2, 1])]
    for i in range(34):
        n = rng.randint(1, 10 if i < 18 else 500)
        hi = rng.choice([3, 20, 10**9])
        t.append(fmt([rng.randint(-hi, hi) for _ in range(n)]))
    n = 10**5
    t.append(fmt([rng.randint(-10**9, 10**9) for _ in range(n)]))
    t.append(fmt(list(range(-n // 2, n // 2))))
    t.append(fmt([rng.choice([-10**9, 10**9 - 1]) for _ in range(n)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n and all(-10**9 <= x <= 10**9 for x in a)

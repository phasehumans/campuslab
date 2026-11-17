import random


def fmt(k, a):
    return f"{len(a)} {k}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt(0, [0]), fmt(5, [5]), fmt(1, [0]), fmt(0, [0] * 5), fmt(-1, [1, -1, 2, -2, 3, -3]), fmt(2, [2, -2, 2, -2]),
         fmt(10, [1, 2, 3, 4, 5]), fmt(10**7, [1000] * 50), fmt(-10**7, [-1000] * 20), fmt(-3, [-1000, 1000, -3])]
    # large
    t.append(fmt(0, [0] * 10**5))
    t.append(fmt(0, [rng.choice([-1, 1]) for _ in range(10**5)]))
    t.append(fmt(rng.randint(-50, 50), [rng.randint(-1000, 1000) for _ in range(10**5)]))
    t.append(fmt(10**7, [1000] * 10**5))
    for _ in range(8):
        n = rng.randint(200, 3000)
        a = [rng.randint(-1000, 1000) for _ in range(n)]
        i, j = sorted(rng.sample(range(n + 1), 2))
        t.append(fmt(sum(a[i:j]), a))
    for _ in range(60):
        n = rng.randint(1, 20)
        a = [rng.randint(-5, 5) for _ in range(n)]
        i, j = sorted(rng.sample(range(n + 1), 2)) if n > 1 else (0, 1)
        k = sum(a[i:j]) if rng.random() < 0.8 else rng.randint(-10, 10)
        t.append(fmt(k, a))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n, k = int(tok[0]), int(tok[1])
    assert 1 <= n <= 10**5 and -10**7 <= k <= 10**7
    a = list(map(int, tok[2:]))
    assert len(a) == n
    assert all(-1000 <= x <= 1000 for x in a)

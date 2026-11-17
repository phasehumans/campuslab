import random


def fmt(a, v):
    return f"{len(a)} {v}\n{' '.join(map(str, a))}\n"


def generate(rng):
    B = 10**9
    t = ["0 5\n", fmt([1], 1), fmt([1], 2), fmt([4, 4, 4, 4], 4), fmt([-B, B, -B], -B),
         fmt([B, B], -B), fmt([3, 1, 2], 7)]
    t.append(fmt([rng.randint(-B, B) for _ in range(100000)], 0))
    a = [rng.choice([5, -5, 7]) for _ in range(100000)]
    t.append(fmt(a, 5))
    t.append(fmt([9] * 100000, 9))
    for _ in range(25):
        n = rng.randint(1, 10)
        a = [rng.randint(-3, 3) for _ in range(n)]
        t.append(fmt(a, rng.choice(a + [rng.randint(-3, 3)])))
    for _ in range(15):
        n = rng.randint(10, 1000)
        a = [rng.randint(-B, B) if rng.random() < 0.5 else 42 for _ in range(n)]
        t.append(fmt(a, 42))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n = d[0]
    assert 0 <= n <= 10**5 and len(d) == n + 2
    assert all(-10**9 <= x <= 10**9 for x in d[1:])

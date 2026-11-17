import random


def fmt(a, k):
    return f"{len(a)}\n{' '.join(map(str, a))}\n{k}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([5], 5), fmt([-1, 2, 9, 4, 0], 2), fmt([1, 2, 3], 3), fmt([-1] * 5, 5), fmt([1] * 8, 2), fmt([0] * 12, 13),
         fmt([-10000, 10000], 10000), fmt([-7], 7), fmt([3], 2), fmt([1, -2, 3, -4, 5, -6, 7], 7)]
    t.append(fmt([rng.randint(-10000, 10000) for _ in range(30000)], rng.randint(2, 10000)))
    t.append(fmt([0] * 30000, 2))
    t.append(fmt([rng.randint(-10000, 10000) for _ in range(30000)], 2))
    t.append(fmt([rng.randint(-10000, 10000) for _ in range(30000)], 10000))
    for _ in range(8):
        n = rng.randint(200, 3000)
        t.append(fmt([rng.randint(-10000, 10000) for _ in range(n)], rng.randint(2, 50)))
    for _ in range(60):
        n = rng.randint(1, 20)
        t.append(fmt([rng.randint(-20, 20) for _ in range(n)], rng.randint(2, 9)))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 30000
    assert len(tok) == n + 2
    a = list(map(int, tok[1:1 + n]))
    k = int(tok[n + 1])
    assert 2 <= k <= 10000
    assert all(-10000 <= x <= 10000 for x in a)

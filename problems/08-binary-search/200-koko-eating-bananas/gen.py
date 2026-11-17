import random

def fmt(a, h):
    return f"{len(a)} {h}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([1], 1), fmt([10**9], 1), fmt([10**9], 10**9), fmt([10**9], 2), fmt([1, 1, 1], 3),
         fmt([5, 5, 5], 10**9), fmt([10**9] * 5, 5), fmt([3, 6, 7, 11], 4), fmt([3, 6, 7, 11], 30)]
    for _ in range(26):
        n = rng.randint(1, 10)
        a = [rng.randint(1, 30) for _ in range(n)]
        h = rng.randint(n, sum(a) + 3)
        t.append(fmt(a, h))
    for _ in range(10):
        n = rng.randint(100, 3000)
        a = [rng.randint(1, 10**9) for _ in range(n)]
        h = rng.randint(n, 3 * n) if rng.random() < 0.5 else rng.randint(n, 10**9)
        t.append(fmt(a, h))
    n = 10**5
    a = [rng.randint(1, 10**9) for _ in range(n)]
    t.append(fmt(a, n))
    t.append(fmt(a, 10**9))
    t.append(fmt([rng.randint(1, 10**9) for _ in range(n)], rng.randint(n, 5 * n)))
    t.append(fmt([rng.randint(1, 10**4) for _ in range(n)], rng.randint(n, 10 * n)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, h = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert len(a) == n and 1 <= n <= 10**5
    assert n <= h <= 10**9
    assert all(1 <= x <= 10**9 for x in a)

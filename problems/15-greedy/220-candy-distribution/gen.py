import random

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    N = 2 * 10**4
    t = [fmt([0]), fmt([5, 5]), fmt([1, 2]), fmt([2, 1]), fmt([1, 3, 2, 2, 1]), fmt([1, 2, 87, 87, 87, 2, 1]),
         fmt([5, 4, 3, 2, 1]), fmt([1, 2, 3, 4, 5]), fmt([3, 1, 3, 1, 3])]
    t.append(fmt(list(range(N))))
    t.append(fmt(list(range(N, 0, -1))))
    t.append(fmt([rng.randint(0, N) for _ in range(N)]))
    t.append(fmt(list(range(N // 2)) + list(range(N // 2, 0, -1))))
    t.append(fmt([N] * N))
    for _ in range(12):
        n = rng.randint(50, 3000)
        t.append(fmt([rng.randint(0, rng.choice([3, 100, N])) for _ in range(n)]))
    for _ in range(60):
        n = rng.randint(1, 10)
        t.append(fmt([rng.randint(0, 5) for _ in range(n)]))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); a = list(map(int, d[1:]))
    assert 1 <= n <= 2 * 10**4 and len(a) == n
    assert all(0 <= x <= 2 * 10**4 for x in a)

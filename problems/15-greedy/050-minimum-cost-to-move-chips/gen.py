import random

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def generate(rng: random.Random) -> list[str]:
    t = [fmt([1]), fmt([10**9]), fmt([1, 2]), fmt([2, 4, 6]), fmt([1, 3, 5, 7]), fmt([1, 10**9]),
         fmt([2, 2, 2, 3, 3]), fmt([1, 1000000000, 999999999])]
    N = 10**5
    t.append(fmt([rng.randint(1, 10**9) for _ in range(N)]))
    t.append(fmt([rng.randrange(2, 10**9 + 1, 2) for _ in range(N)]))
    t.append(fmt([rng.randrange(1, 10**9, 2) for _ in range(N - 1)] + [2]))
    for _ in range(10):
        n = rng.randint(50, 5000)
        t.append(fmt([rng.randint(1, 10**9) for _ in range(n)]))
    for _ in range(60):
        n = rng.randint(1, 12)
        t.append(fmt([rng.randint(1, 20) for _ in range(n)]))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); a = list(map(int, d[1:]))
    assert 1 <= n <= 10**5 and len(a) == n
    assert all(1 <= x <= 10**9 for x in a)

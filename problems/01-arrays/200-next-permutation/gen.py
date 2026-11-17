import random

LIM = 10**9


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([1, 1, 5]), fmt([1]), fmt([1, 2]), fmt([2, 1]), fmt([1, 3, 5, 4, 2]), fmt([1, 1, 1]),
         fmt([7, 8, 6, 5, 4, 3, 2, 1]), fmt([5, 1, 1]), fmt([2, 2, 1, 1]), fmt([-LIM, LIM]), fmt([LIM, -LIM, -LIM])]
    for _ in range(8):
        n = rng.randint(50, 2000)
        a = [rng.randint(-LIM, LIM) for _ in range(n)]
        k = rng.randint(0, min(n, 30))
        a[n - k:] = sorted(a[n - k:], reverse=True)
        t.append(fmt(a))
    t.append(fmt(sorted((rng.randint(-LIM, LIM) for _ in range(10**4)), reverse=True)))
    t.append(fmt([rng.randint(-LIM, LIM) for _ in range(10**4)]))
    a = sorted((rng.randint(0, 50) for _ in range(10**4)), reverse=True)
    a[0], a[-1] = a[-1], a[0]
    t.append(fmt(a))
    for _ in range(45):
        n = rng.randint(1, 10)
        t.append(fmt([rng.randint(1, 4) for _ in range(n)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**4
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)

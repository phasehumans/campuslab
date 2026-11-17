import random

LIM = 10**9


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def rnd(rng, n, lo, hi):
    return sorted(rng.randint(lo, hi) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    t = [fmt([5]), fmt([1] * 5), fmt([1, 2, 3, 4, 5, 6]), fmt([-LIM, -LIM, LIM, LIM]), fmt([10, 20]),
         fmt([-10, -10, -10, -5]), fmt([0, 0])]
    for _ in range(10):
        n = rng.randint(100, 3000)
        t.append(fmt(rnd(rng, n, -n // 2, n // 2)))
    t.append(fmt(rnd(rng, 10**5, -LIM, LIM)))
    t.append(fmt(rnd(rng, 10**5, -1000, 1000)))
    t.append(fmt([7] * 10**5))
    for _ in range(40):
        n = rng.randint(1, 20)
        t.append(fmt(rnd(rng, n, -10, 10)))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-LIM <= x <= LIM for x in a)
    assert all(a[i] <= a[i + 1] for i in range(n - 1))

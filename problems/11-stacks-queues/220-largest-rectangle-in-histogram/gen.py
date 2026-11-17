import random

NMAX, HMAX = 10**5, 10**4


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    tests = [fmt([rng.randint(0, HMAX) for _ in range(NMAX)]), fmt([HMAX] * NMAX),
             fmt([i % (HMAX + 1) for i in range(NMAX)]),
             fmt([HMAX - (i * HMAX // NMAX) for i in range(NMAX)]),
             fmt([rng.randint(0, 3) for _ in range(NMAX)])]
    tests += [fmt([0]), fmt([HMAX]), fmt([0, 0, 0]), fmt([1, 1]), fmt([2, 1, 2]), fmt([6, 2, 5, 4, 5, 1, 6]),
              fmt([1, 2, 3, 4, 5]), fmt([5, 4, 3, 2, 1]), fmt([3, 0, 3]), fmt([4, 2, 0, 3, 2, 5])]
    for _ in range(25):
        n = rng.randint(1, 12)
        v = rng.choice([2, 5, 10, HMAX])
        tests.append(fmt([rng.randint(0, v) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 5000)
        tests.append(fmt([rng.randint(0, rng.choice([10, HMAX])) for _ in range(n)]))
    return tests


def validate(inp: str) -> None:
    t = inp.split()
    n = int(t[0])
    assert 1 <= n <= NMAX and len(t) == n + 1
    assert all(0 <= int(x) <= HMAX for x in t[1:])

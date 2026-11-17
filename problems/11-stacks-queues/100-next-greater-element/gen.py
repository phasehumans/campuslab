import random

LO, HI, NMAX = -10**9, 10**9, 10**5


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    tests = [fmt([5]), fmt([LO]), fmt([1, 2]), fmt([2, 1]), fmt([3, 3, 3]), fmt([1, 2, 3, 4, 5]),
             fmt([2, 7, 3, 5, 4, 6, 8]), fmt([-1, -2, -3, 0]), fmt([HI, LO, HI]), fmt([4, 4, 5, 4])]
    for _ in range(25):
        n = rng.randint(1, 12)
        v = rng.choice([3, 10, 10**9])
        tests.append(fmt([rng.randint(-v, v) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 5000)
        tests.append(fmt([rng.randint(LO, HI) for _ in range(n)]))
    tests.append(fmt([rng.randint(LO, HI) for _ in range(NMAX)]))
    tests.append(fmt(list(range(NMAX, 0, -1))))
    tests.append(fmt(list(range(NMAX))))
    tests.append(fmt([rng.randint(1, 5) for _ in range(NMAX)]))
    a = sorted(rng.randint(LO, HI) for _ in range(NMAX - 1))[::-1] + [HI]
    tests.append(fmt(a))
    # large tests first so they are always among the 50 inputs that get used
    return tests[-5:] + tests[:-5]


def validate(inp: str) -> None:
    t = inp.split()
    n = int(t[0])
    assert 1 <= n <= NMAX and len(t) == n + 1
    assert all(LO <= int(x) <= HI for x in t[1:])

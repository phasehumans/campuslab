import random

NMAX, PMAX = 10**5, 10**5


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    tests = [fmt([1]), fmt([PMAX]), fmt([5, 5, 5, 5]), fmt([90, 80, 70, 60, 50, 60, 70, 80, 90, 100]),
             fmt([50, 40, 30, 20, 10]), fmt([1, 3, 2, 4, 3, 5]), fmt([2, 1, 2, 1, 2])]
    for _ in range(32):
        n = rng.randint(1, 12)
        v = rng.choice([3, 10, 100, PMAX])
        tests.append(fmt([rng.randint(1, v) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 5000)
        tests.append(fmt([rng.randint(1, PMAX) for _ in range(n)]))
    tests.append(fmt([rng.randint(1, PMAX) for _ in range(NMAX)]))
    tests.append(fmt(list(range(1, NMAX + 1))))
    tests.append(fmt(list(range(NMAX, 0, -1))))
    tests.append(fmt([rng.randint(1, 3) for _ in range(NMAX)]))
    tests.append(fmt([(i % 1000) + 1 for i in range(NMAX)]))
    # large tests first so they are always among the 50 inputs that get used
    return tests[-5:] + tests[:-5]


def validate(inp: str) -> None:
    t = inp.split()
    n = int(t[0])
    assert 1 <= n <= NMAX and len(t) == n + 1
    assert all(1 <= int(x) <= PMAX for x in t[1:])

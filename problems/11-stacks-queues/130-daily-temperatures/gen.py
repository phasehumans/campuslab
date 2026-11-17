import random

NMAX = 10**5


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    tests = [fmt([30]), fmt([100]), fmt([50, 50, 50]), fmt([100, 30]), fmt([30, 100]),
             fmt([30, 60, 90]), fmt([90, 60, 30, 91]), fmt([55, 38, 53, 81, 61, 93, 97, 32, 43, 78])]
    for _ in range(26):
        n = rng.randint(1, 12)
        lo = rng.choice([30, 60, 95])
        tests.append(fmt([rng.randint(lo, 100) for _ in range(n)]))
    for _ in range(10):
        n = rng.randint(100, 5000)
        tests.append(fmt([rng.randint(30, 100) for _ in range(n)]))
    tests.append(fmt([rng.randint(30, 100) for _ in range(NMAX)]))
    tests.append(fmt([100 - (i * 70 // NMAX) for i in range(NMAX)]))
    tests.append(fmt([30] * (NMAX - 1) + [31]))
    tests.append(fmt([30 + (i % 71) for i in range(NMAX)]))
    return tests


def validate(inp: str) -> None:
    t = inp.split()
    n = int(t[0])
    assert 1 <= n <= NMAX and len(t) == n + 1
    assert all(30 <= int(x) <= 100 for x in t[1:])

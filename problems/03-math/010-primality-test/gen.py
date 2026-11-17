import random

def generate(rng: random.Random) -> list[str]:
    fixed = [1, 2, 3, 4, 9, 25, 49, 97, 100, 561, 7919, 1000000007, 999999937, 2147483647 // 2 + 1,
             1999999973, 2000000000, 1999999999, 44711 * 44711, 46337 * 43201, 65537 * 30517,
             999983 * 2, 1000003, 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3, 1999999943]
    tests = [str(x) for x in fixed if 1 <= x <= 2 * 10**9]
    for _ in range(15):
        tests.append(str(rng.randint(1, 1000)))
    for _ in range(15):
        tests.append(str(rng.randint(1, 2 * 10**9)))
    # products of two primes near sqrt
    ps = [44701, 44711, 44729, 31607, 31627, 104729]
    for _ in range(5):
        a, b = rng.choice(ps), rng.choice(ps)
        if a * b <= 2 * 10**9:
            tests.append(str(a * b))
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    n = int(t[0])
    assert 1 <= n <= 2 * 10**9

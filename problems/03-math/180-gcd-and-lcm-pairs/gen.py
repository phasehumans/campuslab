import random

def generate(rng: random.Random) -> list[str]:
    tests = ["1 1", "5 5", "1 1000000000000", "1000000000000 1000000000000", "2 1000000000000",
             "1 999999999989", "7 999999999997", "1 304250263527210", "3 7", "6 4",
             "1 200560490130", "1 9699690", "1000000 999999000000", "999983 999983000000"]
    tests = [t for t in tests if all(1 <= int(x) <= 10**12 for x in t.split())]
    for _ in range(15):
        tests.append(f"{rng.randint(1, 50)} {rng.randint(1, 500)}")
    for _ in range(15):
        g = rng.randint(1, 10**4)
        tests.append(f"{g} {g * rng.randint(1, 10**12 // g)}")
    for _ in range(10):
        tests.append(f"{rng.randint(1, 10**12)} {rng.randint(1, 10**12)}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    G, L = map(int, t)
    assert 1 <= G <= 10**12 and 1 <= L <= 10**12

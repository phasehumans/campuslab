import random

def generate(rng: random.Random) -> list[str]:
    fixed = [2, 3, 4, 8, 97, 1024, 999999937, 10**9, 999999999, 123456789, 735134400,
             2 * 3 * 5 * 7 * 11 * 13 * 17 * 19 * 23, 31607 * 31627, 2 * 499999993 + 0,
             961, 25, 999983 * 997, 536870912, 387420489, 6, 30, 49]
    tests = [str(x) for x in fixed if 2 <= x <= 10**9]
    for _ in range(15):
        tests.append(str(rng.randint(2, 1000)))
    for _ in range(20):
        tests.append(str(rng.randint(2, 10**9)))
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    assert 2 <= int(t[0]) <= 10**9

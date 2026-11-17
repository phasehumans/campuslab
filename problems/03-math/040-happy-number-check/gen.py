import random

def generate(rng: random.Random) -> list[str]:
    fixed = [1, 7, 10, 100, 4, 13, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97,
             2147483647, 2147483646, 1111111, 999999999, 1000000000, 3, 5, 89, 145]
    tests = [str(x) for x in fixed]
    for _ in range(15):
        tests.append(str(rng.randint(1, 1000)))
    for _ in range(15):
        tests.append(str(rng.randint(1, 2**31 - 1)))
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    assert 1 <= int(t[0]) <= 2**31 - 1

import random

def generate(rng: random.Random) -> list[str]:
    fixed = [1, 2, 3, 4, 6, 12, 28, 496, 8128, 36, 97, 1024, 720720, 735134400, 999999937,
             10**9, 999999999, 999950884, 2 * 3 * 5 * 7 * 11 * 13 * 17 * 19 * 23, 31622 * 31622, 961]
    tests = [str(x) for x in fixed]
    for _ in range(15):
        tests.append(str(rng.randint(1, 1000)))
    for _ in range(20):
        tests.append(str(rng.randint(1, 10**9)))
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    assert 1 <= int(t[0]) <= 10**9

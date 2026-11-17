import random

def generate(rng: random.Random) -> list[str]:
    fixed = [1, 2, 3, 4, 6, 10, 36, 97, 100, 1024, 999999937, 10**9, 735134400,
             223092870, 31607 * 31627, 999999999, 536870912, 2 * 999999937 // 2]
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

import random

def generate(rng: random.Random) -> list[str]:
    fixed = [2, 3, 4, 5, 10, 11, 25, 29, 30, 97, 100, 1000, 999983, 10**6, 999999, 65536]
    tests = [str(x) for x in fixed]
    for _ in range(25):
        tests.append(str(rng.randint(2, 200)))
    for _ in range(20):
        tests.append(str(rng.randint(2, 10**5)))
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    assert 2 <= int(t[0]) <= 10**6

import random

def generate(rng: random.Random) -> list[str]:
    tests = [str(x) for x in range(1, 16)] + [str(x) for x in (10**6, 999999, 500000, 100, 1000, 12345)]
    for _ in range(20):
        tests.append(str(rng.randint(16, 2000)))
    for _ in range(12):
        tests.append(str(rng.randint(1, 10**6)))
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    assert 1 <= int(t[0]) <= 10**6

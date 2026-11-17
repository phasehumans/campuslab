import random


def generate(rng: random.Random) -> list[str]:
    tests = [0, 1, 2, 3, 10**18, 10**18 - 1, 2**59, 2**59 - 1, 2**58 + 1, 999999999999999999, 1000000000]
    for _ in range(20):
        tests.append(rng.randint(0, 1000))
    for _ in range(20):
        tests.append(rng.randint(0, 10**18))
    for _ in range(10):
        b = rng.randint(1, 59)
        tests.append(2**b - 1)
    return [f"{x}\n" for x in tests]


def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    assert 0 <= int(t[0]) <= 10**18

import random

M = 2**32 - 1


def generate(rng: random.Random) -> list[str]:
    tests = [0, 1, 2, M, 2**31, 2**31 - 1, 43261596, 4294967293, 65535, 2**16]
    for _ in range(20):
        tests.append(rng.randint(0, 1000))
    for _ in range(25):
        tests.append(rng.randint(0, M))
    return [f"{x}\n" for x in tests]


def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1 and 0 <= int(t[0]) <= M

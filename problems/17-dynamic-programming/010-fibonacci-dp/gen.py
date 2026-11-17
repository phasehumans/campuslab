import random


def generate(rng: random.Random) -> list[str]:
    tests = [str(n) for n in range(0, 21)]
    tests += [str(n) for n in (44, 45, 46, 90, 91, 92, 93, 100000, 99999)]
    while len(tests) < 60:
        tests.append(str(rng.randint(30, 100000)))
    return tests


def validate(inp: str) -> None:
    toks = inp.split()
    assert len(toks) == 1
    n = int(toks[0])
    assert 0 <= n <= 10**5

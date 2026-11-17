import random


def generate(rng: random.Random) -> list[str]:
    tests = [str(n) for n in range(0, 21)]
    tests += [str(n) for n in (37, 38, 50, 100000, 99999, 65536)]
    while len(tests) < 60:
        tests.append(str(rng.randint(21, 100000)))
    return tests


def validate(inp: str) -> None:
    toks = inp.split()
    assert len(toks) == 1
    assert 0 <= int(toks[0]) <= 10**5

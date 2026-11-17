import random


def generate(rng: random.Random) -> list[str]:
    tests = ["1 1", "1 100", "100 1", "100 100", "2 2", "99 100", "100 99", "50 50", "2 100", "100 2"]
    while len(tests) < 70:
        hi = rng.choice([5, 20, 100])
        tests.append(f"{rng.randint(1, hi)} {rng.randint(1, hi)}")
    return tests


def validate(inp: str) -> None:
    toks = inp.split()
    assert len(toks) == 2
    m, n = map(int, toks)
    assert 1 <= m <= 100 and 1 <= n <= 100

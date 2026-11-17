import random


def generate(rng: random.Random) -> list[str]:
    return [str(n) for n in range(1, 91)] + [str(rng.randint(1, 90)) for _ in range(20)]


def validate(inp: str) -> None:
    toks = inp.split()
    assert len(toks) == 1
    assert 1 <= int(toks[0]) <= 90

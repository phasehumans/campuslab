import random


def generate(rng: random.Random) -> list[str]:
    vals = list(range(1, 61))
    rng.shuffle(vals)
    return [str(v) for v in vals]


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 1
    n = int(tok[0])
    assert 1 <= n <= 60

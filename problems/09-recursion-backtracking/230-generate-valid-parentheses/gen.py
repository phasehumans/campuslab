import random

EXHAUSTIVE = True


def generate(rng: random.Random) -> list[str]:
    # Every valid input (all n in [1, 10]); fewer than 50 exist, so no random tests are needed.
    return [str(n) for n in range(1, 11)]


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 1
    n = int(tok[0])
    assert 1 <= n <= 10

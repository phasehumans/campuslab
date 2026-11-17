import random

EXHAUSTIVE = True


def generate(rng: random.Random) -> list[str]:
    # Every valid input (all n in [0, 20]); fewer than 50 exist, so no random tests are needed.
    return [str(n) for n in range(0, 21)]


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 1
    n = int(tok[0])
    assert 0 <= n <= 20

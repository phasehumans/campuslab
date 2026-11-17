import random


def generate(rng: random.Random) -> list[str]:
    tests = ["0", "1", "9", "10", "99", "100", "999999999999999999", "1000000000000000000",
             "123456789012345678", "500000000000000005", "909090909090909090"]
    for _ in range(15):
        tests.append(str(rng.randint(0, 1000)))
    for _ in range(15):
        tests.append(str(rng.randint(0, 10**9)))
    for _ in range(20):
        tests.append(str(rng.randint(0, 10**18)))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 1
    n = int(tok[0])
    assert 0 <= n <= 10**18

import random


def generate(rng: random.Random) -> list[str]:
    tests = ["0", "1", "2", "3", "4", "6", "1024", "1023", "1025",
             str(2**59), str(2**59 + 1), str(2**59 - 1), str(10**18), str(3 * 2**58)]
    for _ in range(14):
        tests.append(str(2 ** rng.randint(0, 59)))
    for _ in range(10):
        tests.append(str(rng.randint(1, 10**6)))
    for _ in range(8):
        k = rng.randint(1, 58)
        tests.append(str(2**k + rng.choice([-1, 1, 2**rng.randint(0, k - 1)])))
    for _ in range(8):
        tests.append(str(rng.randint(1, 10**18)))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 1
    n = int(tok[0])
    assert 0 <= n <= 10**18

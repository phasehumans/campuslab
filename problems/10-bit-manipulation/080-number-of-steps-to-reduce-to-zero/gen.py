import random


def generate(rng: random.Random) -> list[str]:
    tests = ["0", "1", "10", "11", "000", "0001", "1" * 60, "1" + "0" * 59, "1" * 10**6, "1" + "0" * (10**6 - 1),
             "0" * 10**6]
    for _ in range(25):
        tests.append("".join(rng.choice("01") for _ in range(rng.randint(1, 20))))
    for _ in range(12):
        tests.append("0" * rng.randint(0, 5) + "1" + "".join(rng.choice("01") for _ in range(rng.randint(10, 2000))))
    tests.append("".join(rng.choice("01") for _ in range(10**6)))
    tests.append("0" * 500000 + "".join(rng.choice("01") for _ in range(500000)))
    return [t + "\n" for t in tests]


def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 1
    s = t[0]
    assert 1 <= len(s) <= 10**6 and set(s) <= {"0", "1"}

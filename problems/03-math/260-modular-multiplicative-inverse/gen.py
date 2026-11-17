import random

def generate(rng: random.Random) -> list[str]:
    tests = ["1 1", "5 1", "1 2", "2 2", "1 1000000000", "999999999 1000000000", "1000000000 999999999",
             "2 1000000000", "123456789 999999937", "10 15", "7 7",
             "1000000000 1", "3 4", "999999936 999999937", "1000000000 1000000000"]
    for _ in range(15):
        tests.append(f"{rng.randint(1, 50)} {rng.randint(1, 50)}")
    for _ in range(20):
        tests.append(f"{rng.randint(1, 10**9)} {rng.randint(1, 10**9)}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    a, m = map(int, t)
    assert 1 <= a <= 10**9 and 1 <= m <= 10**9

import random

def generate(rng: random.Random) -> list[str]:
    tests = ["1 1", "1 1000000000", "1000000000 1000000000", "987654321 123456789",
             "999999937 999999929", "1000000000 999999999", "17 17", "2 4", "4 2",
             "536870912 1000000000", "735134400 963761198", "6 35", "1 2"]
    for _ in range(15):
        tests.append(f"{rng.randint(1, 100)} {rng.randint(1, 100)}")
    for _ in range(15):
        tests.append(f"{rng.randint(1, 10**9)} {rng.randint(1, 10**9)}")
    for _ in range(10):
        g = rng.randint(1, 10**5)
        tests.append(f"{g * rng.randint(1, 10**4)} {g * rng.randint(1, 10**4)}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    a, b = map(int, t)
    assert 1 <= a <= 10**9 and 1 <= b <= 10**9

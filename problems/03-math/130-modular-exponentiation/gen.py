import random

def generate(rng: random.Random) -> list[str]:
    tests = ["0 0 1", "0 0 7", "0 5 7", "1 10 1", "7 3 1", "1000000000 1000000000000000000 1000000000",
             "999999999 1000000000000000000 999999937", "2 1000000000000000000 999999937",
             "2 62 1000000000", "123456789 1 1000000000", "0 1000000000000000000 999999999",
             "999999999 999999999999999999 2", "3 0 1"]
    for _ in range(15):
        tests.append(f"{rng.randint(0, 20)} {rng.randint(0, 30)} {rng.randint(1, 100)}")
    for _ in range(20):
        tests.append(f"{rng.randint(0, 10**9)} {rng.randint(0, 10**18)} {rng.randint(1, 10**9)}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 3
    x, n, m = map(int, t)
    assert 0 <= x <= 10**9 and 0 <= n <= 10**18 and 1 <= m <= 10**9

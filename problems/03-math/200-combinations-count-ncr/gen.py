import random

def generate(rng: random.Random) -> list[str]:
    N = 10**6
    tests = ["0 0", "0 1", "1 0", "1 1", "5 6", f"{N} {N}", f"{N} 0", f"{N} 1", f"{N} 500000",
             f"0 {N}", f"999999 {N}", "60 30", "4 2", f"{N} 999999"]
    for _ in range(20):
        n = rng.randint(0, 30); tests.append(f"{n} {rng.randint(0, 35)}")
    for _ in range(15):
        n = rng.randint(0, N); tests.append(f"{n} {rng.randint(0, n + 10)}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    n, r = map(int, t)
    assert 0 <= n <= 10**6 and 0 <= r <= 10**6

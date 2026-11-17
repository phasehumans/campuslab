import random

def generate(rng: random.Random) -> list[str]:
    N = 10**5
    tests = ["0 0", "0 1", "1 0", "1 1", "5 6", f"{N} {N}", f"{N} 0", f"{N} 1", f"{N} 50000",
             f"0 {N}", f"99999 {N}", "13 13", "20 10"]
    for _ in range(20):
        n = rng.randint(0, 30); tests.append(f"{n} {rng.randint(0, 35)}")
    for _ in range(15):
        n = rng.randint(0, N); tests.append(f"{n} {rng.randint(0, N)}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    n, r = map(int, t)
    assert 0 <= n <= 10**5 and 0 <= r <= 10**5

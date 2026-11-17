import random

def generate(rng: random.Random) -> list[str]:
    T = 10**12
    tests = ["1 1", "1 2", "2 2", "4 4", "1 1000000", "1 1000001", f"{T} {T}", f"{T - 10**6} {T}",
             "999999999989 999999999989", "1000000 2000000", "999999999000 1000000000000",
             "25 25", "999966000289 999966000289", "1000000007 1000000007"]
    for _ in range(18):
        a = rng.randint(1, 1000); b = rng.randint(a, a + 1000)
        tests.append(f"{a} {b}")
    for _ in range(15):
        a = rng.randint(1, T); b = min(T, a + rng.randint(0, 10**4))
        tests.append(f"{a} {b}")
    for _ in range(2):
        a = rng.randint(1, T - 10**6); tests.append(f"{a} {a + 10**6}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    L, R = map(int, t)
    assert 1 <= L <= R <= 10**12 and R - L <= 10**6

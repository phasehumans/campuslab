import random

def generate(rng: random.Random) -> list[str]:
    M = 5 * 10**6
    tests = ["1 1", "2 2", "1 2", "4 4", "14 16", "24 28", f"1 {M}", f"{M} {M}", f"4999963 {M}",
             f"4000000 {M}", "999900 1000000", "100 1000", "3 3", "90 96", "1 3"]
    for _ in range(20):
        a = rng.randint(1, 300); b = rng.randint(a, 300)
        tests.append(f"{a} {b}")
    for _ in range(15):
        a = rng.randint(1, M); b = rng.randint(a, M)
        tests.append(f"{a} {b}")
    return tests

def validate(inp: str) -> None:
    t = inp.split()
    assert len(t) == 2
    L, R = map(int, t)
    assert 1 <= L <= R <= 5 * 10**6

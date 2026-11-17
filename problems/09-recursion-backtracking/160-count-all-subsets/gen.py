import random


def generate(rng: random.Random) -> list[str]:
    tests = []

    def add(arr):
        tests.append(f"{len(arr)}\n{' '.join(map(str, arr))}")

    add([5]); add([-50]); add([50, -50]); add([7] * 15); add(list(range(1, 16)))
    add(list(range(-50, 51, 7))); add([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7])
    while len(tests) < 60:
        n = rng.randint(1, 15)
        k = rng.choice([1, 2, 3, 5, 10, 101])
        pool = rng.sample(range(-50, 51), k)
        add([rng.choice(pool) for _ in range(n)])
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 15 and len(tok) == n + 1
    assert all(-50 <= int(x) <= 50 for x in tok[1:])

import random


def make(coins, amount):
    return f"{len(coins)} {amount}\n" + " ".join(map(str, coins))


def generate(rng: random.Random) -> list[str]:
    tests = [make([1], 0), make([2], 3), make([2], 0), make([1], 10000), make([2147483647], 10000),
             make([2147483647, 1], 7), make([10000], 10000), make([3, 7], 10000), make([186, 419, 83, 408], 6249),
             make([5, 10], 9999), make([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], 9999),
             make([9999, 9998, 9997, 9996, 9995, 9994, 9993, 9992, 9991, 9990, 9989, 1], 10000)]
    for _ in range(25):
        k = rng.randint(1, 5)
        tests.append(make([rng.randint(1, 30) for _ in range(k)], rng.randint(0, 100)))
    for _ in range(15):
        k = rng.randint(1, 12)
        tests.append(make([rng.randint(1, rng.choice([100, 2000, 2**31 - 1])) for _ in range(k)], rng.randint(0, 10000)))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    n, amount = map(int, lines[0].split())
    assert 1 <= n <= 12 and 0 <= amount <= 10**4
    c = list(map(int, lines[1].split()))
    assert len(c) == n
    assert all(1 <= x <= 2**31 - 1 for x in c)

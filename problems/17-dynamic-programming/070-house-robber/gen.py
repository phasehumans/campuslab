import random


def arr(n, rng, hi):
    return f"{n}\n" + " ".join(str(rng.randint(0, hi)) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    tests = ["1\n0", "1\n1000000000", "2\n5 7", "2\n7 5", "3\n0 0 0", "3\n2 1 2",
             "4\n1000000000 1000000000 1000000000 1000000000", "5\n1 100 1 1 100"]
    for _ in range(25):
        tests.append(arr(rng.randint(1, 10), rng, rng.choice([5, 100, 10**9])))
    for _ in range(12):
        tests.append(arr(rng.randint(10, 2000), rng, rng.choice([100, 10**9])))
    tests.append(arr(100000, rng, 10**9))
    tests.append("100000\n" + " ".join(["1000000000"] * 100000))
    tests.append(arr(100000, rng, 3))
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    n = int(lines[0])
    assert 1 <= n <= 10**5
    a = list(map(int, lines[1].split()))
    assert len(a) == n
    assert all(0 <= x <= 10**9 for x in a)

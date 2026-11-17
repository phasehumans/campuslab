import random


def arr(n, rng, lo=0, hi=999):
    return f"{n}\n" + " ".join(str(rng.randint(lo, hi)) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    tests = ["2\n0 0", "2\n999 0", "2\n0 999", "3\n1 1 1", "2\n5 5",
             "5\n" + " ".join(["999"] * 5), "6\n0 0 0 0 0 0", "4\n1 999 999 1"]
    for _ in range(25):
        tests.append(arr(rng.randint(2, 10), rng, 0, rng.choice([1, 10, 999])))
    for _ in range(12):
        tests.append(arr(rng.randint(10, 1000), rng))
    tests.append(arr(100000, rng))
    tests.append(arr(100000, rng, 990, 999))
    tests.append("100000\n" + " ".join(["999"] * 100000))
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    n = int(lines[0])
    assert 2 <= n <= 10**5
    a = list(map(int, lines[1].split()))
    assert len(a) == n
    assert all(0 <= x <= 999 for x in a)

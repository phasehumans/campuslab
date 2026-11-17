import random


def generate(rng: random.Random) -> list[str]:
    tests = ["1\n5\n", "1\n-100\n", "1\n0\n", "2\n-1 1\n", "15\n" + " ".join(map(str, range(1, 16))) + "\n",
             "15\n" + " ".join(map(str, range(100, 85, -1))) + "\n"]
    for _ in range(60):
        n = rng.randint(1, 10) if len(tests) < 52 else rng.randint(13, 15)
        a = rng.sample(range(-100, 101), n)
        tests.append(f"{n}\n{' '.join(map(str, a))}\n")
    return tests[:53]


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    n = t[0]
    a = t[1:]
    assert 1 <= n <= 15 and len(a) == n
    assert all(-100 <= x <= 100 for x in a) and len(set(a)) == n

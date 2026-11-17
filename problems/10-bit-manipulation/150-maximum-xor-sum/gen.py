import random

M = 10**18


def make(rng, n, hi=M):
    a = [rng.randint(0, hi) for _ in range(n)]
    return f"{n}\n{' '.join(map(str, a))}\n"


def generate(rng: random.Random) -> list[str]:
    tests = ["1\n0\n", "1\n1000000000000000000\n", "2\n5 5\n", "3\n1 2 3\n", "4\n0 0 0 0\n",
             "5\n1 2 4 8 16\n", "3\n1000000000000000000 999999999999999999 1\n"]
    for _ in range(22):
        tests.append(make(rng, rng.randint(1, 10), rng.choice([7, 63, 1000, M])))
    for _ in range(14):
        tests.append(make(rng, rng.randint(10, 1000), rng.choice([2**10, 2**40, M])))
    for _ in range(3):
        # few independent vectors spread across many copies
        base = [rng.randint(0, 2**59 - 1) for _ in range(rng.randint(3, 12))]
        arr = []
        for _ in range(500):
            x = 0
            for v in base:
                if rng.random() < 0.5:
                    x ^= v
            arr.append(x)
        tests.append(f"500\n{' '.join(map(str, arr))}\n")
    tests.append(make(rng, 10**5))
    tests.append(make(rng, 10**5, 2**30))
    tests.append("100000\n" + " ".join(str(1 << (i % 60)) for i in range(10**5)) + "\n")
    return tests


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    n, a = t[0], t[1:]
    assert 1 <= n <= 10**5 and len(a) == n
    assert all(0 <= x <= M for x in a)

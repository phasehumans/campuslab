import random


def make(a):
    return f"{len(a)}\n" + " ".join(map(str, a))


def generate(rng: random.Random) -> list[str]:
    tests = [make([5]), make([-10000]), make([7, 7, 7, 7]), make([1, 2, 3, 4, 5]), make([5, 4, 3, 2, 1]),
             make([1, 3, 2, 4, 3, 5]), make([-10000, 10000]), make([10000, -10000]),
             make(list(range(-1250, 1250))), make(list(range(10000, 7500, -1))), make([0] * 2500)]
    for _ in range(22):
        hi = rng.choice([3, 20, 10**4])
        tests.append(make([rng.randint(-hi, hi) for _ in range(rng.randint(1, 12))]))
    for _ in range(12):
        hi = rng.choice([50, 10**4])
        tests.append(make([rng.randint(-hi, hi) for _ in range(rng.randint(12, 2500))]))
    tests.append(make([rng.randint(-10**4, 10**4) for _ in range(2500)]))
    tests.append(make(sorted(rng.randint(-10**4, 10**4) for _ in range(2500))))
    tests.append(make([i // 3 + rng.randint(0, 5) for i in range(2500)]))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    n = int(lines[0])
    assert 1 <= n <= 2500
    a = list(map(int, lines[1].split()))
    assert len(a) == n
    assert all(-10**4 <= x <= 10**4 for x in a)

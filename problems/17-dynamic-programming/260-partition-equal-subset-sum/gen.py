import random


def make(a):
    return f"{len(a)}\n" + " ".join(map(str, a))


def generate(rng: random.Random) -> list[str]:
    tests = [make([1]), make([100]), make([2, 2]), make([1, 2]), make([1, 1, 1]), make([3, 3, 3, 3]),
             make([100] * 200), make([100] * 199 + [1]), make([1] * 200), make([1] * 199 + [3]),
             make([99] * 100 + [100] * 100), make([1, 2, 3, 4, 5, 6, 7])]
    for _ in range(25):
        tests.append(make([rng.randint(1, rng.choice([5, 20, 100])) for _ in range(rng.randint(1, 10))]))
    for _ in range(10):
        tests.append(make([rng.randint(1, 100) for _ in range(rng.randint(10, 200))]))
    # even total but no partition: all even except constructed
    for _ in range(4):
        a = [rng.choice([2, 4, 6]) * 10 for _ in range(rng.randint(3, 30))]
        a.append(sum(a) + 20 if sum(a) + 20 <= 100 else 100)
        tests.append(make(a[:200]))
    tests.append(make([rng.randint(1, 100) for _ in range(200)]))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    n = int(lines[0])
    assert 1 <= n <= 200
    a = list(map(int, lines[1].split()))
    assert len(a) == n
    assert all(1 <= x <= 100 for x in a)

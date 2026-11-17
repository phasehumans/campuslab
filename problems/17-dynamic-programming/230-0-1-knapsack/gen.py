import random


def make(vals, wts, W):
    return f"{len(vals)} {W}\n" + " ".join(map(str, vals)) + "\n" + " ".join(map(str, wts))


def rnd(rng, n, W, vmax, wmax):
    return make([rng.randint(1, vmax) for _ in range(n)], [rng.randint(1, wmax) for _ in range(n)], W)


def generate(rng: random.Random) -> list[str]:
    tests = [make([5], [1], 1), make([5], [2], 1), make([100000], [1000], 1000), make([7, 8], [3, 3], 5),
             make([1, 1, 1], [1, 1, 1], 1000), make([10, 20, 30], [1000, 1000, 1000], 999)]
    for _ in range(25):
        tests.append(rnd(rng, rng.randint(1, 8), rng.randint(1, 20), rng.choice([10, 100000]), rng.choice([5, 20])))
    for _ in range(14):
        tests.append(rnd(rng, rng.randint(10, 300), rng.randint(1, 1000), 100000, rng.choice([50, 1000])))
    tests.append(rnd(rng, 1000, 1000, 100000, 1000))
    tests.append(rnd(rng, 1000, 1000, 100000, 30))
    tests.append(make([100000] * 1000, [1] * 1000, 1000))
    tests.append(rnd(rng, 1000, 1000, 10, 1000))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    n, W = map(int, lines[0].split())
    assert 1 <= n <= 1000 and 1 <= W <= 1000
    v = list(map(int, lines[1].split()))
    w = list(map(int, lines[2].split()))
    assert len(v) == n and len(w) == n
    assert all(1 <= x <= 10**5 for x in v)
    assert all(1 <= x <= 1000 for x in w)

import random

LIMIT = 2**31 - 1


def count(cands, target):
    ways = [0] * (target + 1)
    ways[0] = 1
    for c in cands:
        for t in range(c, target + 1):
            ways[t] += ways[t - c]
    return ways[target]


def generate(rng: random.Random) -> list[str]:
    tests = []

    def add(cands, target):
        if count(cands, target) <= LIMIT:
            tests.append(f"{len(cands)} {target}\n{' '.join(map(str, cands))}")

    add([1], 1); add([2], 1); add([200], 500); add([7, 3], 1); add([1], 500)
    add([2, 4, 6, 8], 7); add(list(range(1, 31)), 60); add(list(range(171, 201)), 500)
    add([5, 10, 25, 50, 100, 200], 500); add([3, 7, 11, 13, 17, 19, 23], 200)
    while len(tests) < 40:
        n = rng.randint(1, 8)
        cands = rng.sample(range(1, 41), n)
        add(cands, rng.randint(1, 60))
    while len(tests) < 60:
        n = rng.randint(1, 30)
        lo = rng.choice([1, 10, 30, 60])
        cands = rng.sample(range(lo, 201), n)
        add(cands, rng.randint(1, 500))
    return tests


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    n, target = tok[0], tok[1]
    cands = tok[2:]
    assert 1 <= n <= 30 and len(cands) == n
    assert 1 <= target <= 500
    assert all(1 <= c <= 200 for c in cands) and len(set(cands)) == n
    assert count(cands, target) <= LIMIT

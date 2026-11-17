import random
from collections import Counter


def make(rng, n, hi=10**9):
    k = (n - 2) // 2
    vals = set()
    while len(vals) < k + 2:
        vals.add(rng.randint(0, hi))
    vals = list(vals)
    arr = vals[:k] * 2 + vals[k:]
    rng.shuffle(arr)
    return f"{n}\n{' '.join(map(str, arr))}\n"


def generate(rng: random.Random) -> list[str]:
    tests = ["4\n0 1000000000 5 5\n", "4\n0 1 2 2\n", "4\n7 7 3 4\n", "6\n1 1 2 2 3 4\n"]
    for _ in range(25):
        tests.append(make(rng, 2 * rng.randint(2, 6), 20))
    for _ in range(16):
        tests.append(make(rng, 2 * rng.randint(5, 500)))
    for _ in range(3):
        tests.append(make(rng, 10**5))
    tests.append(make(rng, 10**5, 60000))
    return tests


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    n, a = t[0], t[1:]
    assert 4 <= n <= 10**5 and n % 2 == 0 and len(a) == n
    assert all(0 <= x <= 10**9 for x in a)
    c = Counter(a)
    assert list(c.values()).count(1) == 2 and all(v in (1, 2) for v in c.values())

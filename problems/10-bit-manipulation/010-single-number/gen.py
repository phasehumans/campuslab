import random


def make(rng, n, lo=-10**9, hi=10**9):
    k = (n - 1) // 2
    vals = set()
    while len(vals) < k + 1:
        vals.add(rng.randint(lo, hi))
    vals = list(vals)
    arr = vals[:k] * 2 + [vals[k]]
    rng.shuffle(arr)
    return f"{n}\n{' '.join(map(str, arr))}\n"


def generate(rng: random.Random) -> list[str]:
    tests = ["1\n0\n", "1\n-1000000000\n", "1\n1000000000\n", "3\n-5 -5 0\n",
             "3\n1000000000 -1000000000 1000000000\n", "5\n0 0 -1 -1 7\n"]
    for _ in range(25):
        tests.append(make(rng, 2 * rng.randint(0, 5) + 1, -10, 10))
    for _ in range(14):
        tests.append(make(rng, 2 * rng.randint(5, 500) + 1))
    for _ in range(4):
        tests.append(make(rng, 99999))
    tests.append(make(rng, 99999, -50000, 50000))
    return tests


def validate(inp: str) -> None:
    t = inp.split()
    n = int(t[0])
    a = list(map(int, t[1:]))
    assert 1 <= n <= 10**5 and n % 2 == 1 and len(a) == n
    assert all(-10**9 <= x <= 10**9 for x in a)
    from collections import Counter
    c = Counter(a)
    assert sorted(c.values()).count(1) == 1 and all(v in (1, 2) for v in c.values())

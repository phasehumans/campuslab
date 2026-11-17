import random


def fmt(a, b, k):
    return f"{len(a)} {len(b)}\n{' '.join(map(str, a))}\n{' '.join(map(str, b))}\n{k}"


def generate(rng: random.Random) -> list[str]:
    t = [fmt([1], [1], 1), fmt([1], [2], 5), fmt([1, 1, 2], [1, 2, 3], 2), fmt([1, 1, 2], [1, 2, 3], 10),
         fmt([-10**9, 10**9], [-10**9, 10**9], 4), fmt([0, 0, 0], [0, 0], 6), fmt([1, 2, 3], [-3, -2, -1], 9)]
    for i in range(38):
        n1 = rng.randint(1, 6 if i < 20 else 200)
        n2 = rng.randint(1, 6 if i < 20 else 200)
        hi = rng.choice([2, 10, 1000, 10**9])
        a = sorted(rng.randint(-hi, hi) for _ in range(n1))
        b = sorted(rng.randint(-hi, hi) for _ in range(n2))
        k = rng.randint(1, min(10**4, n1 * n2 + 3))
        t.append(fmt(a, b, k))
    big = 10**5
    for hi, k in ((10**9, 10**4), (5, 10**4), (10**9, 1)):
        m = 80000 if hi > 10**6 else big
        a = sorted(rng.randint(-hi, hi) for _ in range(m))
        b = sorted(rng.randint(-hi, hi) for _ in range(m))
        t.append(fmt(a, b, k))
    a = sorted(rng.randint(-10**9, 10**9) for _ in range(big))
    t.append(fmt(a, [rng.randint(-10**9, 10**9)], 10**4))
    t.append(fmt([0], a, 10**4))
    return t


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    n1, n2 = tok[0], tok[1]
    assert 1 <= n1 <= 10**5 and 1 <= n2 <= 10**5
    a = tok[2:2 + n1]
    b = tok[2 + n1:2 + n1 + n2]
    k = tok[2 + n1 + n2]
    assert len(tok) == 3 + n1 + n2
    assert 1 <= k <= 10**4
    assert a == sorted(a) and b == sorted(b)
    assert all(-10**9 <= x <= 10**9 for x in a + b)

import random


def mk(a, b):
    a, b = sorted(a), sorted(b)
    return f"{len(a)} {len(b)}\n" + " ".join(map(str, a)) + "\n" + " ".join(map(str, b))


def case(rng, m, n, r):
    common = rng.randint(-r, r)
    a = [rng.randint(-r, r) for _ in range(m - 1)] + [common]
    b = [rng.randint(-r, r) for _ in range(n - 1)] + [common]
    return mk(a, b)


def generate(rng: random.Random) -> list[str]:
    t = [mk([5], [5]), mk([1, 1, 1, 1], [1, 1, 1, 1]), mk([-10, -5, 0, 5, 10], [-5, 0, 2, 10, 12, 15]),
         mk([1, 2, 3, 4, 5, 6], [1, 3, 5]), mk([10, 20], [1, 2, 10, 15, 20]), mk([-10**9, 10**9], [10**9]),
         mk([-10**9], [-10**9, -10**9, 0])]
    for _ in range(20):
        t.append(case(rng, rng.randint(1, 10), rng.randint(1, 10), rng.choice([3, 10, 50])))
    for _ in range(18):
        t.append(case(rng, rng.randint(10, 3000), rng.randint(10, 3000), rng.choice([100, 5000, 10**9])))
    t.append(case(rng, 80000, 80000, 10**9))
    t.append(case(rng, 100000, 100000, 50000))
    t.append(case(rng, 100000, 1, 10**9))
    x = sorted(rng.sample(range(-10**6, 10**6), 100000))
    t.append(mk(x, x))
    return t


def validate(inp: str) -> None:
    lines = inp.split("\n")
    m, n = map(int, lines[0].split())
    assert 1 <= m <= 10**5 and 1 <= n <= 10**5
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[2].split()))
    assert len(a) == m and len(b) == n
    assert a == sorted(a) and b == sorted(b)
    assert all(-10**9 <= x <= 10**9 for x in a + b)
    assert set(a) & set(b), "intersection must be non-empty"

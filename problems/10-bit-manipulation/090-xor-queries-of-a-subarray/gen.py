import random


def make(rng, n, q, hi=10**9):
    a = [rng.randint(1, hi) for _ in range(n)]
    lines = [f"{n} {q}", " ".join(map(str, a))]
    for _ in range(q):
        l = rng.randint(0, n - 1)
        r = rng.randint(l, n - 1)
        lines.append(f"{l} {r}")
    return "\n".join(lines) + "\n"


def generate(rng: random.Random) -> list[str]:
    tests = ["1 1\n7\n0 0\n", "1 1\n1000000000\n0 0\n", "2 3\n5 5\n0 1\n0 0\n1 1\n"]
    for _ in range(25):
        tests.append(make(rng, rng.randint(1, 8), rng.randint(1, 8), 15))
    for _ in range(18):
        tests.append(make(rng, rng.randint(10, 2000), rng.randint(10, 2000)))
    tests.append(make(rng, 10**5, 60000))
    n = 10**5
    tests.append(f"{n} {n}\n" + " ".join(["1000000000"] * n) + "\n" + "\n".join(f"0 {n - 1}" for _ in range(n)) + "\n")
    tests.append(make(rng, 10**5, 10**5, 3))
    return tests


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    n, q = t[0], t[1]
    assert 1 <= n <= 10**5 and 1 <= q <= 10**5
    assert len(t) == 2 + n + 2 * q
    assert all(1 <= x <= 10**9 for x in t[2:2 + n])
    for i in range(q):
        l, r = t[2 + n + 2 * i], t[3 + n + 2 * i]
        assert 0 <= l <= r < n

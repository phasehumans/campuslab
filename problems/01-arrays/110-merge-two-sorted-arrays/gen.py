import random

LIM = 10**9


def fmt(a, b):
    return f"{len(a)} {len(b)}\n{' '.join(map(str, a))}\n{' '.join(map(str, b))}"


def rs(rng, n, lo, hi):
    return sorted(rng.randint(lo, hi) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    t = [fmt([2], [1]), fmt([1, 2, 3, 4], [5, 6, 7, 8]), fmt([5, 6, 7, 8], [1, 2, 3, 4]), fmt([10, 20], [10, 20]),
         fmt([-LIM], [LIM]), fmt([LIM, LIM], [-LIM]), fmt([1, 3, 5, 7, 9], [6])]
    for _ in range(28):
        t.append(fmt(rs(rng, rng.randint(1, 12), -20, 20), rs(rng, rng.randint(1, 12), -20, 20)))
    for _ in range(10):
        t.append(fmt(rs(rng, rng.randint(1, 3000), -LIM, LIM), rs(rng, rng.randint(1, 3000), -LIM, LIM)))
    t.append(fmt(rs(rng, 50000, -LIM, LIM), rs(rng, 50000, -LIM, LIM)))
    t.append(fmt(rs(rng, 50000, -100, 100), rs(rng, 50000, -100, 100)))
    t.append(fmt(rs(rng, 50000, -LIM, 0), rs(rng, 1, 0, LIM)))
    return t


def validate(inp: str) -> None:
    lines = inp.split("\n")
    n, m = map(int, lines[0].split())
    assert 1 <= n <= 5 * 10**4 and 1 <= m <= 5 * 10**4
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[2].split()))
    assert len(a) == n and len(b) == m
    for arr in (a, b):
        assert all(-LIM <= x <= LIM for x in arr)
        assert all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))

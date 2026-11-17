import random

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def fix(rng, a, hi):
    """Make the last index reachable by bumping values where we get stuck."""
    r = 0
    for i in range(len(a) - 1):
        if r == i and a[i] == 0:
            a[i] = rng.randint(1, hi)
        r = max(r, i + a[i])
    return a

def generate(rng: random.Random) -> list[str]:
    t = [fmt([0]), fmt([1, 0]), fmt([1000, 0]), fmt([1, 1, 1, 1]), fmt([4, 1, 1, 1, 1]),
         fmt([1, 4, 0, 0, 0, 0]), fmt([2, 1, 2, 3, 0, 0, 1])]
    N = 10**4
    t.append(fmt([1] * N))
    t.append(fmt([1000] * N))
    t.append(fmt(fix(rng, [rng.randint(0, 3) for _ in range(N)], 3)))
    t.append(fmt(fix(rng, [rng.randint(0, 1000) for _ in range(N)], 1000)))
    for _ in range(12):
        n = rng.randint(50, 3000)
        hi = rng.choice([2, 5, 20, 1000])
        t.append(fmt(fix(rng, [rng.randint(0, hi) for _ in range(n)], hi)))
    for _ in range(60):
        n = rng.randint(1, 12)
        t.append(fmt(fix(rng, [rng.randint(0, 4) for _ in range(n)], 4)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); a = list(map(int, d[1:]))
    assert 1 <= n <= 10**4 and len(a) == n
    assert all(0 <= x <= 1000 for x in a)
    r = 0
    for i, x in enumerate(a):
        assert i <= r, "last index unreachable"
        r = max(r, i + x)

import random

def fmt(a, b):
    return f"{len(a)} {len(b)}\n" + " ".join(map(str, a)) + "\n" + " ".join(map(str, b))

def rl(n, lo, hi, rng):
    return sorted(rng.randint(lo, hi) for _ in range(n))

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5], []), fmt([], [-1, 0, 0]), fmt([1, 1, 1], [1, 1]), fmt([1, 2, 3], [4, 5, 6]),
         fmt([4, 5, 6], [1, 2, 3]), fmt([-10**9], [10**9]), fmt([10**9, 10**9], [-10**9])]
    for _ in range(25):
        a = rl(rng.randint(0, 8), -10, 10, rng)
        b = rl(rng.randint(0 if a else 1, 8), -10, 10, rng)
        t.append(fmt(a, b))
    for _ in range(15):
        t.append(fmt(rl(rng.randint(0, 500), -1000, 1000, rng), rl(rng.randint(1, 500), -1000, 1000, rng)))
    t.append(fmt(rl(2000, -10**9, 10**9, rng), rl(2000, -10**9, 10**9, rng)))
    t.append(fmt(rl(2000, -5, 5, rng), rl(2000, -5, 5, rng)))
    t.append(fmt([], rl(2000, -10**9, 10**9, rng)))
    return t

def validate(inp: str) -> None:
    lines = inp.split("\n")
    n1, n2 = map(int, lines[0].split())
    a = list(map(int, lines[1].split())) if len(lines) > 1 else []
    b = list(map(int, lines[2].split())) if len(lines) > 2 else []
    assert 0 <= n1 <= 2000 and 0 <= n2 <= 2000 and n1 + n2 >= 1
    assert len(a) == n1 and len(b) == n2
    assert a == sorted(a) and b == sorted(b)
    assert all(-10**9 <= x <= 10**9 for x in a + b)

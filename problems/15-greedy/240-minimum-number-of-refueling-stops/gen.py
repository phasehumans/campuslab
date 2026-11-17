import random

def fmt(target, start, st):
    lines = [f"{target} {start}", str(len(st))] + [f"{p} {f}" for p, f in st]
    return "\n".join(lines)

def rand_case(rng, n, target, fuel_hi, start=None):
    n = min(n, target - 1)
    pos = sorted(rng.sample(range(1, target), n))
    st = [(p, rng.randint(1, fuel_hi)) for p in pos]
    if start is None:
        start = rng.randint(1, max(1, pos[0] if pos else target))
    return fmt(target, start, st)

def generate(rng: random.Random) -> list[str]:
    B = 10**9
    t = [fmt(100, 10, [(10, 60), (20, 30), (30, 30), (60, 40)]), fmt(1, 1, []), fmt(B, B, []), fmt(B, 1, [(1, B - 2)]),
         fmt(B, 1, [(1, B - 1)]), fmt(10, 5, [(5, 4)]), fmt(10, 5, [(5, 5)]), fmt(10, 4, [(5, 100)]),
         fmt(100, 50, [(25, 25), (50, 50)]), fmt(B, 1, [])]
    # large: 500 stations
    t.append(rand_case(rng, 500, B, 10**7))
    t.append(rand_case(rng, 500, B, 4 * 10**6))
    t.append(rand_case(rng, 500, B, B))
    st = [(i * 2 * 10**6, 2 * 10**6) for i in range(1, 500)]
    t.append(fmt(B, 2 * 10**6, st))
    t.append(fmt(B, 2 * 10**6, [(i * 2 * 10**6, 2 * 10**6 if i != 250 else 1) for i in range(1, 500)]))
    for _ in range(12):
        n = rng.randint(10, 500)
        target = rng.randint(n + 1, 10**6)
        t.append(rand_case(rng, n, target, max(1, 3 * target // n)))
    for _ in range(60):
        n = rng.randint(0, 6)
        target = rng.randint(n + 1, 40)
        t.append(rand_case(rng, n, target, 15))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    target, start, n = d[0], d[1], d[2]
    assert 1 <= target <= 10**9 and 1 <= start <= 10**9
    assert 0 <= n <= 500 and len(d) == 3 + 2 * n
    prev = 0
    for i in range(n):
        p, f = d[3 + 2 * i], d[4 + 2 * i]
        assert prev < p < target
        assert 1 <= f <= 10**9
        prev = p

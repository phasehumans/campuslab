import random

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def reachable(a):
    r = 0
    for i, x in enumerate(a):
        if i > r:
            return False
        r = max(r, i + x)
    return True

def rand_arr(rng, n, hi, pzero):
    return [0 if rng.random() < pzero else rng.randint(1, hi) for _ in range(n)]

def generate(rng: random.Random) -> list[str]:
    t = [fmt([0]), fmt([5]), fmt([0, 1]), fmt([1, 0]), fmt([1, 1, 0, 1]), fmt([2, 0, 0]),
         fmt([3, 0, 0, 0]), fmt([3, 0, 0, 0, 1]), fmt([1, 2, 0, 0, 1])]
    N = 10**5
    t.append(fmt([1] * N))
    t.append(fmt([1] * (N // 2) + [0] + [1] * (N - N // 2 - 1)))
    t.append(fmt([10**5] + [0] * (N - 1)))
    t.append(fmt([0] + [10**5] * (N - 1)))
    t.append(fmt(rand_arr(rng, N, 3, 0.3)))
    for _ in range(12):
        n = rng.randint(100, 5000)
        t.append(fmt(rand_arr(rng, n, rng.choice([2, 3, 5]), rng.choice([0.2, 0.4, 0.5]))))
    yes = no = 0
    while yes + no < 70:
        n = rng.randint(1, 12)
        a = rand_arr(rng, n, 4, 0.35)
        r = reachable(a)
        if (r and yes < 35) or (not r and no < 35):
            yes += r; no += not r
            t.append(fmt(a))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); a = list(map(int, d[1:]))
    assert 1 <= n <= 10**5 and len(a) == n
    assert all(0 <= x <= 10**5 for x in a)

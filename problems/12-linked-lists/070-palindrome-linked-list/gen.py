import random

def fmt(a):
    return f"{len(a)}\n" + " ".join(map(str, a))

def pal(n, lo, hi, rng):
    h = [rng.randint(lo, hi) for _ in range(n // 2)]
    mid = [rng.randint(lo, hi)] if n % 2 else []
    return h + mid + h[::-1]

def generate(rng: random.Random) -> list[str]:
    t = [fmt([1]), fmt([1, 1]), fmt([1, 2]), fmt([-10**9, 10**9, -10**9]), fmt([1, 2, 1, 1]),
         fmt([3, 3, 3, 3, 3])]
    for _ in range(25):
        n = rng.randint(1, 10)
        a = pal(n, -3, 3, rng)
        if rng.random() < 0.5:
            a[rng.randrange(n)] = rng.randint(-3, 3)
        t.append(fmt(a))
    for _ in range(14):
        n = rng.randint(10, 3000)
        a = pal(n, -10**9, 10**9, rng)
        if rng.random() < 0.5:
            i = rng.randrange(n)
            a[i] += 1 if a[i] < 10**9 else -1
        t.append(fmt(a))
    a = pal(10**5, -10**9, 10**9, rng); t.append(fmt(a))
    a = pal(99999, -10**9, 10**9, rng); t.append(fmt(a))
    a = pal(10**5, -10**9, 10**9, rng); a[49999] = a[50000] + 1 if a[50000] < 10**9 else a[50000] - 1; t.append(fmt(a))
    a = pal(10**5, 0, 1, rng); a[0] = 1 - a[-1]; t.append(fmt(a))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 10**5 and len(d) == n + 1
    assert all(-10**9 <= int(x) <= 10**9 for x in d[1:])

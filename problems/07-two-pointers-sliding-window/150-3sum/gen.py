import random


def has_triplet(a):
    s = sorted(a)
    n = len(s)
    for i in range(n):
        l, r = i + 1, n - 1
        while l < r:
            v = s[i] + s[l] + s[r]
            if v == 0:
                return True
            if v < 0:
                l += 1
            else:
                r -= 1
    return False


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}\n"


def make(rng, n, lo, hi):
    while True:
        a = [rng.randint(lo, hi) for _ in range(n)]
        if not has_triplet(a):
            x, y = rng.randint(lo // 2, hi // 2), rng.randint(lo // 2, hi // 2)
            i, j, k = rng.sample(range(n), 3)
            a[i], a[j], a[k] = x, y, -x - y
        if has_triplet(a):
            return fmt(a)


def generate(rng):
    M = 10**5
    t = [fmt([0, 0, 0]), fmt([-M, 0, M]), fmt([M, -M // 2, -M // 2]), fmt([1, -1, 0, 0, 0, 1, -1]),
         fmt([-2, 1, 1, 1, 1]), fmt([-4, -1, -1, 0, 1, 2])]
    t.append(make(rng, 3000, -M, M))
    t.append(make(rng, 3000, -100, 100))
    t.append(fmt([0] * 3000))
    t.append(make(rng, 3000, -3000, 3000))
    for _ in range(25):
        t.append(make(rng, rng.randint(3, 10), -5, 5))
    for _ in range(15):
        t.append(make(rng, rng.randint(10, 300), -60, 60))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n = d[0]
    assert 3 <= n <= 3000 and len(d) == n + 1
    assert all(-10**5 <= x <= 10**5 for x in d[1:])
    assert has_triplet(d[1:])

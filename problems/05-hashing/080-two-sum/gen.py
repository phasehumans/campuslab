import random
from collections import Counter


def pairs(a, t):
    c = Counter()
    cnt = 0
    for x in a:
        cnt += c[t - x]
        c[x] += 1
    return cnt


def make(rng, n, lo, hi):
    while True:
        a = [rng.randint(lo, hi) for _ in range(n)]
        i, j = rng.sample(range(n), 2)
        t = a[i] + a[j]
        if pairs(a, t) == 1:
            return f"{n} {t}\n{' '.join(map(str, a))}\n"


def generate(rng):
    t = ["2 10\n5 5\n", "2 0\n-1000000000 1000000000\n", "2 2000000000\n1000000000 1000000000\n",
         "2 -2000000000\n-1000000000 -1000000000\n", "3 0\n0 0 7\n", "5 0\n1 2 -3 4 3\n",
         "4 5\n1 2 3 6\n"]
    for _ in range(18):
        t.append(make(rng, rng.randint(2, 8), -20, 20))
    for _ in range(24):
        t.append(make(rng, rng.randint(2, 300), -10**4, 10**4))
    for _ in range(4):
        t.append(make(rng, 1000, -10**9, 10**9))
    # pair at the two ends of a large array
    n = 100000
    a = rng.sample(range(1, 10**9, 2), n)  # odd values only: sums are even
    a[0], a[-1] = 2, 4                       # only even values -> unique pair with sum 6
    t.append(f"{n} 6\n{' '.join(map(str, a))}\n")
    for _ in range(3):
        t.append(make(rng, 100000, -10**9, 10**9))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    d = inp.split()
    n, tg = int(d[0]), int(d[1])
    a = list(map(int, d[2:]))
    assert 2 <= n <= 10**5 and len(a) == n
    assert all(-10**9 <= x <= 10**9 for x in a)
    assert -2 * 10**9 <= tg <= 2 * 10**9
    assert pairs(a, tg) == 1

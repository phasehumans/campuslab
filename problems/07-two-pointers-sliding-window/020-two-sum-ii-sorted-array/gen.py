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
        a = sorted(rng.randint(lo, hi) for _ in range(n))
        i, j = sorted(rng.sample(range(n), 2))
        t = a[i] + a[j]
        if -10**9 <= t <= 10**9 and pairs(a, t) == 1:
            return f"{n} {t}\n{' '.join(map(str, a))}\n"


def generate(rng):
    t = ["2 10\n5 5\n", "2 0\n-1000000000 1000000000\n", "2 -3\n-2 -1\n", "3 0\n-1 1 5\n",
         "5 2\n-1 0 1 2 3\n".replace("5 2", "5 5"), "4 1000000000\n1 2 3 999999999\n"]
    big = 100000
    a = list(range(1, 2 * big, 2))[:big]      # odd numbers, sums are even
    a[0] = 0
    t.append(f"{big} {a[0] + a[-1]}\n{' '.join(map(str, a))}\n")
    for _ in range(3):
        t.append(make(rng, big, -5 * 10**8, 5 * 10**8))
    for _ in range(25):
        t.append(make(rng, rng.randint(2, 8), -15, 15))
    for _ in range(16):
        t.append(make(rng, rng.randint(10, 2000), -10**6, 10**6))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n, tg = d[0], d[1]
    a = d[2:]
    assert 2 <= n <= 10**5 and len(a) == n and a == sorted(a)
    assert all(-10**9 <= x <= 10**9 for x in a) and -10**9 <= tg <= 10**9
    assert pairs(a, tg) == 1

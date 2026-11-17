import random
from collections import Counter

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(strs, k):
    return f"{len(strs)} {k}\n" + "\n".join(strs)

def ok(strs, k):
    return max(Counter(s[0] for s in strs).values()) >= k

def case(rng, n, alpha, maxlen, kmax=None):
    while True:
        strs = []
        for _ in range(n):
            if strs and rng.random() < 0.4:
                b = rng.choice(strs)
                s = b[:rng.randint(1, len(b))] + rs(rng, rng.randint(0, 3), alpha)
                strs.append(s[:maxlen])
            else:
                strs.append(rs(rng, rng.randint(1, maxlen), alpha))
        k = rng.randint(1, kmax or n)
        if ok(strs, k):
            return make(strs, k)

def generate(rng):
    t = [make(["a"], 1), make(["abc", "abd"], 2), make(["abc", "abd"], 1), make(["x" * 100] * 3, 3),
         make(["b", "a", "b", "a"], 2), make(["aa", "ab", "ba", "bb"], 2), make(["test", "test", "test"], 2),
         make(["zz", "zy", "zx", "zw"], 4)]
    for _ in range(25):
        t.append(case(rng, rng.randint(1, 10), "ab", 6))
    for _ in range(12):
        t.append(case(rng, rng.randint(50, 1000), "abc", 15, 40))
    t.append(case(rng, 50000, "ab", 10, 5000))
    t.append(case(rng, 5000, "abcdefghijklmnopqrstuvwxyz", 100, 10))
    t.append(make([rs(rng, 10, "abcdefghijklmnopqrstuvwxyz") for _ in range(50000)], 1500))
    t.append(make(["a" * 100] * 5000, 5000))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    n, k = map(int, lines[0].split())
    assert 1 <= n <= 5 * 10**4 and 1 <= k <= n and len(lines) == n + 1
    strs = lines[1:]
    for s in strs:
        assert 1 <= len(s) <= 100 and s.isalpha() and s.islower()
    assert sum(map(len, strs)) <= 5 * 10**5
    assert ok(strs, k)

import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def has_dup(s):
    return len(set(s)) < len(s)

def generate(rng):
    t = ["aa", "aab", "aba", "abab", "aaaaa", "abcabc", "abcdbcda", "mississippi", "abxcdxabycd", "cdxabxabcd",
         "zyxwvutsrqponmlkjihgfedcbaz"]
    while len(t) < 36:
        s = rs(rng, rng.randint(2, 20), rng.choice(["ab", "abc", "abcdef"]))
        if has_dup(s):
            t.append(s)
    for _ in range(9):
        n = rng.randint(100, 5000)
        if rng.random() < 0.5:
            s = rs(rng, n, "abcdefghijklmnopqrstuvwxyz")
        else:
            blk = rs(rng, rng.randint(5, 60), "ab")
            s = rs(rng, n // 3, "abc") + blk + rs(rng, n // 3, "abc") + blk + rs(rng, n // 3, "ab")
        t.append(s)
    N = 100000
    t.append("a" * N)
    t.append(rs(rng, N, "abcdefghijklmnopqrstuvwxyz"))
    t.append(rs(rng, N, "ab"))
    blk = rs(rng, 30000, "abcdefghijklmnopqrstuvwxyz")
    t.append(rs(rng, 20000, "abcdefghijklmnopqrstuvwxyz") + blk + rs(rng, 20000, "abcdefghijklmnopqrstuvwxyz") + blk[:29999])
    t.append(("abcab" * N)[:N])
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    assert len(lines) == 1
    s = lines[0]
    assert 2 <= len(s) <= 10**5 and s.isalpha() and s.islower()
    assert has_dup(s)

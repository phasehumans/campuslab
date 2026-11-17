import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(s, qs):
    return f"{s}\n{len(qs)}\n" + "\n".join(qs)

def queries(rng, s, q, alpha, maxp):
    qs = []
    for _ in range(q):
        r = rng.random()
        if r < 0.1:
            qs.append("distinct")
        elif r < 0.7:
            i = rng.randrange(len(s)); L = rng.randint(1, maxp)
            qs.append("count " + s[i:i + L])
        else:
            qs.append("count " + rs(rng, rng.randint(1, maxp), alpha))
    return qs

def generate(rng):
    t = [make("a", ["distinct"]), make("a", ["count a", "count b", "count aa"]), make("ab", ["distinct", "count ab", "count ba"]),
         make("aaaaa", ["distinct", "count a", "count aa", "count aaaaa", "count aaaaaa"]),
         make("abcdefghijklmnopqrstuvwxyz", ["distinct", "count xyz", "count z"]),
         make("abababab", ["distinct", "count ab", "count aba", "count bab"])]
    for _ in range(26):
        s = rs(rng, rng.randint(1, 15), "ab")
        t.append(make(s, queries(rng, s, rng.randint(1, 8), "ab", 4)))
    for _ in range(13):
        s = rs(rng, rng.randint(100, 5000), rng.choice(["ab", "abc", "abcdefghijklmnopqrstuvwxyz"]))
        t.append(make(s, queries(rng, s, rng.randint(10, 500), "abc", 10)))
    N = 100000
    s = "a" * N
    t.append(make(s, ["distinct"] + ["count " + "a" * rng.randint(1, 100) for _ in range(5000)] + ["count " + "a" * N, "count " + "a" * (N - 1) + "b"]))
    s = rs(rng, N, "ab")
    t.append(make(s, queries(rng, s, 30000, "ab", 12)))
    s = rs(rng, N, "abcdefghijklmnopqrstuvwxyz")
    t.append(make(s, queries(rng, s, 20000, "abcdefghijklmnopqrstuvwxyz", 20)))
    s = ("abcab" * N)[:N]
    t.append(make(s, queries(rng, s, 5000, "abc", 80)))
    s = rs(rng, N, "abc")
    t.append(make(s, ["distinct"] * 100000))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    s = lines[0]
    assert 1 <= len(s) <= 10**5 and s.isalpha() and s.islower()
    q = int(lines[1])
    assert 1 <= q <= 10**5 and len(lines) == q + 2
    tot = 0
    for l in lines[2:]:
        if l == "distinct":
            continue
        a, p = l.split(" ")
        assert a == "count" and 1 <= len(p) <= 10**5 and p.isalpha() and p.islower()
        tot += len(p)
    assert tot <= 5 * 10**5

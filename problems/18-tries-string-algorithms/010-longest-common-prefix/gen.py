import random

def rs(rng, n, alpha="abc"):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(strs):
    return f"{len(strs)}\n" + "\n".join(strs)

def with_prefix(rng, n, plen, maxlen, alpha="abcdefghijklmnopqrstuvwxyz"):
    p = rs(rng, plen, alpha)
    out = []
    for _ in range(n):
        out.append(p + rs(rng, rng.randint(0, maxlen - plen), alpha))
    return out

def generate(rng):
    t = [make(["a"]), make(["z" * 1000]), make(["abc", "abc"]), make(["ab", "abc", "abcd"]),
         make(["abcd", "abc", "ab", "a"]), make(["a"] * 1000), make(["prefix", "pre", "prefixes"]),
         make(["interspecies", "interstellar", "interstate", "internet"])]
    for _ in range(25):
        n = rng.randint(1, 8)
        t.append(make(with_prefix(rng, n, rng.randint(1, 4), rng.randint(4, 10), "ab")))
    for _ in range(12):
        n = rng.randint(2, 100)
        t.append(make(with_prefix(rng, n, rng.randint(1, 30), rng.randint(30, 60))))
    for _ in range(3):
        t.append(make(with_prefix(rng, 1000, rng.randint(1, 900), 1000)))
    return t

def validate(inp):
    lines = inp.split("\n")
    n = int(lines[0])
    assert 1 <= n <= 1000
    strs = lines[1:1 + n]
    assert len(strs) == n
    assert all(l == "" for l in lines[1 + n:])
    for s in strs:
        assert 1 <= len(s) <= 1000 and s.isalpha() and s.islower()
    p = min(strs)
    q = max(strs)
    assert q.startswith(p[:1]), "answer must be non-empty"

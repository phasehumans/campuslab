import random
import string

L = string.ascii_letters


def fmt(s, t):
    return f"{s}\n{t}\n"


def ok(s, t):
    from collections import Counter
    cs, ct = Counter(s), Counter(t)
    return all(cs[c] >= v for c, v in ct.items())


def make(rng, n, m, alpha):
    s = "".join(rng.choice(alpha) for _ in range(n))
    while True:
        t = "".join(rng.choice(alpha) for _ in range(m))
        if ok(s, t):
            return fmt(s, t)
        m = max(1, m - 1)


def generate(rng):
    t = [fmt("a", "a"), fmt("ab", "b"), fmt("aa", "aa"), fmt("abcabc", "cba"), fmt("bba", "ab"),
         fmt("xyzXYZ", "zX"), fmt("aAaA", "AA"), fmt("abcdef", "abcdef")]
    N = 10**5
    s = "".join(rng.choice(L) for _ in range(N))
    t.append(fmt(s, s[40000:40100]))
    t.append(make(rng, N, 1000, "ab"))
    s = "".join(rng.choice("abc") for _ in range(N - 1)) + "Z"
    t.append(fmt(s, "Za"))
    t.append(fmt(s, s))
    for _ in range(25):
        t.append(make(rng, rng.randint(1, 12), rng.randint(1, 4), "abc"))
    for _ in range(15):
        t.append(make(rng, rng.randint(10, 3000), rng.randint(1, 30), rng.choice([L, "abcdeABCDE", "xyz"])))
    return t


def validate(inp):
    lines = inp.split("\n")
    s, t = lines[0], lines[1]
    assert 1 <= len(s) <= 10**5 and 1 <= len(t) <= 10**5
    assert all(c in L for c in s + t)
    assert ok(s, t)

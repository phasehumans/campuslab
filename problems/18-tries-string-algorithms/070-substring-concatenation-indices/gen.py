import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def answer_exists(s, words):
    L = len(words[0]); m = len(words); tot = L * m
    target = sorted(words)
    for i in range(len(s) - tot + 1):
        if sorted(s[i + j * L:i + (j + 1) * L] for j in range(m)) == target:
            return True
    return False

def make(s, words):
    return f"{s}\n{len(words)}\n" + "\n".join(words)

def case(rng, n, m, L, alpha):
    words = [rs(rng, L, alpha) for _ in range(m)]
    if rng.random() < 0.3 and m > 1:
        words[-1] = words[0]
    parts = []
    while sum(map(len, parts)) < n:
        if rng.random() < 0.5:
            perm = words[:]
            rng.shuffle(perm)
            parts.append("".join(perm))
        else:
            parts.append(rs(rng, rng.randint(1, L * 2), alpha))
    perm = words[:]; rng.shuffle(perm)
    s = "".join(parts)
    k = rng.randint(0, max(0, n - m * L))
    s = s[:k] + "".join(perm) + s[k:]
    return s[:max(n, m * L)][:10000], words

def generate(rng):
    t = [make("a", ["a"]), make("aaaa", ["a", "a"]), make("ab", ["b"]), make("abba", ["ab", "ba"]),
         make("aaaaaaaaaaaa", ["aa", "aa"]), make("foobarfoobar", ["foo", "bar"]), make("x" * 30, ["x" * 30])]
    while len(t) < 34:
        s, w = case(rng, rng.randint(1, 30), rng.randint(1, 4), rng.randint(1, 3), "ab")
        if answer_exists(s, w):
            t.append(make(s, w))
    while len(t) < 45:
        s, w = case(rng, rng.randint(100, 2000), rng.randint(2, 20), rng.randint(1, 5), "abc")
        if answer_exists(s, w):
            t.append(make(s, w))
    t.append(make("a" * 10000, ["a"] * 300))
    t.append(make("ab" * 5000, ["ab"] * 100 + ["ba"] * 0))
    s, w = case(rng, 10000, 1000, 1, "ab"); t.append(make(s, w))
    s, w = case(rng, 10000, 300, 30, "ab"); t.append(make(s, w))
    s, w = case(rng, 10000, 50, 3, "ab"); t.append(make(s, w))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    s = lines[0]; m = int(lines[1])
    words = lines[2:]
    assert 1 <= len(s) <= 10**4 and 1 <= m <= 1000 and len(words) == m
    L = len(words[0])
    assert 1 <= L <= 30 and all(len(w) == L for w in words)
    for x in [s] + words:
        assert x.isalpha() and x.islower()
    tot = L * m
    assert tot <= len(s)

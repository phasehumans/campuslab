import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(words):
    return f"{len(words)}\n" + "\n".join(words)

def case(rng, n, alpha, maxlen, pempty=0.1):
    words = set()
    if rng.random() < pempty:
        words.add("")
    base = []
    while len(words) < n:
        r = rng.random()
        if base and r < 0.3:
            b = rng.choice(base)
            k = rng.randint(0, len(b))
            w = b[:k][::-1] if rng.random() < 0.5 else b[k:][::-1]
            if rng.random() < 0.5:
                w = b[::-1]
        elif base and r < 0.4:
            b = rng.choice(base); h = rs(rng, rng.randint(0, 2), alpha)
            w = (b + h + b[::-1])[:maxlen]
        else:
            w = rs(rng, rng.randint(1, maxlen), alpha)
        if len(w) <= maxlen:
            words.add(w); base.append(w)
    words = list(words)
    rng.shuffle(words)
    return make(words)

def generate(rng):
    t = [make(["a"]), make(["a", ""]), make(["", "a"]), make(["a", "", "aba"]), make(["abc", "cba"]),
         make(["a", "aa", "aaa", "aaaa"]), make(["ab", "cd"]), make(["lls", "s", "sssll", "abcd", "dcba"]),
         make(["x" * 100, "x" * 99, ""])]
    for _ in range(26):
        t.append(case(rng, rng.randint(1, 10), "ab", 5))
    for _ in range(11):
        t.append(case(rng, rng.randint(50, 500), "abc", 10))
    t.append(case(rng, 5000, "abcdefghijklmnopqrstuvwxyz", 100))
    t.append(case(rng, 5000, "ab", 14))
    t.append(case(rng, 5000, "abc", 100))
    t.append(make([rs(rng, 100, "ab") for _ in range(5000)]))
    return t

def validate(inp):
    assert inp.endswith("\n")
    lines = inp[:-1].split("\n")
    n = int(lines[0])
    assert 1 <= n <= 5000
    words = lines[1:]
    if len(words) == n - 1:
        words.append("")  # last word empty
    assert len(words) == n, (len(words), n)
    assert len(set(words)) == n
    for w in words:
        assert len(w) <= 100 and all("a" <= c <= "z" for c in w)

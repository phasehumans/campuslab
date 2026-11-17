import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(ops):
    return f"{len(ops)}\n" + "\n".join(f"{a} {b}" for a, b in ops)

def dotify(rng, w):
    w = list(w)
    for _ in range(rng.randint(0, 2)):
        w[rng.randrange(len(w))] = "."
    return "".join(w)

def rand_ops(rng, q, alpha, maxlen, padd=0.5):
    words, ops = [], []
    for _ in range(q):
        if rng.random() < padd or not words:
            w = rs(rng, rng.randint(1, maxlen), alpha)
            words.append(w)
            ops.append(("add", w))
        else:
            c = rng.random()
            if c < 0.5:
                w = rng.choice(words)
            else:
                w = rs(rng, rng.randint(1, maxlen), alpha)
            ops.append(("search", dotify(rng, w)))
    if all(k == "add" for k, _ in ops):
        ops.append(("search", dotify(rng, ops[0][1])))
    return ops

def generate(rng):
    t = [make([("search", "a")]), make([("search", ".")]), make([("add", "a"), ("search", ".")]),
         make([("add", "ab"), ("search", ".."), ("search", "."), ("search", "a.."), ("search", ".b")]),
         make([("add", "z" * 25), ("search", "z" * 24 + "."), ("search", "." + "z" * 23 + ".")]),
         make([("add", "abc"), ("add", "abd"), ("search", "ab."), ("search", "a.e"), ("search", "..c")])]
    for _ in range(26):
        t.append(make(rand_ops(rng, rng.randint(1, 12), "ab", 4)))
    for _ in range(13):
        t.append(make(rand_ops(rng, rng.randint(50, 600), "abcd", 8)))
    t.append(make(rand_ops(rng, 50000, "abc", 4)))
    t.append(make(rand_ops(rng, 30000, "abcdefghijklmnopqrstuvwxyz", 10, 0.6)))
    t.append(make(rand_ops(rng, 20000, "ab", 14, 0.5)))
    t.append(make(rand_ops(rng, 12000, "abcdefghijklmnopqrstuvwxyz", 25, 0.5)))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    q = int(lines[0])
    assert 1 <= q <= 5 * 10**4 and len(lines) == q + 1
    tot = 0; has_search = False
    for l in lines[1:]:
        op, w = l.split(" ")
        assert op in ("add", "search")
        assert 1 <= len(w) <= 25
        if op == "add":
            assert w.isalpha() and w.islower()
        else:
            has_search = True
            assert w.count(".") <= 2
            assert all(c == "." or "a" <= c <= "z" for c in w)
        tot += len(w)
    assert tot <= 3 * 10**5 and has_search

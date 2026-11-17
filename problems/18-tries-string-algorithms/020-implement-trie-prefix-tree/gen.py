import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(ops):
    return f"{len(ops)}\n" + "\n".join(f"{a} {b}" for a, b in ops)

def rand_ops(rng, q, alpha, maxlen, pins=0.4):
    words = []
    ops = []
    for _ in range(q):
        r = rng.random()
        if r < pins or not words:
            w = rs(rng, rng.randint(1, maxlen), alpha)
            words.append(w)
            ops.append(("insert", w))
        else:
            kind = rng.choice(["search", "startsWith"])
            c = rng.random()
            if c < 0.4:
                w = rng.choice(words)
                if kind == "startsWith" or rng.random() < 0.3:
                    w = w[:rng.randint(1, len(w))]
            elif c < 0.6:
                w = rng.choice(words) + rs(rng, rng.randint(1, 2), alpha)
                w = w[:maxlen]
            else:
                w = rs(rng, rng.randint(1, maxlen), alpha)
            ops.append((kind, w))
    if all(k == "insert" for k, _ in ops):
        ops.append(("search", ops[0][1]))
    return ops

def generate(rng):
    t = [make([("search", "a")]), make([("startsWith", "a")]), make([("insert", "a"), ("search", "a")]),
         make([("insert", "abc"), ("search", "ab"), ("startsWith", "ab"), ("startsWith", "abc"), ("search", "abcd")]),
         make([("insert", "a" * 100), ("startsWith", "a" * 100), ("search", "a" * 99)]),
         make([("insert", "x"), ("insert", "x"), ("search", "x"), ("startsWith", "xx")])]
    for _ in range(26):
        t.append(make(rand_ops(rng, rng.randint(1, 12), "ab", 4)))
    for _ in range(12):
        t.append(make(rand_ops(rng, rng.randint(50, 500), "abcde", 10)))
    t.append(make(rand_ops(rng, 100000, "ab", 3)))
    t.append(make(rand_ops(rng, 60000, "abcdefghijklmnopqrstuvwxyz", 8)))
    t.append(make(rand_ops(rng, 3000, "abcdefghijklmnopqrstuvwxyz", 100)))
    t.append(make(rand_ops(rng, 3000, "ab", 100)))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    q = int(lines[0])
    assert 1 <= q <= 10**5 and len(lines) == q + 1
    tot = 0; query = False
    for l in lines[1:]:
        op, w = l.split(" ")
        assert op in ("insert", "search", "startsWith")
        query |= op != "insert"
        assert 1 <= len(w) <= 100 and w.isalpha() and w.islower()
        tot += len(w)
    assert tot <= 3 * 10**5 and query

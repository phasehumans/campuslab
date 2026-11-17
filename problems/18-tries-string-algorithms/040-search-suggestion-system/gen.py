import random

def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))

def make(products, sw):
    return f"{len(products)}\n" + "\n".join(products) + "\n" + sw

def case(rng, n, alpha, maxlen, swlen):
    products = [rs(rng, rng.randint(1, maxlen), alpha) for _ in range(n)]
    if rng.random() < 0.3:
        products += [rng.choice(products) for _ in range(rng.randint(1, 3))]
        products = products[:1000]
    base = rng.choice(products)
    if rng.random() < 0.5:
        sw = base[:rng.randint(1, len(base))] + rs(rng, rng.randint(0, swlen), alpha)
    else:
        sw = base[0] + rs(rng, rng.randint(0, swlen), alpha)
    return make(products, sw[:1000])

def generate(rng):
    t = [make(["a"], "a"), make(["a"], "ab"), make(["abc"], "abc"), make(["a", "a", "a", "a"], "a"),
         make(["b", "a", "ab", "abc", "abd"], "abd"), make(["z" * 2000], "z" * 1000),
         make(["apple", "apricot", "apply", "ape"], "app"), make(["code"], "coder"),
         make(["a" * k for k in range(1, 51)], "a" * 60)]
    for _ in range(25):
        t.append(case(rng, rng.randint(1, 10), "ab", 5, 4))
    for _ in range(12):
        t.append(case(rng, rng.randint(20, 300), "abc", 12, 12))
    t.append(case(rng, 1000, "ab", 20, 30))
    t.append(make([rs(rng, 1000, "ab") for _ in range(1000)], "a" + rs(rng, 999, "ab")))
    p = "a" * 900
    t.append(make([p + rs(rng, 100, "ab") for _ in range(1000)], p + rs(rng, 100, "ab")))
    t.append(case(rng, 1000, "abcdefghijklmnopqrstuvwxyz", 8, 8))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    n = int(lines[0])
    assert 1 <= n <= 1000 and len(lines) == n + 2
    prods = lines[1:n + 1]; sw = lines[n + 1]
    for s in prods + [sw]:
        assert s.isalpha() and s.islower()
    assert all(1 <= len(s) <= 2000 for s in prods)
    assert sum(map(len, prods)) <= 10**6
    assert 1 <= len(sw) <= 1000
    assert any(s[0] == sw[0] for s in prods)

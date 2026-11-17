import random

def fmt(b, e, words):
    return "\n".join([b, e, str(len(words))] + words)

def rw(rng, L, alpha):
    return "".join(rng.choice(alpha) for _ in range(L))

def case(rng, K, L, alpha, include_end=True):
    b = rw(rng, L, alpha)
    e = rw(rng, L, alpha)
    while e == b:
        e = rw(rng, L, alpha)
    words = [rw(rng, L, alpha) for _ in range(K)]
    if include_end:
        words[rng.randrange(K)] = e
    return fmt(b, e, words)

def walk(rng, K, L, alpha):
    # a random walk of single-letter changes, plus noise words
    cur = rw(rng, L, alpha)
    b = cur
    path = []
    for _ in range(K // 2):
        i = rng.randrange(L)
        cur = cur[:i] + rng.choice(alpha) + cur[i + 1:]
        path.append(cur)
    e = path[-1] if path[-1] != b else rw(rng, L, alpha)
    if e == b:
        e = ("a" if b[0] != "a" else "b") + b[1:]
    words = path + [rw(rng, L, alpha) for _ in range(K - len(path))]
    rng.shuffle(words)
    return fmt(b, e, words)

def generate(rng: random.Random) -> list[str]:
    t = [fmt("a", "c", ["a", "b", "c"]), fmt("a", "b", ["c"]), fmt("ab", "cd", ["ad", "cd"]), fmt("ab", "cd", ["cb", "ad"]),
         fmt("hot", "dog", ["hot", "dog"]), fmt("lost", "cost", ["most", "cost", "lost"]), fmt("abc", "xyz", ["xyz"])]
    t.append(walk(rng, 5000, 10, "abcdefghijklmnopqrstuvwxyz"))
    t.append(walk(rng, 5000, 6, "abc"))
    t.append(case(rng, 5000, 6, "abcde"))
    t.append(case(rng, 5000, 10, "ab"))
    t.append(case(rng, 5000, 4, "abcdefghijklmnopqrstuvwxyz"))
    for i in range(14):
        K = rng.randint(20, 1500)
        if i % 2:
            t.append(walk(rng, K, rng.randint(2, 8), "abcdefghij"[: rng.randint(2, 10)]))
        else:
            t.append(case(rng, K, rng.randint(3, 6), "abcd"[: rng.randint(2, 4)], rng.random() < 0.8))
    for _ in range(60):
        K = rng.randint(3, 12)
        t.append(case(rng, K, rng.randint(2, 3), "abc", rng.random() < 0.8))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    b, e, k = d[0], d[1], int(d[2])
    words = d[3:]
    assert 1 <= k <= 5000 and len(words) == k
    L = len(b)
    assert 1 <= L <= 10 and b != e
    for w in [b, e] + words:
        assert len(w) == L and w.isalpha() and w.islower()

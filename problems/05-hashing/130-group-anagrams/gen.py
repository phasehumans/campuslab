import random


def fmt(ws):
    return f"{len(ws)}\n{' '.join(ws)}\n"


def word(rng, L, alpha="abcdefghijklmnopqrstuvwxyz"):
    return "".join(rng.choice(alpha) for _ in range(L))


def anagram_set(rng, nbase, n, L, alpha):
    bases = [word(rng, rng.randint(1, L), alpha) for _ in range(nbase)]
    ws = []
    for _ in range(n):
        b = list(rng.choice(bases))
        rng.shuffle(b)
        ws.append("".join(b))
    return ws


def generate(rng):
    t = [fmt(["z"]), fmt(["a", "a"]), fmt(["ab", "ba", "ab"]), fmt(["abc", "def", "ghi"]),
         fmt(["listen", "silent", "enlist", "google", "gogole", "cat", "act", "tac", "dog"]),
         fmt(["a" * 100, "a" * 99, "a" * 100]), fmt(["b", "a", "c", "a"])]
    for _ in range(18):
        t.append(fmt(anagram_set(rng, rng.randint(1, 4), rng.randint(1, 10), 4, "abc")))
    for _ in range(12):
        t.append(fmt([word(rng, rng.randint(1, 3), "ab") for _ in range(rng.randint(1, 20))]))
    for _ in range(8):
        t.append(fmt(anagram_set(rng, rng.randint(5, 50), rng.randint(50, 500), 8, "abcdefg")))
    t.append(fmt(anagram_set(rng, 2000, 10000, 100, "abcdefghijklmnopqrstuvwxyz")))
    t.append(fmt([word(rng, 100) for _ in range(10000)]))
    t.append(fmt(anagram_set(rng, 300, 10000, 6, "abcd")))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 10**4 and len(d) == n + 1
    for w in d[1:]:
        assert 1 <= len(w) <= 100 and w.isascii() and w.isalpha() and w.islower()

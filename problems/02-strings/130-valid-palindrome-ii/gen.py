import random
import string

L = string.ascii_lowercase


def rs(rng, n, alpha=L):
    return "".join(rng.choice(alpha) for _ in range(n))


def pal(rng, n, alpha=L):
    h = rs(rng, n // 2, alpha)
    return h + rs(rng, n % 2, alpha) + h[::-1]


def insert(rng, s, alpha=L):
    i = rng.randint(0, len(s))
    return s[:i] + rng.choice(alpha) + s[i:]


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "ab", "abc", "aba", "abca", "abcda", "eceec", "cbbcc", "deeee", "aguokepatgbnvfqmgmlcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuculmgmqfvnbgtapekouga"]
    for _ in range(30):
        a = L[: rng.randint(1, 3)]
        n = rng.randint(1, 12)
        r = rng.random()
        if r < 0.4:
            s = insert(rng, pal(rng, n, a), a)
        elif r < 0.6:
            s = pal(rng, n, a)
        else:
            s = rs(rng, n, a)
        tests.append(s)
    for _ in range(12):
        n = rng.randint(50, 20000)
        s = pal(rng, n, L[: rng.randint(2, 26)])
        r = rng.random()
        if r < 0.4:
            s = insert(rng, s)
        elif r < 0.8:
            s = insert(rng, insert(rng, s))
        tests.append(s)
    p = pal(rng, 99999)
    tests.append(insert(rng, p))
    tests.append(insert(rng, insert(rng, pal(rng, 99998))))
    tests.append(p)
    q = pal(rng, 99999, "ab")
    i = rng.randint(0, 99999)
    tests.append(q[:i] + "c" + q[i:])
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    s = lines[0]
    assert all(l == "" for l in lines[1:])
    assert 1 <= len(s) <= 10**5
    assert all(c in L for c in s)

import random
import string

L = string.ascii_lowercase


def rs(rng, n, alpha=L):
    return "".join(rng.choice(alpha) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "aa", "ab", "aab", "abb", "aabbc", "abcabc", "zz", "abcdefghijklmnopqrstuvwxyz", "zyxzyxw"]
    for _ in range(28):
        tests.append(rs(rng, rng.randint(1, 15), L[: rng.randint(1, 6)]))
    for _ in range(12):
        tests.append(rs(rng, rng.randint(20, 3000), L[: rng.randint(3, 26)]))
    # no unique char, large
    base = rs(rng, 50000)
    t = list(base + base)
    rng.shuffle(t)
    tests.append("".join(t))
    # unique char at the very end
    t = list(rs(rng, 49999, L[:25]) * 2)
    rng.shuffle(t)
    tests.append("".join(t) + "z")
    # unique char in the middle of many repeats
    t = list(rs(rng, 40000, L[1:]) * 2)
    rng.shuffle(t)
    t.insert(rng.randrange(len(t)), "a")
    tests.append("".join(t))
    tests.append(rs(rng, 100000))
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    s = lines[0]
    assert all(l == "" for l in lines[1:])
    assert 1 <= len(s) <= 10**5
    assert all(c in L for c in s)

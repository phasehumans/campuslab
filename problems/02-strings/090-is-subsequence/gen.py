import random
import string

L = string.ascii_lowercase


def rs(rng, n, alpha=L):
    return "".join(rng.choice(alpha) for _ in range(n))


def subseq(rng, t, k):
    idx = sorted(rng.sample(range(len(t)), k))
    return "".join(t[i] for i in idx)


def generate(rng: random.Random) -> list[str]:
    tests = ["a\na", "a\nb", "ab\nba", "abc\nabc", "abcd\nabc", "aaa\naa", "aa\naaa", "ace\nabcde", "aec\nabcde", "z\nabcdefghijklmnopqrstuvwxyz"]
    for _ in range(32):
        a = L[: rng.randint(1, 4)]
        t = rs(rng, rng.randint(1, 15), a)
        if rng.random() < 0.5:
            s = subseq(rng, t, rng.randint(1, len(t)))
        else:
            s = rs(rng, rng.randint(1, 8), a)
        tests.append(s + "\n" + t)
    for _ in range(10):
        t = rs(rng, rng.randint(100, 20000), L[: rng.randint(2, 26)])
        s = subseq(rng, t, rng.randint(1, min(len(t), 500)))
        if rng.random() < 0.5:
            i = rng.randrange(len(s))
            s = s[:i] + rng.choice(L) + s[i:]
        tests.append(s + "\n" + t)
    t = rs(rng, 100000)
    tests.append(subseq(rng, t, 50000) + "\n" + t)
    tests.append(t + "\n" + t)
    tests.append(t[1:] + t[0] + "\n" + t)
    tests.append("a" * 100000 + "\n" + "a" * 99999 + "b")
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    assert len(lines) >= 2 and all(l == "" for l in lines[2:])
    for s in lines[:2]:
        assert 1 <= len(s) <= 10**5
        assert all(c in L for c in s)

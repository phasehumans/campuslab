import random
import string

L = string.ascii_lowercase


def rs(rng, n, alpha=L):
    return "".join(rng.choice(alpha) for _ in range(n))


def shuf(rng, s):
    t = list(s)
    rng.shuffle(t)
    return "".join(t)


def generate(rng: random.Random) -> list[str]:
    tests = ["a\na", "aa\nab", "ab\nba", "abc\nab", "z\nabcdefghijklmnopqrstuvwxyz", "aaa\naa", "aaa\naaaa", "abc\nxyz"]
    for _ in range(35):
        a = L[: rng.randint(1, 6)]
        m = rs(rng, rng.randint(1, 20), a)
        if rng.random() < 0.5:
            k = rng.randint(1, len(m))
            r = shuf(rng, m)[:k]
        else:
            r = rs(rng, rng.randint(1, 10), a)
        tests.append(r + "\n" + m)
    for _ in range(10):
        m = rs(rng, rng.randint(100, 20000))
        r = shuf(rng, m)[: rng.randint(1, len(m))]
        if rng.random() < 0.5:
            r += rng.choice(L)
        tests.append(r + "\n" + m)
    m = rs(rng, 100000)
    tests.append(shuf(rng, m) + "\n" + m)
    tests.append(shuf(rng, m)[:-1] + "\n" + m)
    tests.append("q" + shuf(rng, m)[:-1] + "\n" + m.replace("q", "r"))
    tests.append("z" * 100000 + "\n" + "z" * 99999 + "y")
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    assert len(lines) >= 2 and all(l == "" for l in lines[2:])
    for s in lines[:2]:
        assert 1 <= len(s) <= 10**5
        assert all(c in L for c in s)

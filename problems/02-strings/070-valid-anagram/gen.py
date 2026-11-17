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
    tests = ["a\na", "a\nb", "ab\nba", "ab\na", "a\naa", "aab\nabb", "abc\ncba", "aaaa\naaaa", "abcd\nabce"]
    for _ in range(35):
        n = rng.randint(1, 20)
        s = rs(rng, n, L[: rng.randint(1, 5)])
        r = rng.random()
        if r < 0.5:
            t = shuf(rng, s)
        elif r < 0.75:
            t = list(shuf(rng, s))
            t[rng.randrange(n)] = rng.choice(L[:5])
            t = "".join(t)
        else:
            t = shuf(rng, s + rng.choice(L[:5]))
        tests.append(s + "\n" + t)
    for _ in range(8):
        n = rng.randint(100, 20000)
        s = rs(rng, n)
        t = shuf(rng, s)
        if rng.random() < 0.5:
            t = list(t)
            i = rng.randrange(n)
            t[i] = L[(L.index(t[i]) + 1) % 26]
            t = "".join(t)
        tests.append(s + "\n" + t)
    s = rs(rng, 100000)
    tests.append(s + "\n" + shuf(rng, s))
    t = list(shuf(rng, s))
    t[0] = L[(L.index(t[0]) + 1) % 26]
    tests.append(s + "\n" + "".join(t))
    tests.append(s + "\n" + shuf(rng, s)[:-1])
    tests.append("a" * 100000 + "\n" + "a" * 99999 + "b")
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    assert len(lines) >= 2 and all(l == "" for l in lines[2:])
    for s in lines[:2]:
        assert 1 <= len(s) <= 10**5
        assert all(c in L for c in s)

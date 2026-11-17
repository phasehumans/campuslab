import random

PR = [chr(c) for c in range(33, 127)]


def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))


def relabel(rng, s, alpha):
    chars = sorted(set(s))
    img = rng.sample(alpha, len(chars))
    m = dict(zip(chars, img))
    return "".join(m[c] for c in s)


def generate(rng: random.Random) -> list[str]:
    tests = ["a\na", "a\nb", "ab\naa", "aa\nab", "egg\nadd", "foo\nbar", "paper\ntitle", "badc\nbaba", "13\n42", "!!@\n##$", "ab\nba"]
    for _ in range(32):
        k = rng.randint(1, 5)
        alpha = rng.sample(PR, k)
        s = rs(rng, rng.randint(1, 12), alpha)
        t = relabel(rng, s, PR)
        if rng.random() < 0.5:
            t = list(t)
            t[rng.randrange(len(t))] = rng.choice(PR[:10])
            t = "".join(t)
        tests.append(s + "\n" + t)
    for _ in range(10):
        alpha = rng.sample(PR, rng.randint(2, 94))
        s = rs(rng, rng.randint(100, 20000), alpha)
        t = relabel(rng, s, PR)
        if rng.random() < 0.5:
            t = list(t)
            i = rng.randrange(len(t))
            t[i] = t[(i + 1) % len(t)] if t[(i + 1) % len(t)] != t[i] else rng.choice(PR)
            t = "".join(t)
        tests.append(s + "\n" + t)
    s = rs(rng, 100000, PR)
    tests.append(s + "\n" + relabel(rng, s, PR))
    t = list(relabel(rng, s, PR))
    t[-1] = t[0] if t[0] != t[-1] else t[1]
    tests.append(s + "\n" + "".join(t))
    s = rs(rng, 100000, "ab")
    tests.append(s + "\n" + s.replace("a", "x").replace("b", "a"))
    tests.append(s + "\n" + "c" * 100000)
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    assert len(lines) >= 2 and all(l == "" for l in lines[2:])
    s, t = lines[0], lines[1]
    assert 1 <= len(s) <= 10**5 and len(s) == len(t)
    for x in (s, t):
        assert all(33 <= ord(c) <= 126 for c in x)

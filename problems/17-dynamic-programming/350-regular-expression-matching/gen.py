import random
import re


def rand_pattern(rng, length, alpha):
    out = []
    while len(out) < length:
        c = rng.choice(alpha + ".")
        out.append(c)
        if len(out) < length and rng.random() < 0.4:
            out.append("*")
    return "".join(out)


def pattern_from(rng, s, alpha):
    # build a pattern that tends to match s
    out = []
    for c in s:
        r = rng.random()
        if r < 0.15:
            out.append(".")
        elif r < 0.3:
            out.append(c + "*")
        elif r < 0.4:
            out.append(".*")
        else:
            out.append(c)
        if rng.random() < 0.1:
            out.append(rng.choice(alpha) + "*")
    p = "".join(out)
    return p[:30] if not p[:30].startswith("*") else "a" + p[1:30]


def fix(p):
    p = p[:30]
    while p.endswith("**"):
        p = p[:-1]
    return p


def generate(rng: random.Random) -> list[str]:
    tests = ["aa\na", "aa\na*", "ab\n.*", "aab\nc*a*b", "mississippi\nmis*is*p*.", "a\n.", "a\nb*",
             "aaaaaaaaaaaaaaaaaaab\na*a*a*a*a*a*a*a*a*a*a*a*a*a*a*", "aaaaaaaaaaaaaaaaaaaa\na*a*a*a*a*a*a*a*a*a*a*a*a*a*a*",
             "abcdefghijklmnopqrst\n.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*", "ab\n.*c", "a\nab*", "bbbba\n.*a*a", "a\n.*..a*"]
    while len(tests) < 70:
        alpha = rng.choice(["ab", "abc", "a"])
        s = "".join(rng.choice(alpha) for _ in range(rng.randint(1, 20)))
        if rng.random() < 0.5:
            p = pattern_from(rng, s, alpha)
        else:
            p = rand_pattern(rng, rng.randint(1, 30), alpha)
        p = fix(p)
        if not p or p[0] == "*" or "**" in p:
            continue
        tests.append(s + "\n" + p)
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    assert len(lines) == 2
    s, p = lines
    assert 1 <= len(s) <= 20 and 1 <= len(p) <= 30
    assert re.fullmatch(r"[a-z]+", s)
    assert re.fullmatch(r"[a-z.*]+", p)
    for i, c in enumerate(p):
        if c == "*":
            assert i > 0 and p[i - 1] != "*"

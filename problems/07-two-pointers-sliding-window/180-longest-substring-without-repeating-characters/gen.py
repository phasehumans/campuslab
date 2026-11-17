import random
import string

PRINTABLE = [chr(c) for c in range(32, 127)]


def clean(s):
    s = s.strip(" ")
    return s + "\n"


def rnd(rng, n, alpha):
    return clean("".join(rng.choice(alpha) for _ in range(n)))


def generate(rng):
    t = ["\n", "a\n", "bbbbbbbb\n", "pwwkew\n", "dvdf\n", "abba\n", "a b c a\n",
         "".join(PRINTABLE[1:]) + "\n", "tmmzuxt\n", "!@#$%^&*()_+!@\n"]
    t.append(rnd(rng, 100000, PRINTABLE))
    t.append(rnd(rng, 100000, "ab"))
    t.append(clean(("".join(PRINTABLE[1:])) * 1052))
    t.append(rnd(rng, 100000, string.ascii_letters + string.digits))
    for _ in range(25):
        t.append(rnd(rng, rng.randint(1, 12), "abcd "))
    for _ in range(12):
        t.append(rnd(rng, rng.randint(20, 3000), rng.choice([PRINTABLE, string.ascii_lowercase, "xyz"])))
    return t


def validate(inp):
    assert inp.endswith("\n") and inp.count("\n") == 1
    s = inp[:-1]
    assert len(s) <= 10**5
    assert all(32 <= ord(c) < 127 for c in s)

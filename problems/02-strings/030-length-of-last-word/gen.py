import random
import string

LET = string.ascii_letters


def word(rng, lo, hi):
    return "".join(rng.choice(LET) for _ in range(rng.randint(lo, hi)))


def sentence(rng, nw, lo, hi, maxgap, lead, trail):
    parts = [" " * rng.randint(0, lead)]
    for i in range(nw):
        if i:
            parts.append(" " * rng.randint(1, maxgap))
        parts.append(word(rng, lo, hi))
    parts.append(" " * rng.randint(0, trail))
    return "".join(parts)


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "a ", " a", "   ab   ", "Hello", "one two three", "x  yz", "ABC d", "d ABC", "a b c d e f g"]
    for _ in range(30):
        tests.append(sentence(rng, rng.randint(1, 6), 1, 8, 3, 3, 3))
    for _ in range(12):
        tests.append(sentence(rng, rng.randint(1, 300), 1, 15, 5, 10, 10))
    for _ in range(4):
        tests.append(sentence(rng, rng.randint(1000, 5000), 1, 12, 4, 20, 20))
    tests.append("w" * 100000)
    tests.append(" " * 99990 + "abcdefghij")
    tests.append("abcdefghij" + " " * 99990)
    s = sentence(rng, 15000, 1, 6, 2, 0, 0)[:99000]
    tests.append(s.rstrip() + " lastword")
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    s = lines[0]
    assert all(l == "" for l in lines[1:])
    assert 1 <= len(s) <= 10**5
    assert all(c == " " or c in LET for c in s)
    assert s.strip() != ""

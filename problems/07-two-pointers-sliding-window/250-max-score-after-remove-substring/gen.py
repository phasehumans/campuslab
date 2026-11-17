import random
import string


def fmt(s, x, y):
    return f"{s}\n{x} {y}\n"


def generate(rng):
    t = [fmt("a", 1, 1), fmt("ab", 1, 2), fmt("ba", 1, 2), fmt("aba", 5, 5), fmt("bab", 3, 7),
         fmt("cdbcbbaaabab", 4, 5), fmt("zzzz", 10, 1), fmt("abababab", 10000, 10000)]
    N = 10**5
    t.append(fmt("".join(rng.choice("ab") for _ in range(N)), rng.randint(1, 10**4), rng.randint(1, 10**4)))
    t.append(fmt("".join(rng.choice("abc") for _ in range(N)), 10**4, 1))
    t.append(fmt("".join(rng.choice(string.ascii_lowercase) for _ in range(N)), 3, 9))
    t.append(fmt("b" * (N // 2) + "a" * (N // 2), 10**4, 1))
    for _ in range(25):
        s = "".join(rng.choice("aabbc") for _ in range(rng.randint(1, 12)))
        t.append(fmt(s, rng.randint(1, 10), rng.randint(1, 10)))
    for _ in range(15):
        s = "".join(rng.choice("abbaxab") for _ in range(rng.randint(10, 3000)))
        t.append(fmt(s, rng.randint(1, 10**4), rng.randint(1, 10**4)))
    return t


def validate(inp):
    lines = inp.split("\n")
    s = lines[0]
    x, y = map(int, lines[1].split())
    assert 1 <= len(s) <= 10**5 and all("a" <= c <= "z" for c in s)
    assert 1 <= x <= 10**4 and 1 <= y <= 10**4

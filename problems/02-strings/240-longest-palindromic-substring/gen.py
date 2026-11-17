import random
import string

AL = string.ascii_letters + string.digits


def rs(rng, n, alpha=AL):
    return "".join(rng.choice(alpha) for _ in range(n))


def pal(rng, n, alpha=AL):
    h = rs(rng, n // 2, alpha)
    return h + rs(rng, n % 2, alpha) + h[::-1]


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "ab", "aa", "abc", "aba", "abba", "abab", "Aa", "1221x", "xyzzyabcba", "racecar", "abacdfgdcaba", "aaaabaaa"]
    for _ in range(26):
        tests.append(rs(rng, rng.randint(1, 15), AL[: rng.randint(1, 3)]))
    for _ in range(12):
        n = rng.randint(20, 1000)
        a = AL[: rng.randint(2, 62)]
        s = rs(rng, n, a)
        # plant one or two palindromes
        for _ in range(rng.randint(1, 2)):
            k = rng.randint(2, max(2, n // 3))
            i = rng.randint(0, n - k)
            s = s[:i] + pal(rng, k, a) + s[i + k:]
        tests.append(s)
    tests.append("z" * 1000)
    tests.append(rs(rng, 1000))
    tests.append(("ab" * 500))
    p = pal(rng, 400, "xy")
    tests.append(rs(rng, 300, "ab") + p + rs(rng, 300, "ab"))
    tests.append(pal(rng, 499, "AB") + "0" + pal(rng, 499, "AB") + "1")
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    s = lines[0]
    assert all(l == "" for l in lines[1:])
    assert 1 <= len(s) <= 1000
    assert all(c in AL for c in s)

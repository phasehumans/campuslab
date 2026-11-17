import random
import string


def rand_s(rng, n, alpha=string.ascii_lowercase):
    return "".join(rng.choice(alpha) for _ in range(n))


def pal(rng, n, alpha=string.ascii_lowercase):
    half = rand_s(rng, n // 2, alpha)
    mid = rand_s(rng, n % 2, alpha)
    return half + mid + half[::-1]


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "z", "ab", "aa", "aba", "abba", "abca", "zzzzzz", "abcdcba", "abcddcbx", "xbcddcba"]
    for _ in range(24):
        n = rng.randint(1, 12)
        tests.append(pal(rng, n, "ab") if rng.random() < 0.5 else rand_s(rng, n, "ab"))
    for _ in range(12):
        n = rng.randint(2, 200)
        p = list(pal(rng, n))
        if rng.random() < 0.5:
            i = rng.randrange(n)
            j = n - 1 - i
            if i != j:
                p[i] = "a" if p[j] != "a" else "b"
        tests.append("".join(p))
    for _ in range(8):
        n = rng.randint(200, 5000)
        tests.append(pal(rng, n) if rng.random() < 0.5 else rand_s(rng, n))
    tests.append(pal(rng, 100000))
    p = list(pal(rng, 100000))
    p[49999] = "a" if p[50000] != "a" else "b"
    tests.append("".join(p))
    tests.append("q" * 99999)
    tests.append(rand_s(rng, 100000))
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    s = lines[0]
    assert all(l == "" for l in lines[1:])
    assert 1 <= len(s) <= 10**5
    assert all("a" <= c <= "z" for c in s)

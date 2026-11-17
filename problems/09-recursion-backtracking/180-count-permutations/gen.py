import random
import string


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "z", "ab", "aa", "abcdefghij", "aaaaaaaaaa", "aabbccddee", "abababab", "zyxwvutsrq", "aaaaabbbbb"]
    while len(tests) < 60:
        n = rng.randint(1, 10)
        k = rng.randint(1, 10)
        pool = rng.sample(string.ascii_lowercase, k)
        tests.append("".join(rng.choice(pool) for _ in range(n)))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 1
    s = tok[0]
    assert 1 <= len(s) <= 10 and all("a" <= ch <= "z" for ch in s)

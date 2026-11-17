import random
import string


def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    tests = ["a\na", "a\nb", "abc\nabc", "abc\ncba", "aaaa\naa", "z" * 1000 + "\n" + "z" * 1000,
             "a" * 1000 + "\n" + "b" * 1000, string.ascii_lowercase + "\n" + string.ascii_lowercase[::-1]]
    for _ in range(25):
        alpha = rng.choice(["ab", "abc", string.ascii_lowercase])
        tests.append(rs(rng, rng.randint(1, 12), alpha) + "\n" + rs(rng, rng.randint(1, 12), alpha))
    for _ in range(12):
        alpha = rng.choice(["ab", "abcd", string.ascii_lowercase])
        tests.append(rs(rng, rng.randint(10, 1000), alpha) + "\n" + rs(rng, rng.randint(10, 1000), alpha))
    tests.append(rs(rng, 1000, string.ascii_lowercase) + "\n" + rs(rng, 1000, string.ascii_lowercase))
    tests.append(rs(rng, 1000, "ab") + "\n" + rs(rng, 1000, "ab"))
    s = rs(rng, 1000, "abc")
    tests.append(s + "\n" + s[::-1])
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    assert len(lines) == 2
    for s in lines:
        assert 1 <= len(s) <= 1000
        assert all("a" <= c <= "z" for c in s)

import random
import string


def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))


def generate(rng: random.Random) -> list[str]:
    tests = ["\nabc", "abc\n", "\n", "a\nb", "abc\nabc", "a\na", "a" * 500 + "\n", "\n" + "z" * 500,
             "a" * 500 + "\n" + "b" * 500, "ab" * 250 + "\n" + "ba" * 250,
             "dinitrophenylhydrazine\nacetylphenylhydrazine", "kitten\nsitting"]
    for _ in range(22):
        alpha = rng.choice(["ab", "abc", string.ascii_lowercase])
        tests.append(rs(rng, rng.randint(0, 10), alpha) + "\n" + rs(rng, rng.randint(0, 10), alpha))
    for _ in range(12):
        alpha = rng.choice(["ab", "abcd", string.ascii_lowercase])
        tests.append(rs(rng, rng.randint(10, 500), alpha) + "\n" + rs(rng, rng.randint(10, 500), alpha))
    tests.append(rs(rng, 500, string.ascii_lowercase) + "\n" + rs(rng, 500, string.ascii_lowercase))
    s = rs(rng, 500, "abc")
    t = list(s)
    for _ in range(40):
        t[rng.randrange(500)] = rng.choice("abcz")
    tests.append(s + "\n" + "".join(t))
    tests.append(rs(rng, 500, "ab") + "\n" + rs(rng, 1, "ab"))
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    assert lines[-1] == ""
    lines = lines[:-1]
    assert len(lines) in (1, 2)
    if len(lines) == 1:
        lines.append("")
    for s in lines:
        assert 0 <= len(s) <= 500
        assert all("a" <= c <= "z" for c in s)

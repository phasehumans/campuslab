import random


def fmt(s, words):
    return f"{s}\n{len(words)}\n" + "\n".join(words)


def generate(rng: random.Random) -> list[str]:
    tests = [
        fmt("a", ["a"]), fmt("a", ["b"]), fmt("ab", ["a", "b", "ab"]),
        fmt("a" * 30, ["a" * k for k in range(1, 11)]),
        fmt("a" * 30, ["a", "aa"]), fmt("a" * 29 + "b", ["a", "aa", "aaa"]),
        fmt("b" + "a" * 29, ["b", "a", "aa", "ba"]),
        fmt("ab" * 15, ["a", "b", "ab", "ba", "aba", "bab"]),
        fmt("leetcodeleet", ["leet", "code", "le", "et", "co", "de"]),
        fmt("abcdefghij" * 3, ["abcdefghij", "abc", "defghij", "abcdefghi"]),
    ]
    while len(tests) < 60:
        alpha = rng.choice(["a", "ab", "abc", "abcd", "abcdefghijklmnopqrstuvwxyz"])
        maxw = rng.randint(1, 10)
        m = rng.randint(1, 20)
        words = set()
        for _ in range(m):
            words.add("".join(rng.choice(alpha) for _ in range(rng.randint(1, maxw))))
        words = sorted(words)
        rng.shuffle(words)
        target_len = rng.randint(1, 30)
        if rng.random() < 0.7:
            s = ""
            while len(s) < target_len:
                s += rng.choice(words)
            s = s[:30]
            if rng.random() < 0.3:
                i = rng.randrange(len(s))
                s = s[:i] + rng.choice(alpha) + s[i + 1:]
        else:
            s = "".join(rng.choice(alpha) for _ in range(target_len))
        tests.append(fmt(s, words))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    s = tok[0]
    assert 1 <= len(s) <= 30 and s.isalpha() and s.islower()
    m = int(tok[1])
    assert 1 <= m <= 20 and len(tok) == 2 + m
    for w in tok[2:]:
        assert 1 <= len(w) <= 10 and w.isalpha() and w.islower()

import random

PR = [chr(c) for c in range(32, 127)]
TRICKY = list("#0123456789 ")


def rs(rng, n, alpha):
    return "".join(rng.choice(alpha) for _ in range(n))


def build(strs):
    return str(len(strs)) + "\n" + "".join(s + "\n" for s in strs)


def generate(rng: random.Random) -> list[str]:
    tests = [
        build([]),
        build(["a"]),
        build(["", ""]),
        build(["#"]),
        build(["12#ab", "3#", "##"]),
        build(["hello world", "  spaced  "]),
        build(["0#", "", "1#x"]),
        build(["9" * 100]),
        build(["#" * 100, "", "#"]),
    ]
    for _ in range(30):
        k = rng.randint(1, 8)
        strs = [rs(rng, rng.randint(0, 12), TRICKY + list("abc")) for _ in range(k)]
        tests.append(build(strs))
    for _ in range(14):
        k = rng.randint(5, 60)
        strs = [rs(rng, rng.randint(0, 100), PR) for _ in range(k)]
        tests.append(build(strs))
    tests.append(build([rs(rng, 100, PR) for _ in range(100)]))
    tests.append(build([rs(rng, 100, TRICKY) for _ in range(100)]))
    tests.append(build(["" for _ in range(100)]))
    tests.append(build([rs(rng, rng.randint(0, 100), PR) for _ in range(100)]))
    return tests


def validate(inp: str) -> None:
    lines = inp.split("\n")
    n = int(lines[0])
    assert lines[0] == str(n)
    assert 0 <= n <= 100
    rest = lines[1:]
    assert len(rest) <= n + 1
    assert all(x == "" for x in rest[n:])
    for s in rest[:n]:
        assert len(s) <= 100
        assert all(32 <= ord(c) <= 126 for c in s)

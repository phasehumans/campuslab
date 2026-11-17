import random

NMAX = 10**5


def balanced(rng, pairs, bias=0.5):
    out, open_ = [], 0
    rem = pairs
    while rem or open_:
        if rem and (open_ == 0 or rng.random() < bias):
            out.append("(")
            open_ += 1
            rem -= 1
        else:
            out.append(")")
            open_ -= 1
    return "".join(out)


def rand(rng, n, p=0.5):
    return "".join("(" if rng.random() < p else ")" for _ in range(n))


def noisy(rng, n):
    # balanced chunks separated by stray brackets
    out = ""
    while len(out) < n:
        out += balanced(rng, rng.randint(1, 50), rng.random()) + rng.choice("()")
    return out[:n]


def generate(rng: random.Random) -> list[str]:
    tests = [rand(rng, NMAX), balanced(rng, NMAX // 2), noisy(rng, NMAX), "(" * NMAX, ")(" * (NMAX // 2)]
    tests += ["", "(", ")", "()", ")(", "(()", "())", "()(()", "(()())", "((()))())(", "()(())", ")()())()()("]
    for _ in range(26):
        tests.append(rand(rng, rng.randint(1, 16), rng.uniform(0.3, 0.7)))
    for _ in range(8):
        tests.append(noisy(rng, rng.randint(20, 3000)))
    for _ in range(4):
        tests.append(rand(rng, rng.randint(1000, 5000)))
    return tests


def validate(inp: str) -> None:
    s = inp.strip("\n")
    assert 0 <= len(s) <= NMAX
    assert set(s) <= {"(", ")"}

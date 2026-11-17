import random


def balanced(rng, pairs, bias):
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


def generate(rng: random.Random) -> list[str]:
    tests = ["()", "(())", "()()", "(()(()))", "((()))", "(()())", "()" * 25, "(" * 25 + ")" * 25,
             "(" * 24 + "()" + ")" * 24, "((((((((((((((((((((((()))))))))))))))))))))))()",
             "(()()()()()()()()()()()()()()()()()()()()()()())"]
    for _ in range(60):
        tests.append(balanced(rng, rng.randint(1, 25), rng.uniform(0.2, 0.9)))
    return tests


def validate(inp: str) -> None:
    s = inp.strip()
    assert 2 <= len(s) <= 50
    bal = 0
    for c in s:
        assert c in "()"
        bal += 1 if c == "(" else -1
        assert bal >= 0
    assert bal == 0

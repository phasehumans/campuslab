import random

OPEN = "([{"
CLOSE = ")]}"


def balanced(rng, pairs, depth_bias=0.5):
    out, st = [], []
    remaining = pairs
    while remaining or st:
        if remaining and (not st or rng.random() < depth_bias):
            k = rng.randrange(3)
            out.append(OPEN[k])
            st.append(k)
            remaining -= 1
        else:
            out.append(CLOSE[st.pop()])
    return "".join(out)


def corrupt(rng, s):
    s = list(s)
    i = rng.randrange(len(s))
    s[i] = rng.choice([c for c in "()[]{}" if c != s[i]])
    return "".join(s)


def generate(rng: random.Random) -> list[str]:
    tests = ["(", ")", "()", "[]", "{}", "([)]", "{[]}", "(((", ")))", "(]", "([{}])", "}{", "(()", "())",
             "([]{})[]", "[(])", "{{{{}}}}", "()()()()"]
    for _ in range(14):
        tests.append(balanced(rng, rng.randint(1, 12), rng.random()))
    for _ in range(10):
        tests.append(corrupt(rng, balanced(rng, rng.randint(1, 12))))
    for _ in range(5):
        tests.append("".join(rng.choice("()[]{}") for _ in range(rng.randint(1, 20))))
    for _ in range(4):
        tests.append(balanced(rng, rng.randint(100, 2000), rng.random()))
    tests.append(balanced(rng, 50000, 0.5))
    tests.append(corrupt(rng, balanced(rng, 50000, 0.7)))
    tests.append("(" * 50000 + ")" * 50000)
    tests.append(balanced(rng, 49999, 0.5) + "(")
    # large tests first so they are always among the 50 inputs that get used
    return tests[-8:] + tests[:-8]


def validate(inp: str) -> None:
    s = inp.strip()
    assert 1 <= len(s) <= 10**5
    assert all(c in "()[]{}" for c in s)

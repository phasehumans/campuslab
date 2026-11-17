import random


LIMIT = 10**8


def make_ops(rng, n, lo=-30000, hi=30000):
    ops, st = [], []
    while len(ops) < n:
        choices = ["num"]
        if st:
            choices += ["C"]
            if abs(2 * st[-1]) <= LIMIT:
                choices += ["D"]
        if len(st) >= 2 and abs(st[-1] + st[-2]) <= LIMIT:
            choices += ["+"]
        c = rng.choice(choices)
        if c == "num":
            v = rng.randint(lo, hi)
            ops.append(str(v))
            st.append(v)
        elif c == "C":
            ops.append("C")
            st.pop()
        elif c == "D":
            ops.append("D")
            st.append(2 * st[-1])
        else:
            ops.append("+")
            st.append(st[-1] + st[-2])
    return ops


def fmt(ops):
    return f"{len(ops)}\n{' '.join(ops)}"


def generate(rng: random.Random) -> list[str]:
    tests = [fmt(["1"]), fmt(["-30000"]), fmt(["30000", "C"]), fmt(["10", "D", "D", "D"]),
             fmt(["5", "2", "C", "D", "+", "10", "5", "+", "C", "D"]), fmt(["3", "4", "+", "D", "C"]),
             fmt(["-5", "-10", "+", "C", "D"]), fmt(["7", "C", "8", "C", "9"])]
    for _ in range(26):
        tests.append(fmt(make_ops(rng, rng.randint(1, 15), -20, 20)))
    for _ in range(14):
        tests.append(fmt(make_ops(rng, rng.randint(20, 200))))
    for _ in range(4):
        tests.append(fmt(make_ops(rng, 1000)))
    # long chain of D's is bounded: doubling grows fast, so interleave with C
    tests.append(fmt(["30000"] + ["D", "C"] * 499 + ["D"]))
    # large tests first so they are always among the 50 inputs that get used
    return tests[-5:] + tests[:-5]


def validate(inp: str) -> None:
    toks = inp.split()
    n = int(toks[0])
    assert 1 <= n <= 1000 and len(toks) == n + 1
    stack = []
    for t in toks[1:]:
        if t == "+":
            assert len(stack) >= 2
            stack.append(stack[-1] + stack[-2])
        elif t == "D":
            assert len(stack) >= 1
            stack.append(2 * stack[-1])
        elif t == "C":
            assert len(stack) >= 1
            stack.pop()
        else:
            v = int(t)
            assert -30000 <= v <= 30000
            stack.append(v)
        assert not stack or abs(stack[-1]) <= 10**8

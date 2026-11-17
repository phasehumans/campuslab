import random

LIM = 2**31 - 1


def tdiv(a, b):
    q = abs(a) // abs(b)
    return q if (a >= 0) == (b > 0) else -q


def apply(op, a, b):
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "*":
        return a * b
    return tdiv(a, b)


def make(rng, n_nums, lo=-200, hi=200, ops="+-*/"):
    toks, st = [], []
    pushed = 0
    while pushed < n_nums or len(st) > 1:
        can_push = pushed < n_nums
        if len(st) >= 2 and (not can_push or rng.random() < 0.45):
            a, b = st[-2], st[-1]
            choices = [o for o in ops if not (o == "/" and b == 0) and abs(apply(o, a, b)) <= LIM]
            if not choices:
                choices = [o for o in "+-" if abs(apply(o, a, b)) <= LIM]
            o = rng.choice(choices)
            st.pop(); st.pop()
            st.append(apply(o, a, b))
            toks.append(o)
        else:
            v = rng.randint(lo, hi)
            st.append(v)
            toks.append(str(v))
            pushed += 1
    return f"{len(toks)}\n{' '.join(toks)}"


def generate(rng: random.Random) -> list[str]:
    tests = ["1\n7", "1\n-200", "3\n7 -2 /", "3\n-7 2 /", "3\n0 5 /", "3\n200 200 *", "3\n5 9 -",
             "13\n10 6 9 3 + -11 * / * 17 + 5 +", "5\n-3 -4 * 2 /", "7\n1 2 3 4 + + +"]
    for _ in range(25):
        tests.append(make(rng, rng.randint(1, 8), -10, 10))
    for _ in range(10):
        tests.append(make(rng, rng.randint(10, 500)))
    tests.append(make(rng, 5000))
    tests.append(make(rng, 5000, ops="*/"))
    tests.append(make(rng, 5000, ops="+-"))
    tests.append("9999\n" + " ".join(["200"] * 5000) + " " + " ".join(["-"] * 4999))
    return tests


def validate(inp: str) -> None:
    toks = inp.split()
    n = int(toks[0])
    assert 1 <= n <= 10**4 and len(toks) == n + 1
    st = []
    for t in toks[1:]:
        if t in ("+", "-", "*", "/"):
            assert len(st) >= 2
            b = st.pop()
            a = st.pop()
            assert not (t == "/" and b == 0)
            r = apply(t, a, b)
            assert -2**31 <= r <= LIM
            st.append(r)
        else:
            v = int(t)
            assert -200 <= v <= 200
            st.append(v)
    assert len(st) == 1

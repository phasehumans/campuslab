import random

LIM = 2**31


def num(rng, big):
    if big and rng.random() < 0.1:
        return str(rng.randint(0, LIM - 1))
    return str(rng.randint(0, rng.choice([9, 100, 10**4, 10**6])))


def expr(rng, budget, depth, big):
    """Return a list of tokens of a valid expression using roughly `budget` operands."""
    toks = []
    if rng.random() < 0.2:
        toks.append("-")
    count = max(1, rng.randint(1, max(1, budget)))
    used = 0
    for i in range(count):
        if i:
            toks.append(rng.choice("+-"))
        if depth > 0 and rng.random() < 0.3 and budget - used > 1:
            sub = rng.randint(1, max(1, (budget - used) // 2))
            toks += ["("] + expr(rng, sub, depth - 1, big) + [")"]
            used += sub
        else:
            toks.append(num(rng, big))
            used += 1
        if used >= budget:
            break
    return toks


def render(rng, toks, space_p):
    out = []
    for t in toks:
        if rng.random() < space_p:
            out.append(" " * rng.randint(1, 2))
        out.append(t)
    if rng.random() < space_p:
        out.append(" ")
    return "".join(out)


def check(s):
    """Evaluate; return the value or None if any partial value leaves the 32-bit range."""
    st, cur, sign, i, n = [], 0, 1, 0, len(s)
    while i < n:
        c = s[i]
        if c.isdigit():
            j = i
            while j < n and s[j].isdigit():
                j += 1
            v = int(s[i:j])
            if v >= LIM:
                return None
            cur += sign * v
            i = j
            if not -LIM <= cur < LIM:
                return None
            continue
        if c == "+":
            sign = 1
        elif c == "-":
            sign = -1
        elif c == "(":
            st.append((cur, sign))
            cur, sign = 0, 1
        elif c == ")":
            pc, ps = st.pop()
            cur = pc + ps * cur
            if not -LIM <= cur < LIM:
                return None
        i += 1
    return cur


def make(rng, budget, depth, big, space_p, maxlen=10**5):
    while True:
        s = render(rng, expr(rng, budget, depth, big), space_p)
        if 1 <= len(s) <= maxlen and s.strip() and check(s) is not None:
            return s


def generate(rng: random.Random) -> list[str]:
    tests = [make(rng, 12000, 30, False, 0.3), make(rng, 15000, 4, False, 0.1),
             "(" * 30000 + "1" + ")" * 30000, "-(" * 20000 + "7" + ")" * 20000,
             "2147483647" + "-1+1" * 8000]
    tests += ["0", "2147483647", "-2147483647", "-(2147483647)", "1-(-2)", "-(3+4)", "(1)", "((((5))))",
              "(1+(4+5+2)-3)+(6+8)", "1 - (  -(2 - 3) )", " 12 ", "10-(2-(3-(4-(5))))", "- 1 + (-(1))"]
    for _ in range(22):
        tests.append(make(rng, rng.randint(1, 6), 2, False, 0.4))
    for _ in range(12):
        tests.append(make(rng, rng.randint(10, 300), rng.randint(2, 8), True, rng.random()))
    return tests


def validate(inp: str) -> None:
    s = inp.rstrip("\n")
    assert 1 <= len(s) <= 10**5
    assert all(c in "0123456789+-() " for c in s)
    # structural check: tokens follow the grammar with unary minus only at the start or after '('
    toks, i = [], 0
    while i < len(s):
        if s[i].isdigit():
            j = i
            while j < len(s) and s[j].isdigit():
                j += 1
            toks.append("n")
            i = j
        elif s[i] != " ":
            toks.append(s[i])
            i += 1
        else:
            i += 1
    depth, prev = 0, None  # prev in {None, '(', op, 'n', ')'}
    for t in toks:
        if t == "n":
            assert prev in (None, "(", "+", "-", "u")
        elif t == "(":
            assert prev in (None, "(", "+", "-", "u")
            depth += 1
        elif t == ")":
            assert prev in ("n", ")") and depth > 0
            depth -= 1
        else:
            if prev in (None, "("):
                assert t == "-"
                t = "u"
            else:
                assert prev in ("n", ")")
        prev = t
    assert depth == 0 and prev in ("n", ")")
    assert check(s) is not None

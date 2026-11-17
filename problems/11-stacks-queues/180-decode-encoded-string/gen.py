import random
import string

LET = string.ascii_lowercase


def dlen(s):
    st, cur, k = [], 0, 0
    for c in s:
        if c.isdigit():
            k = k * 10 + int(c)
        elif c == "[":
            st.append((cur, k))
            cur, k = 0, 0
        elif c == "]":
            prev, m = st.pop()
            cur = prev + cur * m
        else:
            cur += 1
    return cur


def make(rng, depth, width, kmax, alpha):
    parts = []
    for _ in range(rng.randint(1, width)):
        if depth > 0 and rng.random() < 0.5:
            parts.append(f"{rng.randint(1, kmax)}[{make(rng, depth - 1, width, kmax, alpha)}]")
        else:
            parts.append("".join(rng.choice(alpha) for _ in range(rng.randint(1, 3))))
    return "".join(parts)


def ok(s):
    return 1 <= len(s) <= 1000 and dlen(s) <= 10**5


def generate(rng: random.Random) -> list[str]:
    tests = ["a", "3[a]2[bc]", "3[a2[c]]", "2[abc]3[cd]ef", "abc", "300[z]", "1[a]", "10[a]",
             "2[2[2[2[2[2[ab]]]]]]", "x3[y]z", "100[a1[b]]", "300[ab]300[cd]"]
    for count, depth, width, kmax, alpha in [(10, (3, 8), 6, 300, LET), (12, (2, 5), 4, 30, LET), (16, (1, 3), 3, 9, "abc")]:
        made = 0
        while made < count:
            s = make(rng, rng.randint(*depth), width, kmax, alpha)
            if ok(s):
                tests.append(s)
                made += 1
    # long encoded strings: many small pieces side by side
    for _ in range(5):
        s = ""
        while True:
            piece = make(rng, 2, 2, 9, LET)
            if not ok(s + piece):
                break
            s += piece
        tests.insert(0, s)
    # long decoded outputs and deep nesting
    tests.insert(0, "300[" + "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv" + "]")
    tests.insert(0, "2[" * 16 + "a" + "]" * 16)
    tests.insert(0, "1[" * 300 + "q" + "]" * 300)
    tests.insert(0, "".join(f"{rng.randint(1, 300)}[{rng.choice(LET)}]" for _ in range(140)))
    return tests


def validate(inp: str) -> None:
    s = inp.strip()
    assert 1 <= len(s) <= 1000
    assert all(c in LET or c.isdigit() or c in "[]" for c in s)
    # structure: every number is in [1, 300] and is immediately followed by '['
    i, depth = 0, 0
    while i < len(s):
        if s[i].isdigit():
            j = i
            while s[j].isdigit():
                j += 1
            assert s[i] != "0" and 1 <= int(s[i:j]) <= 300 and s[j] == "["
            i = j
        elif s[i] == "[":
            assert i > 0 and s[i - 1].isdigit()
            depth += 1
            i += 1
        elif s[i] == "]":
            depth -= 1
            assert depth >= 0
            i += 1
        else:
            i += 1
    assert depth == 0
    assert dlen(s) <= 10**5

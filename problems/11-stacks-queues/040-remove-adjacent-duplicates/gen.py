import random


def reduce(s):
    st = []
    for c in s:
        if st and st[-1] == c:
            st.pop()
        else:
            st.append(c)
    return "".join(st)


def nested(rng, pairs, alpha):
    # builds strings that collapse heavily, like "abba" patterns
    out = []
    for _ in range(pairs):
        c = rng.choice(alpha)
        pos = rng.randint(0, len(out))
        out[pos:pos] = [c, c]
    return "".join(out)


def generate(rng: random.Random) -> list[str]:
    cand = ["a", "ab", "aab", "abbac", "abbaca", "azxxzy", "aaa", "abcde", "zz" * 3 + "q", "aabbccd",
            "abccbaz", "mississippi", "aaaaa", "abababab", "xyzzyxw"]
    for _ in range(25):
        n = rng.randint(1, 20)
        cand.append("".join(rng.choice("abc") for _ in range(n)))
    for _ in range(10):
        cand.append(nested(rng, rng.randint(1, 30), "ab") + rng.choice("xyz"))
    for _ in range(6):
        n = rng.randint(100, 5000)
        cand.append("".join(rng.choice("abcdefghijklmnopqrstuvwxyz"[:rng.randint(2, 26)]) for _ in range(n)))
    cand.append("".join(rng.choice("ab") for _ in range(10**5)))
    cand.append(nested(rng, 49000, "abc") + "q" + "".join(rng.choice("xy") for _ in range(1999)))
    cand.append("".join(chr(97 + i % 26) for i in range(10**5)))
    cand.append("a" * 99999)
    # the final string must not be empty (the judge needs a non-empty answer)
    cand = cand[-10:] + cand[:-10]  # large tests first so they are always used
    return [s for s in cand if reduce(s)]


def validate(inp: str) -> None:
    s = inp.strip()
    assert 1 <= len(s) <= 10**5
    assert all("a" <= c <= "z" for c in s)
    assert reduce(s), "result must be non-empty"

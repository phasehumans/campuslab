import random
import string

ALPHA = string.ascii_letters + string.digits + "._"


def name(rng):
    r = rng.random()
    if r < 0.15:
        return "..."
    if r < 0.25:
        return rng.choice(["a.b", "_", "..a", ".hidden", "x..", "...."])
    return "".join(rng.choice(ALPHA) for _ in range(rng.randint(1, 6)))


def make(rng, parts, maxlen=3000):
    s = ""
    for _ in range(parts):
        r = rng.random()
        comp = "." if r < 0.15 else ".." if r < 0.35 else "" if r < 0.45 else name(rng)
        piece = "/" * rng.choice([1, 1, 1, 2, 3]) + comp
        if len(s) + len(piece) + 1 > maxlen:
            break
        s += piece
    if rng.random() < 0.3:
        s += "/"
    return s or "/"


def generate(rng: random.Random) -> list[str]:
    tests = ["/", "//", "/home/", "/../", "/home//foo/", "/a/./b/../../c/", "/.../a/../b/c/../d/./",
             "/a//b////c/d//././/..", "/..hidden/...", "/a/b/c/../../../../..", "/.", "/_/./__/../x.y"]
    for _ in range(25):
        tests.append(make(rng, rng.randint(1, 8)))
    for _ in range(10):
        tests.append(make(rng, rng.randint(20, 300)))
    for _ in range(3):
        tests.append(make(rng, 5000))
    tests.append(("/abcdefghij" * 272)[:2999] + "/")
    tests.append("/" + "/".join(["..", "a"] * 999)[:2998] + "/")
    return tests


def validate(inp: str) -> None:
    s = inp.strip("\n")
    assert 1 <= len(s) <= 3000
    assert s[0] == "/"
    assert all(c in ALPHA or c == "/" for c in s)

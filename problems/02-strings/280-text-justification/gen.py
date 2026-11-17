import random
import string

CH = string.ascii_letters + string.digits + ".,!?;:'-"


def word(rng, lo, hi):
    return "".join(rng.choice(CH) for _ in range(rng.randint(lo, hi)))


def build(W, words):
    return f"{len(words)} {W}\n" + "\n".join(words)


def generate(rng: random.Random) -> list[str]:
    tests = [
        build(1, ["a"]),
        build(5, ["a"]),
        build(3, ["a", "b", "c"]),
        build(4, ["ab", "cd", "e"]),
        build(10, ["Hello", "World"]),
        build(11, ["Hello", "World"]),
        build(6, ["abcdef", "a", "b", "abcdef"]),
        build(7, ["a", "b", "c", "d", "e", "f", "g", "h"]),
    ]
    for _ in range(30):
        W = rng.randint(1, 15)
        k = rng.randint(1, 12)
        tests.append(build(W, [word(rng, 1, min(W, 6)) for _ in range(k)]))
    for _ in range(14):
        W = rng.randint(10, 100)
        k = rng.randint(10, 300)
        tests.append(build(W, [word(rng, 1, min(W, rng.choice([3, 8, 15, W]))) for _ in range(k)]))
    tests.append(build(100, [word(rng, 1, 100) for _ in range(300)]))
    tests.append(build(100, [word(rng, 1, 4) for _ in range(300)]))
    tests.append(build(1, ["x"] * 300))
    tests.append(build(100, [word(rng, 100, 100) for _ in range(300)]))
    return tests


def validate(inp: str) -> None:
    lines = inp.rstrip("\n").split("\n")
    n, W = map(int, lines[0].split())
    assert 1 <= n <= 300 and 1 <= W <= 100
    words = lines[1:]
    assert len(words) == n
    for w in words:
        assert 1 <= len(w) <= W
        assert all(33 <= ord(c) <= 126 for c in w)

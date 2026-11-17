import random

def num(n, rng, nines=False):
    if n == 1:
        return [9 if nines else rng.randint(0, 9)]
    a = [9 if nines else rng.randint(0, 9) for _ in range(n - 1)]
    a.append(9 if nines else rng.randint(1, 9))  # most significant digit is non-zero
    return a

def fmt(a, b):
    return f"{len(a)} {len(b)}\n" + " ".join(map(str, a)) + "\n" + " ".join(map(str, b))

def generate(rng: random.Random) -> list[str]:
    t = [fmt([0], [0]), fmt([9], [1]), fmt([5], [5]), fmt([9, 9, 9], [1]), fmt([1], [9, 9, 9, 9]),
         fmt([0], [3, 2, 1]), fmt(num(10, rng, True), num(10, rng, True))]
    for _ in range(25):
        t.append(fmt(num(rng.randint(1, 6), rng), num(rng.randint(1, 6), rng)))
    for _ in range(13):
        t.append(fmt(num(rng.randint(5, 2000), rng), num(rng.randint(5, 2000), rng)))
    t.append(fmt(num(10000, rng), num(10000, rng)))
    t.append(fmt(num(10000, rng, True), num(10000, rng, True)))
    t.append(fmt(num(10000, rng, True), [1]))
    t.append(fmt(num(1, rng), num(10000, rng)))
    return t

def validate(inp: str) -> None:
    lines = inp.split("\n")
    n1, n2 = map(int, lines[0].split())
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[2].split()))
    assert 1 <= n1 <= 10000 and 1 <= n2 <= 10000 and len(a) == n1 and len(b) == n2
    assert all(0 <= x <= 9 for x in a + b)
    assert (n1 == 1 or a[-1] != 0) and (n2 == 1 or b[-1] != 0)

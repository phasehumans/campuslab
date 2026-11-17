import random


def fmt(arrs):
    n = len(arrs[0])
    return f"{n}\n" + "".join(" ".join(map(str, a)) + "\n" for a in arrs)


def rnd(rng, n, lo, hi):
    return [[rng.randint(lo, hi) for _ in range(n)] for _ in range(4)]


def generate(rng):
    B = 10**9
    t = [fmt([[0]] * 4), fmt([[1], [1], [1], [1]]), fmt([[B], [B], [-B], [-B]]),
         fmt([[B], [B], [B], [B]]), fmt([[0] * 200] * 4), fmt([[1, -1]] * 4)]
    for _ in range(20):
        t.append(fmt(rnd(rng, rng.randint(1, 6), -3, 3)))
    for _ in range(12):
        t.append(fmt(rnd(rng, rng.randint(10, 60), -20, 20)))
    for _ in range(6):
        t.append(fmt(rnd(rng, rng.randint(50, 200), -B, B)))
    for _ in range(4):
        t.append(fmt(rnd(rng, 200, -50, 50)))
    a = [rng.choice([-B, B, 0]) for _ in range(200)]
    t.append(fmt([a, a[::-1], [rng.choice([-B, B, 0]) for _ in range(200)], a]))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    lines = inp.split("\n")
    n = int(lines[0])
    assert 1 <= n <= 200
    for k in range(1, 5):
        a = list(map(int, lines[k].split()))
        assert len(a) == n and all(-10**9 <= x <= 10**9 for x in a)

import random

MX = 2**31 - 1


def fmt(b):
    b = sorted(b)
    return f"{len(b)}\n" + "\n".join(f"{l} {r} {h}" for l, r, h in b)


def rand_b(rng, n, span, hmax):
    out = []
    for _ in range(n):
        l = rng.randint(0, span - 1)
        r = rng.randint(l + 1, min(span, l + max(1, span // 3)))
        out.append((l, r, rng.randint(1, hmax)))
    return out


def generate(rng: random.Random) -> list[str]:
    t = [fmt([(0, 1, 1)]), fmt([(0, MX, MX)]), fmt([(0, 2, 3), (2, 5, 3)]), fmt([(1, 5, 3), (1, 5, 3)]),
         fmt([(0, 10, 5), (2, 4, 3)]), fmt([(0, 3, 2), (1, 2, 5), (5, 8, 2)]), fmt([(1, 2, 1), (1, 2, 2), (1, 2, 3)]),
         fmt([(0, 5, 3), (5, 10, 4), (10, 15, 3)]), fmt([(MX - 1, MX, 7), (0, 1, 7)])]
    for i in range(37):
        n = rng.randint(1, 6 if i < 20 else 300)
        span = rng.choice([5, 20, 1000, MX])
        hmax = rng.choice([2, 5, 1000, MX])
        t.append(fmt(rand_b(rng, n, span, hmax)))
    t.append(fmt(rand_b(rng, 10**4, MX, MX)))
    t.append(fmt(rand_b(rng, 10**4, 2000, 50)))
    t.append(fmt([(i, 2 * 10**4 - i, i + 1) for i in range(10**4)]))
    t.append(fmt([(i * 3, i * 3 + 3, rng.randint(1, 3)) for i in range(10**4)]))
    return t


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    n = tok[0]
    assert 1 <= n <= 10**4
    assert len(tok) == 1 + 3 * n
    prev = -1
    for i in range(n):
        l, r, h = tok[1 + 3 * i:4 + 3 * i]
        assert 0 <= l < r <= MX and 1 <= h <= MX
        assert l >= prev
        prev = l

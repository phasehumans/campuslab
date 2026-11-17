import random

def fmt(g):
    return "\n".join([f"{len(g)} {len(g[0])}"] + [" ".join(map(str, row)) for row in g])

def rg(rng, r, c, p):
    return [[1 if rng.random() < p else 0 for _ in range(c)] for _ in range(r)]

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[0]]), fmt([[1]]), fmt([[1, 0, 1]]), fmt([[1, 0], [0, 1]]), fmt([[1], [1], [0], [1]])]
    t.append(fmt([[(i + j) % 2 for j in range(100)] for i in range(100)]))
    t.append(fmt([[1] * 100 for _ in range(100)]))
    t.append(fmt(rg(rng, 100, 100, 0.45)))
    t.append(fmt(rg(rng, 100, 100, 0.6)))
    spiral = [[1 if (i % 2 == 0 or (j == 99 and i % 4 == 1) or (j == 0 and i % 4 == 3)) else 0 for j in range(100)] for i in range(100)]
    t.append(fmt(spiral))
    for _ in range(14):
        r, c = rng.randint(1, 100), rng.randint(1, 100)
        t.append(fmt(rg(rng, r, c, rng.choice([0.2, 0.4, 0.55, 0.8]))))
    for _ in range(60):
        r, c = rng.randint(1, 6), rng.randint(1, 6)
        t.append(fmt(rg(rng, r, c, 0.5)))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    r, c = d[0], d[1]
    assert 1 <= r <= 100 and 1 <= c <= 100 and len(d) == 2 + r * c
    assert all(x in (0, 1) for x in d[2:])

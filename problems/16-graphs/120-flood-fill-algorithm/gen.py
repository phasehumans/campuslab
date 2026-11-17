import random

def fmt(g, sr, sc, col):
    return "\n".join([f"{len(g)} {len(g[0])}"] + [" ".join(map(str, row)) for row in g] + [f"{sr} {sc} {col}"])

def rg(rng, r, c, k):
    return [[rng.randrange(k) for _ in range(c)] for _ in range(r)]

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[0]], 0, 0, 0), fmt([[0]], 0, 0, 7), fmt([[1, 1], [1, 1]], 1, 1, 1), fmt([[1, 2], [2, 1]], 0, 0, 3),
         fmt([[5, 5, 5, 5, 5]], 0, 4, 10**4), fmt([[1], [1], [0], [1]], 3, 0, 2)]
    t.append(fmt(rg(rng, 50, 50, 2), rng.randrange(50), rng.randrange(50), 9))
    t.append(fmt([[3] * 50 for _ in range(50)], 0, 0, 4))
    snake = [[1 if (i % 4 != 1 or j == 49) and (i % 4 != 3 or j == 0) else 0 for j in range(50)] for i in range(50)]
    t.append(fmt(snake, 0, 0, 2))
    t.append(fmt(rg(rng, 50, 50, 3), 49, 49, 0))
    for _ in range(14):
        r, c = rng.randint(1, 50), rng.randint(1, 50)
        k = rng.choice([2, 3, 10**4])
        g = rg(rng, r, c, k)
        t.append(fmt(g, rng.randrange(r), rng.randrange(c), rng.randrange(min(k + 1, 10**4 + 1))))
    for _ in range(60):
        r, c = rng.randint(1, 5), rng.randint(1, 5)
        t.append(fmt(rg(rng, r, c, 3), rng.randrange(r), rng.randrange(c), rng.randrange(4)))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    r, c = d[0], d[1]
    assert 1 <= r <= 50 and 1 <= c <= 50 and len(d) == 5 + r * c
    assert all(0 <= x <= 10**4 for x in d[2:2 + r * c])
    sr, sc, col = d[2 + r * c:]
    assert 0 <= sr < r and 0 <= sc < c and 0 <= col <= 10**4

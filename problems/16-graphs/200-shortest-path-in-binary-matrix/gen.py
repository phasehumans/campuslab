import random

def fmt(g):
    return "\n".join([str(len(g))] + [" ".join(map(str, row)) for row in g])

def rg(rng, n, p):
    g = [[1 if rng.random() < p else 0 for _ in range(n)] for _ in range(n)]
    if rng.random() < 0.9:
        g[0][0] = 0; g[-1][-1] = 0
    return g

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[0]]), fmt([[1]]), fmt([[0, 1], [1, 0]]), fmt([[0, 0], [0, 1]]), fmt([[0, 1], [1, 1]])]
    t.append(fmt([[0] * 100 for _ in range(100)]))
    snake = [[1 if (i % 4 == 1 and j != 99) or (i % 4 == 3 and j != 0) else 0 for j in range(100)] for i in range(100)]
    t.append(fmt(snake))
    t.append(fmt(rg(rng, 100, 0.3)))
    t.append(fmt(rg(rng, 100, 0.45)))
    for _ in range(14):
        n = rng.randint(2, 100)
        t.append(fmt(rg(rng, n, rng.choice([0.2, 0.35, 0.5]))))
    for _ in range(60):
        n = rng.randint(1, 6)
        t.append(fmt(rg(rng, n, 0.35)))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n = d[0]
    assert 1 <= n <= 100 and len(d) == 1 + n * n
    assert all(x in (0, 1) for x in d[1:])

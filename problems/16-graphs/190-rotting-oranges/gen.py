import random

def fmt(g):
    return "\n".join([f"{len(g)} {len(g[0])}"] + [" ".join(map(str, row)) for row in g])

def rg(rng, r, c, w):
    return [rng.choices([0, 1, 2], weights=w, k=c) for _ in range(r)]

def generate(rng: random.Random) -> list[str]:
    t = [fmt([[0]]), fmt([[1]]), fmt([[2]]), fmt([[2, 1]]), fmt([[1, 0, 2]]), fmt([[0, 2], [2, 0]]),
         fmt([[2] + [1] * 9]), fmt([[1] * 10 for _ in range(10)]), fmt([[2 if (i, j) == (0, 0) else 1 for j in range(10)] for i in range(10)])]
    snake = [[1 if (i % 4 != 1 or j == 9) and (i % 4 != 3 or j == 0) else 0 for j in range(10)] for i in range(10)]
    snake[0][0] = 2
    t.append(fmt(snake))
    for _ in range(25):
        r, c = rng.randint(1, 10), rng.randint(1, 10)
        t.append(fmt(rg(rng, r, c, rng.choice([[1, 6, 1], [2, 8, 1], [1, 3, 1], [0, 10, 1]]))))
    for _ in range(60):
        r, c = rng.randint(1, 5), rng.randint(1, 5)
        t.append(fmt(rg(rng, r, c, [1, 8, 3])))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    r, c = d[0], d[1]
    assert 1 <= r <= 10 and 1 <= c <= 10 and len(d) == 2 + r * c
    assert all(x in (0, 1, 2) for x in d[2:])

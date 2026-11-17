import random


def fmt(g):
    return f"{len(g)}\n" + "\n".join(" ".join(map(str, row)) for row in g)


def generate(rng: random.Random) -> list[str]:
    tests = [fmt([[1]]), fmt([[0]]), fmt([[1, 1], [1, 0]]), fmt([[0, 1], [1, 1]]),
             fmt([[1, 0], [0, 1]]),
             fmt([[1] * 5 for _ in range(5)]), fmt([[0] * 6 for _ in range(6)])]
    g = [[1] * 6 for _ in range(6)]
    g[1][1] = g[2][4] = g[4][2] = 0
    tests.append(fmt(g))
    g = [[1] * 6 for _ in range(6)]
    for r in range(5):
        g[r][3] = 0
    tests.append(fmt(g))
    while len(tests) < 60:
        n = rng.choice([2, 3, 4, 4, 5, 5, 6, 6, 6])
        p = rng.choice([0.5, 0.65, 0.75, 0.85])
        g = [[1 if rng.random() < p else 0 for _ in range(n)] for _ in range(n)]
        if rng.random() < 0.85:
            g[0][0] = g[n - 1][n - 1] = 1
        if n == 6 and sum(map(sum, g)) > 33:  # keep the reference solutions fast: 6x6 boards have at least 3 walls
            continue
        if fmt(g) not in tests:
            tests.append(fmt(g))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 6 and len(tok) == 1 + n * n
    assert all(t in ("0", "1") for t in tok[1:])

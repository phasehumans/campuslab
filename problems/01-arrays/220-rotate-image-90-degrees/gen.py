import random


def fmt(m):
    return f"{len(m)}\n" + "\n".join(" ".join(map(str, r)) for r in m)


def rnd(rng, n, lo=-1000, hi=1000):
    return [[rng.randint(lo, hi) for _ in range(n)] for _ in range(n)]


def generate(rng: random.Random) -> list[str]:
    t = [fmt([[5]]), fmt([[-1000]]), fmt([[i * 4 + j + 1 for j in range(4)] for i in range(4)]),
         fmt([[0, 0, 0], [1, 1, 1], [2, 2, 2]]), fmt([[1000, -1000], [-1000, 1000]])]
    for _ in range(30):
        t.append(fmt(rnd(rng, rng.randint(1, 8), -20, 20)))
    for _ in range(10):
        t.append(fmt(rnd(rng, rng.randint(9, 60))))
    t.append(fmt(rnd(rng, 100)))
    t.append(fmt(rnd(rng, 99)))
    t.append(fmt([[(i * 100 + j) % 2001 - 1000 for j in range(100)] for i in range(100)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 100
    a = list(map(int, tok[1:]))
    assert len(a) == n * n
    assert all(-1000 <= x <= 1000 for x in a)

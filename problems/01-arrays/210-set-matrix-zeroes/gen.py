import random

LO, HI = -2**31, 2**31 - 1


def fmt(m):
    return f"{len(m)} {len(m[0])}\n" + "\n".join(" ".join(map(str, r)) for r in m)


def rnd(rng, r, c, pz, lo=-9, hi=9):
    return [[0 if rng.random() < pz else (rng.randint(lo, hi) or 1) for _ in range(c)] for _ in range(r)]


def generate(rng: random.Random) -> list[str]:
    t = [fmt([[0]]), fmt([[5]]), fmt([[1, 2], [3, 4]]), fmt([[0, 1], [2, 3]]), fmt([[0, 0, 0], [0, 1, 0], [0, 0, 0]]),
         fmt([[LO, HI, 0]]), fmt([[1], [0], [HI]]), fmt([[0] * 5])]
    for _ in range(27):
        r, c = rng.randint(1, 7), rng.randint(1, 7)
        t.append(fmt(rnd(rng, r, c, rng.choice([0.0, 0.05, 0.1, 0.2, 0.5]))))
    for _ in range(10):
        r, c = rng.randint(10, 80), rng.randint(10, 80)
        t.append(fmt(rnd(rng, r, c, rng.choice([0.0, 0.002, 0.01, 0.05]), LO, HI)))
    t.append(fmt(rnd(rng, 200, 200, 0.0005, LO, HI)))
    t.append(fmt(rnd(rng, 200, 200, 0.0, LO, HI)))
    t.append(fmt(rnd(rng, 200, 200, 0.01, -100, 100)))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    r, c = int(tok[0]), int(tok[1])
    assert 1 <= r <= 200 and 1 <= c <= 200
    a = list(map(int, tok[2:]))
    assert len(a) == r * c
    assert all(LO <= x <= HI for x in a)

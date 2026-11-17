import random


def fmt(m):
    return f"{len(m)} {len(m[0])}\n" + "\n".join(" ".join(map(str, r)) for r in m)


def rnd(rng, r, c):
    return [[rng.randint(-100, 100) for _ in range(c)] for _ in range(r)]


def seq(r, c):
    return [[(i * c + j) % 201 - 100 for j in range(c)] for i in range(r)]


def generate(rng: random.Random) -> list[str]:
    t = [fmt([[42]]), fmt(seq(1, 5)), fmt(seq(5, 1)), fmt(seq(2, 2)), fmt(seq(4, 4)), fmt(seq(2, 5)), fmt(seq(5, 2)),
         fmt(seq(3, 1)), fmt(seq(1, 3)), fmt(seq(3, 2)), fmt(seq(2, 3)), fmt(seq(5, 5))]
    for _ in range(25):
        t.append(fmt(rnd(rng, rng.randint(1, 8), rng.randint(1, 8))))
    for _ in range(9):
        t.append(fmt(rnd(rng, rng.randint(9, 70), rng.randint(9, 70))))
    t.append(fmt(rnd(rng, 100, 100)))
    t.append(fmt(rnd(rng, 100, 99)))
    t.append(fmt(rnd(rng, 1, 100)))
    t.append(fmt(rnd(rng, 100, 1)))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    r, c = int(tok[0]), int(tok[1])
    assert 1 <= r <= 100 and 1 <= c <= 100
    a = list(map(int, tok[2:]))
    assert len(a) == r * c
    assert all(-100 <= x <= 100 for x in a)

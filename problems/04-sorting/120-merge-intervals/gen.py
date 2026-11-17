import random


def mk(iv):
    return f"{len(iv)}\n" + "\n".join(f"{s} {e}" for s, e in iv)


def rnd(rng, n, r, maxlen):
    out = []
    for _ in range(n):
        s = rng.randint(0, r)
        out.append((s, min(r, s + rng.randint(0, maxlen))))
    return out


def generate(rng: random.Random) -> list[str]:
    t = [mk([(10, 20)]), mk([(0, 0)]), mk([(1, 5), (6, 8), (9, 10)]), mk([(1, 10), (2, 3), (4, 5), (6, 7), (8, 9)]),
         mk([(5, 8), (3, 4), (1, 2)]), mk([(0, 0), (1, 2), (2, 3), (0, 1), (5, 5)]), mk([(3, 3), (3, 3)]),
         mk([(0, 10**9), (5, 6)]), mk([(1, 2), (2, 3), (3, 4), (4, 5)])]
    for _ in range(20):
        t.append(mk(rnd(rng, rng.randint(1, 8), rng.choice([10, 30]), rng.choice([0, 2, 5]))))
    for _ in range(16):
        n = rng.randint(10, 3000)
        t.append(mk(rnd(rng, n, rng.choice([n, 10 * n, 10**9]), rng.choice([0, 3, 50, 10**6]))))
    t.append(mk(rnd(rng, 100000, 10**9, 10**4)))
    t.append(mk(rnd(rng, 90000, 10**9, 10**9)))
    t.append(mk(rnd(rng, 100000, 10**9, 0)))
    t.append(mk(rnd(rng, 100000, 10**6, 5)))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == 2 * n + 1
    for i in range(n):
        s, e = int(tok[1 + 2 * i]), int(tok[2 + 2 * i])
        assert 0 <= s <= e <= 10**9

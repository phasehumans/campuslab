import random


def mk(e):
    return f"{len(e)}\n" + "\n".join(f"{w} {h}" for w, h in e)


def rnd(rng, n, r):
    return [(rng.randint(1, r), rng.randint(1, r)) for _ in range(n)]


def generate(rng: random.Random) -> list[str]:
    t = [mk([(10, 10)]), mk([(1, 2), (2, 3), (3, 4), (3, 5)]), mk([(1, 3), (3, 5), (2, 4), (4, 6)]),
         mk([(5, 4), (6, 4), (6, 5)]), mk([(1, 1), (2, 2), (3, 3), (2, 1), (1, 2)]),
         mk([(i, i) for i in range(1, 11)]), mk([(1, i) for i in range(1, 11)]), mk([(i, 11 - i) for i in range(1, 11)]),
         mk([(10**9, 10**9), (1, 1)])]
    for _ in range(20):
        t.append(mk(rnd(rng, rng.randint(1, 10), rng.choice([3, 6, 20]))))
    for _ in range(16):
        n = rng.randint(10, 3000)
        t.append(mk(rnd(rng, n, rng.choice([10, n, 10**9]))))
    t.append(mk(rnd(rng, 100000, 10**9)))
    t.append(mk(rnd(rng, 100000, 1000)))
    xs = sorted(rng.sample(range(1, 10**9), 100000))
    t.append(mk([(x, x + rng.randint(0, 3)) for x in xs]))
    t.append(mk([(rng.randint(1, 50), rng.randint(1, 10**9)) for _ in range(100000)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == 2 * n + 1
    assert all(1 <= int(x) <= 10**9 for x in tok[1:])

import random


def mk(vals):
    vals = sorted(vals)
    return f"{len(vals)}\n" + " ".join(map(str, vals))


def generate(rng: random.Random) -> list[str]:
    t = [mk([0]), mk([-10000]), mk([10000]), mk([-10000, 10000]), mk([-3, -2, -1]), mk([1, 2, 3]),
         mk([-5] * 7), mk([-2, -1, 0, 1, 2])]
    for _ in range(20):
        n = rng.randint(1, 10)
        r = rng.choice([5, 50, 10000])
        t.append(mk([rng.randint(-r, r) for _ in range(n)]))
    for _ in range(18):
        n = rng.randint(10, 2000)
        t.append(mk([rng.randint(-10000, rng.choice([-1, 0, 10000])) for _ in range(n)]))
    for _ in range(2):
        t.append(mk([rng.randint(-10000, 10000) for _ in range(100000)]))
    t.append(mk([rng.randint(-10000, -1) for _ in range(100000)]))
    t.append(mk([rng.randint(0, 10000) for _ in range(100000)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == n + 1
    a = list(map(int, tok[1:]))
    assert all(-10**4 <= x <= 10**4 for x in a)
    assert a == sorted(a)

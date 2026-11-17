import random


def mk(a):
    return f"{len(a)}\n" + " ".join(map(str, a))


def generate(rng: random.Random) -> list[str]:
    t = [mk([0]), mk([1]), mk([2]), mk([2, 2, 2, 2]), mk([0] * 5), mk([1, 1, 1]), mk([2, 1, 0]),
         mk([0, 1, 2]), mk([2, 2, 0, 0]), mk([1, 0])]
    for _ in range(26):
        n = rng.randint(1, 12)
        k = rng.choice([[0, 1], [1, 2], [0, 2], [0, 1, 2]])
        t.append(mk([rng.choice(k) for _ in range(n)]))
    for _ in range(14):
        t.append(mk([rng.randint(0, 2) for _ in range(rng.randint(13, 3000))]))
    t.append(mk([rng.randint(0, 2) for _ in range(100000)]))
    t.append(mk([2] * 50000 + [0] * 50000))
    t.append(mk([rng.choice([0, 2]) for _ in range(100000)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == n + 1
    assert all(x in ("0", "1", "2") for x in tok[1:])

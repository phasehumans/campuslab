import random


def mk(a):
    return f"{len(a)}\n" + " ".join(map(str, a))


def generate(rng: random.Random) -> list[str]:
    t = [mk([10]), mk([5, 4, 3, 2, 1]), mk([1, 2, 3, 4, 5]), mk([1, 3, 2, 3, 1, 2]), mk([10, -10]),
         mk([-10000, 10000]), mk([7] * 6), mk([10000, -10000, 0])]
    for _ in range(22):
        n = rng.randint(1, 12)
        r = rng.choice([2, 10, 10000])
        t.append(mk([rng.randint(-r, r) for _ in range(n)]))
    for _ in range(15):
        n = rng.randint(13, 3000)
        r = rng.choice([5, 1000, 10000])
        t.append(mk([rng.randint(-r, r) for _ in range(n)]))
    t.append(mk([rng.randint(-10000, 10000) for _ in range(100000)]))
    t.append(mk(sorted((rng.randint(-10000, 10000) for _ in range(100000)), reverse=True)))
    t.append(mk([rng.randint(-3, 3) for _ in range(100000)]))
    t.append(mk(sorted(rng.randint(-10000, 10000) for _ in range(100000))))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == n + 1
    assert all(-10**4 <= int(x) <= 10**4 for x in tok[1:])

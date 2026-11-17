import random


def mk(a):
    return f"{len(a)}\n" + " ".join(map(str, a))


def generate(rng: random.Random) -> list[str]:
    t = [mk([0]), mk([100]), mk([10**9]), mk([0, 0, 0, 0]), mk([10] * 6), mk([1] * 5), mk([2] * 5),
         mk([10, 8, 5, 4, 3]), mk(list(range(1, 11))), mk([10**9] * 3)]
    for _ in range(20):
        n = rng.randint(1, 10)
        t.append(mk([rng.randint(0, rng.choice([3, 10, 20])) for _ in range(n)]))
    for _ in range(16):
        n = rng.randint(10, 3000)
        t.append(mk([rng.randint(0, rng.choice([n // 2, n, 2 * n, 10**9])) for _ in range(n)]))
    t.append(mk([rng.randint(0, 10**9) for _ in range(100000)]))
    t.append(mk([rng.randint(0, 100000) for _ in range(100000)]))
    t.append(mk([100000] * 100000))
    t.append(mk([rng.randint(40000, 60000) for _ in range(100000)]))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5 and len(tok) == n + 1
    assert all(0 <= int(x) <= 10**9 for x in tok[1:])

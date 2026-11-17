import random


def make(rng, n, miss=None):
    if miss is None:
        miss = rng.randint(0, n)
    a = [x for x in range(n + 1) if x != miss]
    rng.shuffle(a)
    return f"{n}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = ["1\n0", "1\n1", "2\n0 1", "2\n2 0", "2\n1 2", "5\n0 1 2 3 4", "6\n6 5 4 3 2 1",
         "10\n10 9 8 7 6 5 4 3 1 0"]
    for _ in range(10):
        t.append(make(rng, rng.randint(100, 5000)))
    t.append(make(rng, 10**5, 0))
    t.append(make(rng, 10**5, 10**5))
    t.append(make(rng, 10**5))
    for _ in range(40):
        t.append(make(rng, rng.randint(1, 20)))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n and len(set(a)) == n
    assert all(0 <= x <= n for x in a)

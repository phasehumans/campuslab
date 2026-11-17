import random

def case(n, val, pool, rng):
    a = [rng.choice(pool) for _ in range(n)]
    if all(x == val for x in a):
        a[rng.randrange(n)] = val + 1 if val < 10**9 else val - 1
    return f"{n} {val}\n" + " ".join(map(str, a))

def generate(rng: random.Random) -> list[str]:
    t = ["1 3\n4", "2 5\n5 6", "2 5\n6 5", "5 1\n2 2 2 2 2", "5 -1000000000\n-1000000000 1000000000 -1000000000 0 -1000000000",
         "6 2\n2 2 3 2 2 2", "3 0\n0 1 0"]
    for _ in range(25):
        n = rng.randint(1, 10)
        val = rng.randint(-3, 3)
        t.append(case(n, val, list(range(-3, 4)), rng))
    for _ in range(15):
        n = rng.randint(10, 2000)
        val = rng.randint(-5, 5)
        t.append(case(n, val, list(range(-5, 6)), rng))
    for _ in range(2):
        t.append(case(10**5, 7, [7, 7, 7, rng.randint(-10**9, 10**9)], rng))
    t.append(case(10**5, 0, [rng.randint(-10**9, 10**9) for _ in range(50)] + [0], rng))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n, val = int(d[0]), int(d[1])
    assert 1 <= n <= 10**5 and len(d) == n + 2
    assert -10**9 <= val <= 10**9
    a = [int(x) for x in d[2:]]
    assert all(-10**9 <= x <= 10**9 for x in a)
    assert any(x != val for x in a)

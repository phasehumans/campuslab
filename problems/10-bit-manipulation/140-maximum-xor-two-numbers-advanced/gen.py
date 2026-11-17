import random

NMAX = 200000


def make(rng, n, hi=10**9):
    a = [rng.randint(0, hi) for _ in range(n)]
    return f"{n}\n{' '.join(map(str, a))}\n"


def generate(rng: random.Random) -> list[str]:
    tests = ["2\n0 0\n", "2\n0 1000000000\n", "3\n7 7 7\n", "5\n1 2 4 8 16\n", "2\n536870912 536870911\n",
             "4\n1023 512 256 128\n", "5\n999999999 999999998 999999997 999999996 999999995\n"]
    for _ in range(22):
        tests.append(make(rng, rng.randint(2, 8), rng.choice([15, 100, 10**9])))
    for _ in range(16):
        tests.append(make(rng, rng.randint(10, 1000)))
    hi_block = [rng.randint(2**29, 10**9) for _ in range(NMAX - 1000)]
    tests.append(f"{len(hi_block)}\n{' '.join(map(str, hi_block))}\n")
    tests.append(make(rng, NMAX - 1000))
    tests.append(make(rng, NMAX, 2**20))
    tests.append(f"{NMAX}\n" + " ".join(["12345678"] * NMAX) + "\n")
    return tests


def validate(inp: str) -> None:
    t = list(map(int, inp.split()))
    n, a = t[0], t[1:]
    assert 2 <= n <= NMAX and len(a) == n
    assert all(0 <= x <= 10**9 for x in a)

import random


def mk(arrs):
    return f"{len(arrs)} {len(arrs[0])}\n" + "\n".join(" ".join(map(str, sorted(a))) for a in arrs)


def rnd(rng, k, n, lo, hi):
    return mk([[rng.randint(lo, hi) for _ in range(n)] for _ in range(k)])


def generate(rng: random.Random) -> list[str]:
    t = [mk([[42]]), mk([[10], [5]]), mk([[4], [3], [2], [1]]), mk([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]),
         mk([[6, 7, 8, 9, 10], [1, 2, 3, 4, 5]]), mk([[1, 1, 1], [2, 2, 2], [3, 3, 3]]),
         mk([[-10**9, 10**9], [-10**9, 10**9]]), mk([[7] * 4] * 3)]
    for _ in range(20):
        t.append(rnd(rng, rng.randint(1, 6), rng.randint(1, 6), -rng.choice([5, 100]), rng.choice([5, 100])))
    for _ in range(18):
        t.append(rnd(rng, rng.randint(1, 100), rng.randint(1, 100), -10**9, 10**9))
    t.append(rnd(rng, 500, 500, 0, 99999))
    t.append(rnd(rng, 500, 300, -10**9, 10**9))
    t.append(rnd(rng, 300, 500, -10**9, 10**9))
    t.append(rnd(rng, 500, 1, -10**9, 10**9))
    return t


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    k, n = map(int, lines[0].split())
    assert 1 <= k <= 500 and 1 <= n <= 500 and len(lines) == k + 1
    for line in lines[1:]:
        a = list(map(int, line.split()))
        assert len(a) == n and a == sorted(a)
        assert all(-10**9 <= x <= 10**9 for x in a)

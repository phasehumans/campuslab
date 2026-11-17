import random


def fmt(lists):
    return f"{len(lists)}\n" + "\n".join(" ".join(map(str, [len(l)] + l)) for l in lists)


def rand_lists(rng, k, maxm, hi):
    return [sorted(rng.randint(-hi, hi) for _ in range(rng.randint(1, maxm))) for _ in range(k)]


def generate(rng: random.Random) -> list[str]:
    t = [fmt([[5]]), fmt([[1, 5], [3, 7]]), fmt([[100], [100], [100]]), fmt([[-10, -5, 0], [-8, -4, 2], [-7, -3, 5]]),
         fmt([[-10**5], [10**5]]), fmt([[1, 10], [2, 11], [12]]), fmt([[1, 2, 3, 4], [10, 20]]),
         fmt([[0, 10], [5]])]
    for i in range(38):
        k = rng.randint(1, 4 if i < 20 else 60)
        hi = rng.choice([3, 20, 1000, 10**5])
        t.append(fmt(rand_lists(rng, k, 5 if i < 20 else 50, hi)))
    t.append(fmt(rand_lists(rng, 2000, 50, 10**5)))
    t.append(fmt([sorted(rng.randint(-10**5, 10**5) for _ in range(rng.randint(25, 28))) for _ in range(3500)]))
    t.append(fmt(rand_lists(rng, 3500, 50, 300)))
    t.append(fmt(rand_lists(rng, 2000, 50, 10**5)[:2] + [[rng.randint(-10**5, 10**5)] for _ in range(1000)]))
    return t


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    k = tok[0]
    assert 1 <= k <= 3500
    pos, total = 1, 0
    for _ in range(k):
        m = tok[pos]
        assert 1 <= m <= 50
        l = tok[pos + 1:pos + 1 + m]
        assert len(l) == m and l == sorted(l)
        assert all(-10**5 <= x <= 10**5 for x in l)
        pos += 1 + m
        total += m
    assert pos == len(tok)
    assert total <= 10**5

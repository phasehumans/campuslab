import random


def fmt(lists):
    return f"{len(lists)}\n" + "\n".join(" ".join(map(str, [len(l)] + l)) for l in lists)


def rand_lists(rng, k, maxm, hi, empty_p=0.2):
    out = []
    for _ in range(k):
        m = 0 if rng.random() < empty_p else rng.randint(1, maxm)
        out.append(sorted(rng.randint(-hi, hi) for _ in range(m)))
    if all(len(l) == 0 for l in out):
        out[0] = [rng.randint(-hi, hi)]
    return out


def generate(rng: random.Random) -> list[str]:
    t = [fmt([[5]]), fmt([[], [-10**9, 10**9]]), fmt([[1, 1, 1], [1, 1]]), fmt([[3], [2], [1]]),
         fmt([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), fmt([[], [], [0]])]
    for i in range(40):
        k = rng.randint(1, 5 if i < 20 else 60)
        hi = rng.choice([3, 50, 10**9])
        t.append(fmt(rand_lists(rng, k, 6 if i < 20 else 100, hi)))
    t.append(fmt(rand_lists(rng, 100, 1000, 10**9, 0)))
    t.append(fmt(rand_lists(rng, 500, 200, 10**9, 0)))
    t.append(fmt(rand_lists(rng, 500, 400, 10**3, 0.5)))
    return t


def validate(inp: str) -> None:
    tok = list(map(int, inp.split()))
    k = tok[0]
    assert 0 <= k <= 500
    pos, total = 1, 0
    for _ in range(k):
        m = tok[pos]
        assert 0 <= m <= 1000
        l = tok[pos + 1:pos + 1 + m]
        assert len(l) == m and l == sorted(l)
        assert all(-10**9 <= x <= 10**9 for x in l)
        pos += 1 + m
        total += m
    assert pos == len(tok)
    assert 1 <= total <= 10**5  # empty output is not tested

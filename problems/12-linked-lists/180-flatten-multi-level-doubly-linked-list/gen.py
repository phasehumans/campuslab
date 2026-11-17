import random
import sys

sys.setrecursionlimit(10000)


def make(n, rng, flat=0.5, lo=-10**9, hi=10**9):
    """Random multi-level list with n nodes. Returns input text."""
    ids = list(range(1, n + 1))
    rng.shuffle(ids)
    it = iter(ids)
    rows = {}

    def build(cnt):
        L = max(1, min(cnt, int(cnt * flat * rng.random()) + 1)) if rng.random() < 0.8 else rng.randint(1, cnt)
        nodes = [next(it) for _ in range(L)]
        rem = cnt - L
        extra = [0] * L
        while rem > 0:
            c = rng.randint(1, rem)
            extra[rng.randrange(L)] += c
            rem -= c
        for j, u in enumerate(nodes):
            rows[u] = [u, rng.randint(lo, hi), nodes[j + 1] if j + 1 < L else -1, nodes[j - 1] if j else -1, -1]
        for j, u in enumerate(nodes):
            if extra[j]:
                rows[u][4] = build(extra[j])
        return nodes[0]

    head = build(n)
    order = list(rows.values())
    rng.shuffle(order)
    return f"{n} {head}\n" + "\n".join(" ".join(map(str, r)) for r in order)


def generate(rng: random.Random) -> list[str]:
    t = ["1 1\n1 42 -1 -1 -1",
         "2 2\n2 5 -1 -1 1\n1 6 -1 -1 -1",
         "3 1\n1 1 2 -1 -1\n2 2 3 1 -1\n3 3 -1 2 -1",
         "4 1\n1 1 2 -1 3\n2 2 -1 1 -1\n3 3 4 -1 -1\n4 4 -1 3 -1",
         "4 1\n1 -1000000000 -1 -1 2\n2 1000000000 -1 -1 3\n3 0 -1 -1 4\n4 7 -1 -1 -1"]
    for _ in range(25):
        t.append(make(rng.randint(1, 10), rng, rng.random(), -20, 20))
    for _ in range(15):
        t.append(make(rng.randint(10, 400), rng, rng.random()))
    t.append(make(1000, rng, 0.9))
    t.append(make(1000, rng, 0.05))
    t.append(make(1000, rng, 0.3))
    return t


def validate(inp: str) -> None:
    d = inp.split()
    n, head = int(d[0]), int(d[1])
    assert 1 <= n <= 1000 and len(d) == 2 + 5 * n
    rows = {}
    for k in range(n):
        r = list(map(int, d[2 + 5 * k:7 + 5 * k]))
        assert 1 <= r[0] <= n and r[0] not in rows
        assert -10**9 <= r[1] <= 10**9
        rows[r[0]] = r
    assert head in rows and rows[head][3] == -1
    seen = set()
    stack = [head]
    while stack:
        u = stack.pop()
        assert u not in seen
        seen.add(u)
        _, _, nx, pv, ch = rows[u]
        if nx != -1:
            assert rows[nx][3] == u
            stack.append(nx)
        if ch != -1:
            assert rows[ch][3] == -1
            stack.append(ch)
    assert len(seen) == n

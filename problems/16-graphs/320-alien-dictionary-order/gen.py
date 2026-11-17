import random
import string
from functools import cmp_to_key

def make(rng, n, k, maxlen):
    alpha = rng.sample(string.ascii_lowercase, k)
    rank = {c: i for i, c in enumerate(alpha)}
    words = ["".join(rng.choice(alpha) for _ in range(rng.randint(1, maxlen))) for _ in range(n)]
    words.sort(key=lambda w: [rank[c] for c in w])
    return f"{n}\n" + "\n".join(words)

def make_prefixy(rng, n, k, maxlen):
    # few branching points so that many orders stay undetermined
    alpha = rng.sample(string.ascii_lowercase, k)
    rank = {c: i for i, c in enumerate(alpha)}
    base = "".join(rng.choice(alpha) for _ in range(maxlen))
    words = [base[: rng.randint(1, maxlen)] + "".join(rng.choice(alpha) for _ in range(rng.randint(0, 2))) for _ in range(n)]
    words = [w[:maxlen] for w in words]
    words.sort(key=lambda w: [rank[c] for c in w])
    return f"{n}\n" + "\n".join(words)

def generate(rng: random.Random) -> list[str]:
    t = ["1\na", "1\nzyx", "2\nab\nabc", "2\nba\nab", "3\nc\nb\na", "2\nabc\nabd", "4\nb\nb\nb\nb", "3\nca\ncb\nba"]
    t.append(make(rng, 100, 26, 100))
    t.append(make(rng, 100, 26, 3))
    t.append(make(rng, 100, 26, 1))
    t.append(make_prefixy(rng, 100, 26, 100))
    for _ in range(16):
        t.append(make(rng, rng.randint(2, 100), rng.randint(2, 26), rng.choice([2, 4, 10, 100])))
    for _ in range(6):
        t.append(make_prefixy(rng, rng.randint(2, 50), rng.randint(2, 26), rng.randint(2, 20)))
    for _ in range(60):
        t.append(make(rng, rng.randint(1, 6), rng.randint(1, 5), rng.randint(1, 3)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    words = d[1:]
    assert 1 <= n <= 100 and len(words) == n
    assert all(1 <= len(w) <= 100 and w.isalpha() and w.islower() for w in words)
    # consistency: no proper prefix after its extension, no cycle among derived edges
    edges = {}
    for a, b in zip(words, words[1:]):
        diff = next((i for i in range(min(len(a), len(b))) if a[i] != b[i]), None)
        if diff is None:
            assert len(a) <= len(b), "prefix order violated"
        else:
            edges.setdefault(a[diff], set()).add(b[diff])
    state = {}
    def dfs(u):
        state[u] = 1
        for v in edges.get(u, ()):
            assert state.get(v) != 1, "cycle"
            if v not in state:
                dfs(v)
        state[u] = 2
    for c in list(edges):
        if c not in state:
            dfs(c)

import random

def star(rng, n, c):
    others = [v for v in range(1, n + 1) if v != c]
    rng.shuffle(others)
    edges = [(c, v) if rng.random() < 0.5 else (v, c) for v in others]
    return "\n".join([str(n)] + [f"{u} {v}" for u, v in edges])

def generate(rng: random.Random) -> list[str]:
    t = [star(rng, 3, 1), star(rng, 3, 2), star(rng, 3, 3)]
    N = 10**5
    for c in [1, N, rng.randint(1, N)]:
        t.append(star(rng, N, c))
    for _ in range(14):
        n = rng.randint(4, 3000)
        t.append(star(rng, n, rng.randint(1, n)))
    for _ in range(60):
        n = rng.randint(3, 8)
        t.append(star(rng, n, rng.randint(1, n)))
    return t

def validate(inp: str) -> None:
    d = list(map(int, inp.split()))
    n = d[0]
    assert 3 <= n <= 10**5 and len(d) == 1 + 2 * (n - 1)
    edges = [(d[1 + 2 * i], d[2 + 2 * i]) for i in range(n - 1)]
    deg = [0] * (n + 1)
    for u, v in edges:
        assert 1 <= u <= n and 1 <= v <= n and u != v
        deg[u] += 1; deg[v] += 1
    assert sorted(deg[1:]) == [1] * (n - 1) + [n - 1]

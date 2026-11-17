import random
import string

def code(rng):
    return "".join(rng.choice(string.ascii_uppercase) for _ in range(3))

def walk(rng, n, k):
    airports = ["JFK"]
    while len(airports) < k:
        c = code(rng)
        if c not in airports:
            airports.append(c)
    cur = "JFK"
    tickets = []
    for _ in range(n):
        nxt = rng.choice(airports)
        while nxt == cur:
            nxt = rng.choice(airports)
        tickets.append((cur, nxt))
        cur = nxt
    rng.shuffle(tickets)
    return "\n".join([str(n)] + [f"{a} {b}" for a, b in tickets])

def generate(rng: random.Random) -> list[str]:
    t = ["1\nJFK AAA", "2\nJFK ZZZ\nZZZ JFK", "3\nJFK AAA\nJFK BBB\nBBB JFK", "3\nJFK BBB\nJFK AAA\nAAA JFK",
         "4\nJFK SFO\nSFO JFK\nJFK ATL\nATL JFK"]
    t.append(walk(rng, 300, 2))
    t.append(walk(rng, 300, 5))
    t.append(walk(rng, 300, 40))
    t.append(walk(rng, 300, 300))
    for _ in range(16):
        t.append(walk(rng, rng.randint(5, 300), rng.randint(2, 30)))
    for _ in range(60):
        t.append(walk(rng, rng.randint(1, 8), rng.randint(2, 4)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0])
    assert 1 <= n <= 300 and len(d) == 1 + 2 * n
    out, inn = {}, {}
    for i in range(n):
        a, b = d[1 + 2 * i], d[2 + 2 * i]
        for c in (a, b):
            assert len(c) == 3 and c.isalpha() and c.isupper()
        assert a != b
        out[a] = out.get(a, 0) + 1
        inn[b] = inn.get(b, 0) + 1
    # Euler path from JFK: JFK has out - in == 1 (or all balanced), every other node balanced except one end
    nodes = set(out) | set(inn)
    diff = {v: out.get(v, 0) - inn.get(v, 0) for v in nodes}
    assert "JFK" in out
    starts = [v for v in nodes if diff[v] == 1]
    ends = [v for v in nodes if diff[v] == -1]
    assert all(abs(x) <= 1 for x in diff.values())
    assert (not starts and not ends) or (starts == ["JFK"] and len(ends) == 1)
    # connectivity of edges from JFK (undirected suffices together with the degree condition... check directed reach)
    adj = {}
    for i in range(n):
        adj.setdefault(d[1 + 2 * i], []).append(d[2 + 2 * i])
    seen = {"JFK"}; st = ["JFK"]
    while st:
        u = st.pop()
        for v in adj.get(u, ()):
            if v not in seen:
                seen.add(v); st.append(v)
    assert all(v in seen for v in nodes)

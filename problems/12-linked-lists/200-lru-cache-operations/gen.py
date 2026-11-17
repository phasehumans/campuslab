import random

def case(cap, q, keys, rng, pget=0.5, vmax=10**6):
    ops = []
    for _ in range(q):
        if rng.random() < pget:
            ops.append(f"GET {rng.randint(0, keys)}")
        else:
            ops.append(f"PUT {rng.randint(0, keys)} {rng.randint(0, vmax)}")
    if not any(o.startswith("GET") for o in ops):
        ops[-1] = f"GET {rng.randint(0, keys)}"
    return f"{cap} {len(ops)}\n" + "\n".join(ops)

def generate(rng: random.Random) -> list[str]:
    t = ["1 1\nGET 0", "1 2\nPUT 1000000 1000000\nGET 1000000",
         "1 4\nPUT 1 5\nPUT 2 6\nGET 1\nGET 2",
         "2 6\nPUT 1 1\nPUT 2 2\nPUT 1 10\nPUT 3 3\nGET 2\nGET 1",
         "2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3",
         "3 7\nPUT 0 0\nGET 0\nPUT 0 9\nGET 0\nPUT 1 1\nPUT 2 2\nGET 0"]
    for _ in range(25):
        t.append(case(rng.randint(1, 4), rng.randint(1, 20), rng.randint(1, 6), rng, rng.uniform(0.2, 0.8), 50))
    for _ in range(14):
        cap = rng.randint(1, 100)
        t.append(case(cap, rng.randint(50, 3000), rng.randint(cap, 3 * cap + 5), rng, rng.uniform(0.3, 0.7)))
    t.append(case(3000, 10**5, 5000, rng))
    t.append(case(1, 10**5, 3, rng))
    t.append(case(1000, 10**5, 10**6, rng, 0.3))
    return t

def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    cap, q = map(int, lines[0].split())
    assert 1 <= cap <= 3000 and 1 <= q <= 10**5 and len(lines) == q + 1
    gets = 0
    for ln in lines[1:]:
        p = ln.split()
        if p[0] == "PUT":
            assert len(p) == 3 and 0 <= int(p[1]) <= 10**6 and 0 <= int(p[2]) <= 10**6
        else:
            assert p[0] == "GET" and len(p) == 2 and 0 <= int(p[1]) <= 10**6
            gets += 1
    assert gets >= 1

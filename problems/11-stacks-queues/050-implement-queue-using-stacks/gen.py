import random


def make(rng, q, lo=-10**9, hi=10**9, push_bias=0.5):
    ops, size = [], 0
    while len(ops) < q:
        r = rng.random()
        if size == 0 or r < push_bias * 0.6:
            ops.append(f"push {rng.randint(lo, hi)}")
            size += 1
        elif r < push_bias * 0.6 + 0.2:
            ops.append("pop")
            size -= 1
        elif r < push_bias * 0.6 + 0.3:
            ops.append("empty")
        else:
            ops.append("peek")
    if not any(o in ("peek", "empty") for o in ops):
        ops[-1] = "empty"
    return f"{len(ops)}\n" + "\n".join(ops)


def generate(rng: random.Random) -> list[str]:
    tests = ["1\nempty", "2\npush 5\npeek", "3\npush -1000000000\npop\nempty",
             "6\npush 1\npush 2\npush 3\npeek\npop\npeek",
             "7\npush 1\npop\npush 2\npush 3\npop\npeek\nempty"]
    for _ in range(30):
        tests.append(make(rng, rng.randint(1, 15), -20, 20, rng.random()))
    for _ in range(12):
        tests.append(make(rng, rng.randint(50, 2000), push_bias=rng.random()))
    tests.append(make(rng, 10**5, push_bias=0.5))
    tests.append(make(rng, 10**5, push_bias=0.9))
    n = 50000
    tests.append(f"{2 * n}\n" + "\n".join(f"push {i}" for i in range(n - 1)) + "\n" + "\n".join(["peek"] * (n + 1)))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    q = int(lines[0])
    assert 1 <= q <= 10**5 and len(lines) == q + 1
    size = 0
    for ln in lines[1:]:
        p = ln.split()
        if p[0] == "push":
            assert len(p) == 2 and -10**9 <= int(p[1]) <= 10**9
            size += 1
        else:
            assert len(p) == 1 and p[0] in ("pop", "peek", "empty")
            if p[0] != "empty":
                assert size > 0
            if p[0] == "pop":
                size -= 1

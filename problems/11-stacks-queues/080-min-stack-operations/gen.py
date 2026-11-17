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
            ops.append("top")
        else:
            ops.append("getMin")
    if not any(o in ("top", "getMin") for o in ops):
        if size == 0:
            ops[-1] = f"push {rng.randint(lo, hi)}"
        ops.append("getMin")
    return f"{len(ops)}\n" + "\n".join(ops)


def generate(rng: random.Random) -> list[str]:
    tests = ["8\npush 2\npush 1\npush 3\ngetMin\npop\ngetMin\npop\ngetMin",
             "2\npush 7\ngetMin", "3\npush 1000000000\ntop\ngetMin",
             "7\npush 3\npush 3\npush 3\npop\ngetMin\npop\ngetMin",
             "9\npush 5\npush 4\npush 3\npush 2\npop\ngetMin\npop\ngetMin\ntop"]
    for _ in range(28):
        tests.append(make(rng, rng.randint(1, 15), -5, 5, rng.random()))
    for _ in range(12):
        tests.append(make(rng, rng.randint(50, 3000), push_bias=rng.random()))
    tests.append(make(rng, 10**5, push_bias=0.5))
    tests.append(make(rng, 10**5, -3, 3, push_bias=0.7))
    n = 50000
    tests.append(f"{2 * n}\n" + "\n".join(f"push {n - i}" for i in range(n)) +
                 "\n" + "\n".join(["pop", "getMin"] * (n // 2 - 1)) + "\npop\ntop")
    tests.append(f"{2 * n}\n" + "\n".join(f"push {i}" for i in range(n)) + "\n" + "\n".join(["getMin"] * n))
    # large tests first so they are always among the 50 inputs that get used
    return tests[-4:] + tests[:-4]


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
            assert len(p) == 1 and p[0] in ("pop", "top", "getMin")
            assert size > 0
            if p[0] == "pop":
                size -= 1

import random


def grid(rng, r, c, p):
    return [''.join('1' if rng.random() < p else '0' for _ in range(c)) for _ in range(r)]


def fmt(g):
    return f"{len(g)} {len(g[0])}\n" + "\n".join(g)


def generate(rng: random.Random) -> list[str]:
    tests = [fmt(grid(rng, 500, 500, 0.9)), fmt(["1" * 500] * 500), fmt(grid(rng, 500, 500, 0.5)),
             fmt(grid(rng, 1, 500, 0.95)), fmt(grid(rng, 500, 1, 0.95))]
    tests += [fmt(["1"]), fmt(["0", "0"]), fmt(["01", "10"]), fmt(["111", "111"]), fmt(["1011", "1111", "0111"]),
              fmt(["0000"])]
    for _ in range(30):
        r, c = rng.randint(1, 6), rng.randint(1, 6)
        tests.append(fmt(grid(rng, r, c, rng.choice([0.3, 0.6, 0.85]))))
    for _ in range(12):
        r, c = rng.randint(10, 120), rng.randint(10, 120)
        tests.append(fmt(grid(rng, r, c, rng.choice([0.5, 0.8, 0.95]))))
    return tests


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    r, c = map(int, lines[0].split())
    assert 1 <= r <= 500 and 1 <= c <= 500 and r * c <= 250000
    assert len(lines) == r + 1
    for row in lines[1:]:
        assert len(row) == c and set(row) <= {"0", "1"}

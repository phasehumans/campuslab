import random


def path_word(rng, grid, m, n, length):
    """Read a word along a random self-avoiding path, so the answer is true."""
    r, c = rng.randrange(m), rng.randrange(n)
    seen = {(r, c)}
    word = grid[r][c]
    while len(word) < length:
        opts = [(r + dr, c + dc) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1))
                if 0 <= r + dr < m and 0 <= c + dc < n and (r + dr, c + dc) not in seen]
        if not opts:
            break
        r, c = rng.choice(opts)
        seen.add((r, c))
        word += grid[r][c]
    return word


def fmt(grid, word):
    return f"{len(grid)} {len(grid[0])}\n" + "\n".join(" ".join(row) for row in grid) + "\n" + word


def generate(rng: random.Random) -> list[str]:
    tests = [
        fmt([["a"]], "a"), fmt([["a"]], "b"), fmt([["a"]], "aa"),
        fmt([["A", "a"]], "Aa"), fmt([["A", "a"]], "AA"),
        fmt([["a"] * 6 for _ in range(6)], "a" * 15),
        fmt([["a"] * 6 for _ in range(6)], "a" * 14 + "b"),
        fmt([["a"] * 5 + ["b"]] + [["a"] * 6 for _ in range(5)], "a" * 14 + "b"),
        fmt([["A", "B"], ["D", "C"]], "ABCD"), fmt([["A", "B"], ["D", "C"]], "ABDC"),
    ]
    while len(tests) < 60:
        m, n = rng.randint(1, 6), rng.randint(1, 6)
        alpha = rng.choice(["ab", "abc", "ABCD", "aAbB", "abcdefghijklmnopqrstuvwxyz"])
        grid = [[rng.choice(alpha) for _ in range(n)] for _ in range(m)]
        length = rng.randint(1, 15)
        if rng.random() < 0.5:
            word = path_word(rng, grid, m, n, length)
        else:
            word = "".join(rng.choice(alpha) for _ in range(length))
        tests.append(fmt(grid, word))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    m, n = int(tok[0]), int(tok[1])
    assert 1 <= m <= 6 and 1 <= n <= 6
    assert len(tok) == 2 + m * n + 1
    for t in tok[2:2 + m * n]:
        assert len(t) == 1 and t.isalpha() and t.isascii()
    w = tok[-1]
    assert 1 <= len(w) <= 15 and w.isalpha() and w.isascii()

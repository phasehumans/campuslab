import random


def count_solutions(cells, limit=2):
    """Count solutions of a 81-cell board (0 = empty), stopping at `limit`."""
    board = list(cells)
    rows, cols, boxes = [0] * 9, [0] * 9, [0] * 9
    for i, v in enumerate(board):
        if v:
            r, c = divmod(i, 9)
            bit = 1 << v
            if rows[r] & bit or cols[c] & bit or boxes[r // 3 * 3 + c // 3] & bit:
                return 0
            rows[r] |= bit
            cols[c] |= bit
            boxes[r // 3 * 3 + c // 3] |= bit
    found = 0

    def rec():
        nonlocal found
        best, best_opts, best_cnt = -1, 0, 10
        for i in range(81):
            if board[i]:
                continue
            r, c = divmod(i, 9)
            opts = ~(rows[r] | cols[c] | boxes[r // 3 * 3 + c // 3]) & 0x3FE
            cnt = bin(opts).count("1")
            if cnt < best_cnt:
                best, best_opts, best_cnt = i, opts, cnt
                if cnt <= 1:
                    break
        if best == -1:
            found += 1
            return
        r, c = divmod(best, 9)
        b = r // 3 * 3 + c // 3
        for v in range(1, 10):
            bit = 1 << v
            if best_opts & bit:
                board[best] = v
                rows[r] |= bit
                cols[c] |= bit
                boxes[b] |= bit
                rec()
                board[best] = 0
                rows[r] ^= bit
                cols[c] ^= bit
                boxes[b] ^= bit
                if found >= limit:
                    return

    rec()
    return found


def random_full(rng):
    base = [[(3 * (r % 3) + r // 3 + c) % 9 + 1 for c in range(9)] for r in range(9)]
    digits = list(range(1, 10))
    rng.shuffle(digits)
    bands = rng.sample(range(3), 3)
    row_order = [b * 3 + i for b in bands for i in rng.sample(range(3), 3)]
    stacks = rng.sample(range(3), 3)
    col_order = [s * 3 + i for s in stacks for i in rng.sample(range(3), 3)]
    g = [digits[base[r][c] - 1] for r in row_order for c in col_order]
    if rng.random() < 0.5:  # transpose
        g = [g[c * 9 + r] for r in range(9) for c in range(9)]
    return g


def make_puzzle(rng, keep_min):
    g = random_full(rng)
    order = list(range(81))
    rng.shuffle(order)
    clues = 81
    for i in order:
        if clues <= keep_min:
            break
        v = g[i]
        g[i] = 0
        if count_solutions(g) != 1:
            g[i] = v
        else:
            clues -= 1
    return g


def fmt(g):
    return "\n".join(" ".join(str(v) if v else "." for v in g[r * 9:(r + 1) * 9]) for r in range(9))


def generate(rng: random.Random) -> list[str]:
    tests = []
    full = random_full(rng)
    tests.append(fmt(full))                          # already solved
    one = list(full); one[40] = 0
    tests.append(fmt(one))                           # single empty cell
    row = list(full)
    for c in range(9):
        row[c] = 0
    tests.append(fmt(row))                           # one empty row
    while len(tests) < 55:
        keep_min = rng.choice([17, 22, 26, 30, 36, 45, 60])
        tests.append(fmt(make_puzzle(rng, keep_min)))
    return tests


def validate(inp: str) -> None:
    tok = inp.split()
    assert len(tok) == 81
    assert all(t == "." or (len(t) == 1 and "1" <= t <= "9") for t in tok)
    lines = [ln for ln in inp.split("\n") if ln.strip()]
    assert len(lines) == 9 and all(len(ln.split()) == 9 for ln in lines)
    assert count_solutions([0 if t == "." else int(t) for t in tok]) == 1

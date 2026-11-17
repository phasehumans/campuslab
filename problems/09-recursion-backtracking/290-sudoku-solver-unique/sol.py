import sys


def main():
    tok = sys.stdin.read().split()
    board = [0 if t == "." else int(t) for t in tok[:81]]
    rows = [0] * 9
    cols = [0] * 9
    boxes = [0] * 9
    empty = []
    for i, v in enumerate(board):
        r, c = divmod(i, 9)
        if v:
            bit = 1 << v
            rows[r] |= bit
            cols[c] |= bit
            boxes[r // 3 * 3 + c // 3] |= bit
        else:
            empty.append(i)

    def solve():
        # pick the empty cell with the fewest candidates (minimum remaining values)
        best, best_opts, best_cnt = -1, 0, 10
        for i in empty:
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
            return True
        r, c = divmod(best, 9)
        b = r // 3 * 3 + c // 3
        for v in range(1, 10):
            bit = 1 << v
            if best_opts & bit:
                board[best] = v
                rows[r] |= bit
                cols[c] |= bit
                boxes[b] |= bit
                if solve():
                    return True
                board[best] = 0
                rows[r] ^= bit
                cols[c] ^= bit
                boxes[b] ^= bit
        return False

    solve()
    out = []
    for r in range(9):
        out.append(" ".join(str(v) for v in board[r * 9:(r + 1) * 9]))
    print("\n".join(out))


main()

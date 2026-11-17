import sys

sys.setrecursionlimit(10000)
R, C, r0, c0 = map(int, sys.stdin.read().split())
N = R * C
moves = []
for i in range(N):
    r, c = divmod(i, C)
    lst = []
    for dr, dc in ((1, 2), (2, 1), (-1, 2), (-2, 1), (1, -2), (2, -1), (-1, -2), (-2, -1)):
        rr, cc = r + dr, c + dc
        if 0 <= rr < R and 0 <= cc < C:
            lst.append(rr * C + cc)
    moves.append(lst)
FULL = (1 << N) - 1
dead = set()  # (cell, visited mask) states already known to fail


def tour(cell, mask):
    if mask == FULL:
        return True
    if (cell, mask) in dead:
        return False
    for nb in moves[cell]:
        if not (mask >> nb) & 1 and tour(nb, mask | (1 << nb)):
            return True
    dead.add((cell, mask))
    return False


start = r0 * C + c0
print("true" if tour(start, 1 << start) else "false")

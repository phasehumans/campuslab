import sys
from collections import Counter

d = list(map(int, sys.stdin.buffer.read().split()))
n, L, Q = d[0], d[1], d[2]
lamps = set()
for i in range(L):
    lamps.add((d[3 + 2 * i], d[4 + 2 * i]))
rows, cols, dg, ad = Counter(), Counter(), Counter(), Counter()
for r, c in lamps:
    rows[r] += 1; cols[c] += 1; dg[r - c] += 1; ad[r + c] += 1
out = []
base = 3 + 2 * L
for i in range(Q):
    r, c = d[base + 2 * i], d[base + 2 * i + 1]
    lit = rows[r] or cols[c] or dg[r - c] or ad[r + c]
    out.append("1" if lit else "0")
    for x in (r - 1, r, r + 1):
        for y in (c - 1, c, c + 1):
            if (x, y) in lamps:
                lamps.discard((x, y))
                rows[x] -= 1; cols[y] -= 1; dg[x - y] -= 1; ad[x + y] -= 1
print(" ".join(out))

import sys

data = sys.stdin.read().split()
n, m = int(data[0]), int(data[1])
g = [list(map(int, data[2 + i * m: 2 + (i + 1) * m])) for i in range(n)]
# best[j] = best sum of a path starting at (i, j) and ending in the last row (computed bottom-up)
best = g[n - 1][:]
for i in range(n - 2, -1, -1):
    nxt = []
    for j in range(m):
        cand = best[max(0, j - 1): min(m, j + 2)]
        nxt.append(g[i][j] + max(cand))
    best = nxt
print(max(best))

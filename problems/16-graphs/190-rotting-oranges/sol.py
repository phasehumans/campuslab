import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    r, c = d[0], d[1]
    g = [d[2 + i * c:2 + (i + 1) * c] for i in range(r)]
    INF = float("inf")
    # time[i][j] = minute the orange rots; relax repeatedly until nothing changes
    t = [[0 if g[i][j] == 2 else INF for j in range(c)] for i in range(r)]
    changed = True
    while changed:
        changed = False
        for i in range(r):
            for j in range(c):
                if g[i][j] != 1:
                    continue
                for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
                    if 0 <= x < r and 0 <= y < c and g[x][y] != 0 and t[x][y] + 1 < t[i][j]:
                        t[i][j] = t[x][y] + 1
                        changed = True
    ans = 0
    for i in range(r):
        for j in range(c):
            if g[i][j] == 1:
                ans = max(ans, t[i][j])
    print(-1 if ans == INF else ans)

main()

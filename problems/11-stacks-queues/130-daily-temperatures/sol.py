import sys

# temperatures are in [30, 100]: scan right to left remembering the
# nearest future day for every temperature value
data = sys.stdin.read().split()
n = int(data[0])
t = list(map(int, data[1:1 + n]))
INF = 1 << 30
nxt = [INF] * 102
res = [0] * n
for i in range(n - 1, -1, -1):
    best = INF
    for v in range(t[i] + 1, 101):
        if nxt[v] < best:
            best = nxt[v]
    res[i] = best - i if best < INF else 0
    nxt[t[i]] = i
print(" ".join(map(str, res)))

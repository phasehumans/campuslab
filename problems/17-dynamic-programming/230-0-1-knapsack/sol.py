import sys

data = sys.stdin.read().split()
n, W = int(data[0]), int(data[1])
val = list(map(int, data[2:2 + n]))
wt = list(map(int, data[2 + n:2 + 2 * n]))
# dp over items, rebuilding a fresh row per item (row i depends only on row i-1)
dp = [0] * (W + 1)
for v, w in zip(val, wt):
    if w > W:
        continue
    shifted = [a + v for a in dp[:W + 1 - w]]
    dp = dp[:w] + [a if a > b else b for a, b in zip(dp[w:], shifted)]
print(dp[W])

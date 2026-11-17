import sys
from bisect import bisect_right

# Keep a stack of prefix indices with strictly increasing prefix sums (a later, smaller prefix
# always dominates an earlier one). For each end i, binary-search the last stack entry j with
# P[j] <= P[i] - k.
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
a = d[2:2 + n]
idx = [0]
vals = [0]
p = 0
best = n + 1
for i in range(1, n + 1):
    p += a[i - 1]
    pos = bisect_right(vals, p - k)
    if pos:
        best = min(best, i - idx[pos - 1])
    while vals and vals[-1] >= p:
        vals.pop(); idx.pop()
    vals.append(p); idx.append(i)
print(best if best <= n else -1)

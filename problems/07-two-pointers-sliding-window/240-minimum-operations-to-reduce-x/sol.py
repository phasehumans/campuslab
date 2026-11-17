import sys

# Take l elements from the left and r from the right (l + r <= n). Suffix sums are strictly
# increasing (all values positive), so map each suffix sum to its length.
d = list(map(int, sys.stdin.read().split()))
n, x = d[0], d[1]
a = d[2:2 + n]
suf = {0: 0}
s = 0
for r in range(1, n + 1):
    s += a[n - r]
    suf[s] = r
best = -1
p = 0
for l in range(0, n + 1):
    if l:
        p += a[l - 1]
    if p > x:
        break
    r = suf.get(x - p)
    if r is not None and l + r <= n and (best == -1 or l + r < best):
        best = l + r
print(best)

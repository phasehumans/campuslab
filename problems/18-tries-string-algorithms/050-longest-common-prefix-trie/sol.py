import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
s = sorted(d[2:2 + n])
best = None
for i in range(n - k + 1):
    a, b = s[i], s[i + k - 1]
    m = min(len(a), len(b))
    j = 0
    while j < m and a[j] == b[j]:
        j += 1
    p = a[:j]
    if best is None or len(p) > len(best) or (len(p) == len(best) and p < best):
        best = p
print(best)

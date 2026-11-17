import sys

# Process lines from tallest to shortest. When line i is the shorter side, its best partner
# is the farthest line that is at least as tall: track min/max index among taller lines.
d = list(map(int, sys.stdin.read().split()))
n = d[0]
h = d[1:1 + n]
order = sorted(range(n), key=lambda i: -h[i])
lo, hi = n, -1
best = 0
for i in order:
    lo = min(lo, i)
    hi = max(hi, i)
    best = max(best, h[i] * max(i - lo, hi - i))
print(best)

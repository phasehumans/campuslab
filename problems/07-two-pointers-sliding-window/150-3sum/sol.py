import sys
from collections import Counter

d = list(map(int, sys.stdin.read().split()))
n = d[0]
cnt = Counter(d[1:1 + n])
vals = sorted(cnt)
out = []
for i, a in enumerate(vals):
    for b in vals[i:]:
        c = -a - b
        if c < b:
            break
        need = Counter((a, b, c))
        if all(cnt.get(v, 0) >= k for v, k in need.items()):
            out.append(f"{a} {b} {c}")
print("\n".join(out))

import sys
d = sys.stdin.read().split()
n = int(d[0]); prods = d[1:1 + n]; sw = d[1 + n]
cand = prods
out = []
for k in range(1, len(sw) + 1):
    pre = sw[:k]
    cand = [p for p in cand if p.startswith(pre)]
    out.append(" ".join(sorted(cand)[:3]) if len(cand) > 3 else " ".join(sorted(cand)))
print("\n".join(out))

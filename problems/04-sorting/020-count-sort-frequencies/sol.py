import sys
from collections import Counter

d = sys.stdin.read().split()
n = int(d[0])
c = Counter(map(int, d[1:1 + n]))
print("\n".join(f"{k} {c[k]}" for k in sorted(c)))

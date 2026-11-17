import sys
from collections import Counter

d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
c = Counter(map(int, d[2:2 + n]))
order = sorted(c.items(), key=lambda p: (-p[1], -p[0]))
print(" ".join(str(v) for v, _ in order[:k]))

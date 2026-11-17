import sys
from collections import Counter

d = list(map(int, sys.stdin.read().split()))
n = d[0]
A, B, C, D = (d[1 + k * n:1 + (k + 1) * n] for k in range(4))
ab = Counter(x + y for x in A for y in B)
cd = Counter(x + y for x in C for y in D)
print(sum(c * cd.get(-s, 0) for s, c in ab.items()))

import heapq
import sys
from math import isqrt

d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
h = [-int(x) for x in d[2:2 + n]]
heapq.heapify(h)
for _ in range(k):
    top = -h[0]
    if top == 1:
        break
    heapq.heapreplace(h, -isqrt(top))
print(-sum(h))

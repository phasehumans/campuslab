import sys
import heapq

d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
a = d[2:2 + n]
heap = []
out = []
for i, x in enumerate(a):
    heapq.heappush(heap, (-x, i))
    if i >= k - 1:
        while heap[0][1] <= i - k:
            heapq.heappop(heap)
        out.append(-heap[0][0])
print(" ".join(map(str, out)))

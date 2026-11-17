import heapq
import sys

# Min-heap of locked projects keyed by capital, max-heap of affordable profits.
tok = list(map(int, sys.stdin.read().split()))
n, k, w = tok[0], tok[1], tok[2]
p = tok[3:3 + n]
c = tok[3 + n:3 + 2 * n]
locked = list(zip(c, p))
heapq.heapify(locked)
avail = []
for _ in range(k):
    while locked and locked[0][0] <= w:
        heapq.heappush(avail, -heapq.heappop(locked)[1])
    if not avail:
        break
    w -= heapq.heappop(avail)
print(w)

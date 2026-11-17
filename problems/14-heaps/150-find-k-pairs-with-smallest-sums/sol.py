import heapq
import sys

# Walk "columns" instead of rows: seed one candidate per element of nums2 (paired with nums1[0])
# and advance along nums1. Ties are broken by (sum, u, v) as the statement requires.
tok = list(map(int, sys.stdin.read().split()))
n1, n2 = tok[0], tok[1]
a = tok[2:2 + n1]
b = tok[2 + n1:2 + n1 + n2]
k = tok[2 + n1 + n2]
h = [(a[0] + b[j], a[0], b[j], 0, j) for j in range(min(n2, k))]
heapq.heapify(h)
out = []
while h and len(out) < k:
    s, u, v, i, j = heapq.heappop(h)
    out.append(f"{u} {v}")
    if i + 1 < n1:
        heapq.heappush(h, (a[i + 1] + b[j], a[i + 1], b[j], i + 1, j))
print("\n".join(out))

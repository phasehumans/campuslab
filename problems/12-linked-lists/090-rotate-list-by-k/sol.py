import sys
from collections import deque
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
q = deque(d[2:2 + n])
q.rotate(k % n)
print(" ".join(q))

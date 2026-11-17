import sys
from collections import deque

# Two-queue Huffman: sorted originals + merged ropes (merged sums are produced in non-decreasing order).
d = sys.stdin.read().split()
n = int(d[0])
a = deque(sorted(map(int, d[1:1 + n])))
b = deque()


def take():
    if not b or (a and a[0] <= b[0]):
        return a.popleft()
    return b.popleft()


total = 0
while len(a) + len(b) > 1:
    s = take() + take()
    total += s
    b.append(s)
print(total)

import sys
from bisect import insort

# Keep the k largest values seen so far in a sorted list; the k-th largest is its first element.
d = sys.stdin.read().split()
k, n = int(d[0]), int(d[1])
a = list(map(int, d[2:2 + n]))
top = sorted(a[:k])
out = [top[0]]
for x in a[k:]:
    if x > top[0]:
        top.pop(0)
        insort(top, x)
    out.append(top[0])
print(" ".join(map(str, out)))

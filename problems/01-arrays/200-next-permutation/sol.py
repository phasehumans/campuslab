import sys
from bisect import bisect_right

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
# longest non-increasing suffix starts at i
i = n - 1
while i > 0 and a[i - 1] >= a[i]:
    i -= 1
if i == 0:
    a.sort()
else:
    p = i - 1
    suffix = sorted(a[i:])
    j = bisect_right(suffix, a[p])  # smallest element strictly greater than pivot
    bigger = suffix.pop(j)
    suffix.append(a[p])
    suffix.sort()
    a = a[:p] + [bigger] + suffix
print(" ".join(map(str, a)))

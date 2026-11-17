import sys
from math import gcd, isqrt
from collections import Counter

d = list(map(int, sys.stdin.read().split()))
n = d[0]
pts = list(zip(d[1::2], d[2::2]))
if n == 1:
    print(1)
    sys.exit()
# every pair of points defines a line a*x + b*y = c (normalised);
# a line through m points is hit by m*(m-1)/2 pairs.
lines = Counter()
for i in range(n):
    x1, y1 = pts[i]
    for j in range(i + 1, n):
        x2, y2 = pts[j]
        a, b = y2 - y1, x1 - x2
        g = gcd(a, b)
        a //= g; b //= g
        if a < 0 or (a == 0 and b < 0):
            a, b = -a, -b
        lines[(a, b, a * x1 + b * y1)] += 1
p = max(lines.values())
m = (1 + isqrt(1 + 8 * p)) // 2
print(m)

import sys

# Count the maximum number of disjoint pairs: match each light person (ascending) with the
# heaviest still-unmatched partner it can share with; every pair saves one boat.
d = list(map(int, sys.stdin.read().split()))
n, lim = d[0], d[1]
w = sorted(d[2:2 + n])
pairs = 0
hi = n - 1
lo = 0
while lo < hi:
    while hi > lo and w[lo] + w[hi] > lim:
        hi -= 1
    if hi <= lo:
        break
    pairs += 1
    lo += 1
    hi -= 1
print(n - pairs)

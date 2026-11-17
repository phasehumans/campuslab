import sys

d = list(map(int, sys.stdin.read().split()))
n, t = d[0], d[1]
a = d[2:2 + n]
first = {}
for i, x in enumerate(a):
    if t - x in first:
        print(first[t - x] + 1, i + 1)
        break
    first.setdefault(x, i)

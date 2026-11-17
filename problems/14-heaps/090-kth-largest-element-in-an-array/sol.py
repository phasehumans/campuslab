import sys

d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
a = sorted(map(int, d[2:2 + n]), reverse=True)
print(a[k - 1])

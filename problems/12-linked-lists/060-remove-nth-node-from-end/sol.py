import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
a = d[2:2 + n]
del a[n - k]
print(" ".join(a))

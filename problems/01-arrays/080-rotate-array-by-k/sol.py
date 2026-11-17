import sys

data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
a = data[2:2 + n]
k %= n
b = a[n - k:] + a[:n - k]
print(" ".join(b))

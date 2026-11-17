import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
a = d[2:2 + n]
out = []
full = n - n % k
for i in range(0, full, k):
    out.extend(reversed(a[i:i + k]))
out.extend(a[full:])
print(" ".join(out))

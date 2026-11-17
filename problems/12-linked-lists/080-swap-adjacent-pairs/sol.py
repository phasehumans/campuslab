import sys
d = sys.stdin.read().split()
n = int(d[0])
a = d[1:1 + n]
out = []
for i in range(0, n, 2):
    out.extend(a[i:i + 2][::-1])
print(" ".join(out))

import sys
d = sys.stdin.read().split()
n = int(d[0]); s = d[1:1 + n]
a, b = min(s), max(s)
k = 0
while k < len(a) and a[k] == b[k]:
    k += 1
print(a[:k])

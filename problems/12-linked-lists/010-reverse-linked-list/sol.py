import sys
d = sys.stdin.read().split()
n = int(d[0])
a = d[1:1 + n]
print(" ".join(a[::-1]))

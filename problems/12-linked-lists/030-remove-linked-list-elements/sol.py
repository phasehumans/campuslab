import sys
d = sys.stdin.read().split()
n, val = int(d[0]), int(d[1])
print(" ".join(x for x in d[2:2 + n] if int(x) != val))

import sys

d = list(map(int, sys.stdin.read().split()))
n, v = d[0], d[1]
rest = sorted(x for x in d[2:2 + n] if x != v)
print(len(rest))
print(" ".join(map(str, rest)))

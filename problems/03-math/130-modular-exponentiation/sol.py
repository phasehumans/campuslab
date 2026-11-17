import sys

x, n, m = map(int, sys.stdin.read().split()[:3])
print(pow(x, n, m))

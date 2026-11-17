import sys

tok = list(map(int, sys.stdin.read().split()))
n, k = tok[0], tok[1]
print(sorted(tok[2:2 + n * n])[k - 1])

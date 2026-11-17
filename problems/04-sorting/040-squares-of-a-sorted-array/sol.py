import sys

d = sys.stdin.read().split()
n = int(d[0])
print(" ".join(map(str, sorted(int(x) * int(x) for x in d[1:1 + n]))))

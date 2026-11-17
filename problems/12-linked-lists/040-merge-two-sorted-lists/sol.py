import sys
d = sys.stdin.read().split()
n1, n2 = int(d[0]), int(d[1])
a = [int(x) for x in d[2:2 + n1 + n2]]
print(" ".join(map(str, sorted(a))))

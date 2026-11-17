import sys

data = sys.stdin.read().split()
n = int(data[0])
a = data[1:1 + n]
nz = [x for x in a if int(x) != 0]
print(" ".join(nz + ["0"] * (n - len(nz))))

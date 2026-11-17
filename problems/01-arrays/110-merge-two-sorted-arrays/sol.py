import sys

data = sys.stdin.read().split()
n, m = int(data[0]), int(data[1])
vals = list(map(int, data[2:2 + n + m]))
print(" ".join(map(str, sorted(vals))))

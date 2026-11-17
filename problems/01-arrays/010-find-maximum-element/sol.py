import sys

data = sys.stdin.read().split()
n = int(data[0])
best = None
for x in data[1:1 + n]:
    v = int(x)
    if best is None or v > best:
        best = v
print(best)

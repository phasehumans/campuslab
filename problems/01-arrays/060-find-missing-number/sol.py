import sys

data = sys.stdin.read().split()
n = int(data[0])
seen = [False] * (n + 1)
for x in data[1:1 + n]:
    seen[int(x)] = True
print(seen.index(False))

import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
res = [-1] * n
pending = []  # indices still waiting for a greater element (values non-increasing)
for i, x in enumerate(a):
    while pending and a[pending[-1]] < x:
        res[pending.pop()] = x
    pending.append(i)
print(" ".join(map(str, res)))

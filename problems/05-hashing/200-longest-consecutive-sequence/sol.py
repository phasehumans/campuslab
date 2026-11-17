import sys

d = sys.stdin.read().split()
n = int(d[0])
a = sorted(set(map(int, d[1:n + 1])))
best = cur = 0
for i, x in enumerate(a):
    cur = cur + 1 if i and x == a[i - 1] + 1 else 1
    best = max(best, cur)
print(best)

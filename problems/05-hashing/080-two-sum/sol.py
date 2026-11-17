import sys

d = sys.stdin.read().split()
n, t = int(d[0]), int(d[1])
a = list(map(int, d[2:2 + n]))
order = sorted(range(n), key=lambda i: a[i])
l, r = 0, n - 1
while l < r:
    s = a[order[l]] + a[order[r]]
    if s == t:
        i, j = sorted((order[l], order[r]))
        print(i + 1, j + 1)
        break
    if s < t:
        l += 1
    else:
        r -= 1

import sys

d = list(map(int, sys.stdin.read().split()))
n = d[0]
h = d[1:1 + n]
left = [0] * n
right = [0] * n
m = 0
for i in range(n):
    m = max(m, h[i]); left[i] = m
m = 0
for i in range(n - 1, -1, -1):
    m = max(m, h[i]); right[i] = m
print(sum(min(left[i], right[i]) - h[i] for i in range(n)))

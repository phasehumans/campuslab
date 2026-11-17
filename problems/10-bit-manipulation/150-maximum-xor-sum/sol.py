import sys

data = sys.stdin.buffer.read().split()
n = int(data[0])
basis = []  # kept sorted in decreasing order, distinct highest bits
for tok in data[1:n + 1]:
    x = int(tok)
    for v in basis:
        y = x ^ v
        if y < x:
            x = y
    if x:
        basis.append(x)
        basis.sort(reverse=True)
ans = 0
for v in basis:
    if ans ^ v > ans:
        ans ^= v
print(ans)

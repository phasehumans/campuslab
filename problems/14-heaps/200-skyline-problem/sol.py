import sys

# Coordinate compression + painting: process buildings from tallest to shortest and
# assign each elementary segment the first (= tallest) height that covers it, using a
# "next unpainted segment" union-find so every segment is painted once.
tok = list(map(int, sys.stdin.read().split()))
n = tok[0]
bs = [tuple(tok[1 + 3 * i:4 + 3 * i]) for i in range(n)]
xs = sorted({v for l, r, _ in bs for v in (l, r)})
idx = {x: i for i, x in enumerate(xs)}
m = len(xs)
height = [0] * m          # height of segment [xs[i], xs[i+1])
nxt = list(range(m + 1))  # nxt[i] = first unpainted segment >= i


def find(i):
    root = i
    while nxt[root] != root:
        root = nxt[root]
    while nxt[i] != root:
        nxt[i], i = root, nxt[i]
    return root


for l, r, h in sorted(bs, key=lambda b: -b[2]):
    a, b = idx[l], idx[r]
    i = find(a)
    while i < b:
        height[i] = h
        nxt[i] = i + 1
        i = find(i + 1)

out = []
prev = 0
for i in range(m):
    if height[i] != prev:
        out.append(f"{xs[i]} {height[i]}")
        prev = height[i]
print("\n".join(out))

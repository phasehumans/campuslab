import sys

d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
v = list(map(int, d[2:2 + 2 * n]))
pts = sorted(((v[2 * i] ** 2 + v[2 * i + 1] ** 2, v[2 * i], v[2 * i + 1]) for i in range(n)))
print("\n".join(f"{x} {y}" for _, x, y in pts[:k]))

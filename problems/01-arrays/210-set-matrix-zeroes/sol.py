import sys

data = sys.stdin.read().split()
r, c = int(data[0]), int(data[1])
vals = data[2:2 + r * c]
m = [vals[i * c:(i + 1) * c] for i in range(r)]
zr = {i for i in range(r) for j in range(c) if int(m[i][j]) == 0}
zc = {j for i in range(r) for j in range(c) if int(m[i][j]) == 0}
out = []
for i in range(r):
    out.append(" ".join("0" if (i in zr or j in zc) else str(int(m[i][j])) for j in range(c)))
print("\n".join(out))

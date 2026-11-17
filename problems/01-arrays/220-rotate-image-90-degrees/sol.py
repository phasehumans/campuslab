import sys

data = sys.stdin.read().split()
n = int(data[0])
v = list(map(int, data[1:1 + n * n]))
m = [v[i * n:(i + 1) * n] for i in range(n)]
# new[i][j] = old[n-1-j][i]
for i in range(n):
    print(" ".join(str(m[n - 1 - j][i]) for j in range(n)))

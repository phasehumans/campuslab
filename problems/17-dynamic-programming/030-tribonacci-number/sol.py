import sys

MOD = 10**9 + 7


def mat_mul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) % MOD for j in range(3)] for i in range(3)]


n = int(sys.stdin.read().split()[0])
if n == 0:
    print(0)
else:
    # state (T(i+2), T(i+1), T(i)); start at i = 0: (1, 1, 0)
    res = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    base = [[1, 1, 1], [1, 0, 0], [0, 1, 0]]
    e = n
    while e:
        if e & 1:
            res = mat_mul(res, base)
        base = mat_mul(base, base)
        e >>= 1
    # res * (T2, T1, T0) = (T(n+2), T(n+1), T(n))
    v = (1, 1, 0)
    print(sum(res[2][k] * v[k] for k in range(3)) % MOD)

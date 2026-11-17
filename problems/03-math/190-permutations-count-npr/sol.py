import sys

MOD = 10**9 + 7
n, r = map(int, sys.stdin.read().split()[:2])
if r > n:
    print(0)
else:
    f = [1] * (n + 1)
    for i in range(1, n + 1):
        f[i] = f[i - 1] * i % MOD
    print(f[n] * pow(f[n - r], MOD - 2, MOD) % MOD)

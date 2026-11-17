import sys

MOD = 10**9 + 7
n, r = map(int, sys.stdin.read().split()[:2])
if r > n:
    print(0)
else:
    r = min(r, n - r)
    num = den = 1
    for i in range(r):
        num = num * (n - i) % MOD
        den = den * (i + 1) % MOD
    print(num * pow(den, MOD - 2, MOD) % MOD)

import sys

MOD = 10**9 + 7
m, n = map(int, sys.stdin.read().split()[:2])
# choose which of the (m-1)+(n-1) moves are "down": C(m+n-2, m-1)
num = den = 1
for i in range(1, m):
    num = num * (n - 1 + i) % MOD
    den = den * i % MOD
print(num * pow(den, MOD - 2, MOD) % MOD)

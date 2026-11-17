import sys

MOD = 10**9 + 7


def fib_pair(n):
    # fast doubling: returns (F(n), F(n+1)) mod MOD
    if n == 0:
        return 0, 1
    a, b = fib_pair(n >> 1)
    c = a * ((2 * b - a) % MOD) % MOD
    d = (a * a + b * b) % MOD
    if n & 1:
        return d, (c + d) % MOD
    return c, d


n = int(sys.stdin.read().split()[0])
print(fib_pair(n)[0])

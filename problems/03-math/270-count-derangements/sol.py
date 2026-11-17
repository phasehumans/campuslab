import sys

MOD = 10**9 + 7
n = int(sys.stdin.read().split()[0])
# D(i) = i * D(i-1) + (-1)^i, D(0) = 1
d = 1
for i in range(1, n + 1):
    d = (i * d + (1 if i % 2 == 0 else -1)) % MOD
print(d)

import sys

G, L = map(int, sys.stdin.read().split()[:2])
if L % G:
    print(0)
else:
    d = L // G
    # count ordered (x, y) with x * y = d and gcd(x, y) = 1: enumerate divisors x of d
    from math import gcd
    cnt = 0
    i = 1
    while i * i <= d:
        if d % i == 0:
            j = d // i
            if gcd(i, j) == 1:
                cnt += 1 if i == j else 2
        i += 1
    print(cnt)

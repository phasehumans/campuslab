import sys
from fractions import Fraction

n = int(sys.stdin.read().split()[0])
# phi(n) = n * prod (1 - 1/p) computed exactly with fractions
primes = []
m = n
d = 2
while d * d <= m:
    if m % d == 0:
        primes.append(d)
        while m % d == 0:
            m //= d
    d += 1
if m > 1:
    primes.append(m)
val = Fraction(n)
for p in primes:
    val *= Fraction(p - 1, p)
print(int(val))

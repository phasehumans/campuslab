import sys
from math import gcd

a, m = map(int, sys.stdin.read().split()[:2])
if m == 1 or gcd(a, m) != 1:
    print(-1)
else:
    print(pow(a, -1, m))

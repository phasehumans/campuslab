import sys
from math import gcd, lcm

a, b = map(int, sys.stdin.read().split()[:2])
print(gcd(a, b), lcm(a, b))

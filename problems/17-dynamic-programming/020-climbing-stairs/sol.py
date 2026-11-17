import sys
from math import comb

n = int(sys.stdin.read().split()[0])
# choose how many 2-steps are used: k twos and n-2k ones, arranged in any order
print(sum(comb(n - k, k) for k in range(n // 2 + 1)))

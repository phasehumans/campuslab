import sys
from collections import Counter

d = sys.stdin.read().split()
n = int(d[0])
c = list(Counter(d[1:n + 1]).values())
print("true" if len(c) == len(set(c)) else "false")

import sys
from collections import Counter
d = sys.stdin.read().split()
n = int(d[0])
a = [int(v) for v in d[1:1 + n]]
c = Counter(a)
print(" ".join(str(v) for v in a if c[v] == 1))

import sys
from collections import Counter

data = sys.stdin.read().split()
n = int(data[0])
c = Counter(data[1:n + 1])
print(next(int(k) for k, v in c.items() if v == 1))

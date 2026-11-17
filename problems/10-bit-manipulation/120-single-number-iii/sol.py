import sys
from collections import Counter

data = sys.stdin.read().split()
n = int(data[0])
c = Counter(map(int, data[1:n + 1]))
print(*sorted(k for k, v in c.items() if v == 1))

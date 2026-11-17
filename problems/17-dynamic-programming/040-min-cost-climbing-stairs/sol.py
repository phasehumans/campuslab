import sys
from functools import lru_cache

data = sys.stdin.read().split()
n = int(data[0])
cost = list(map(int, data[1:1 + n]))
# best[i] = minimum cost to stand on step i having paid for it, going forward from the top
best = [0] * (n + 2)
for i in range(n - 1, -1, -1):
    best[i] = cost[i] + min(best[i + 1], best[i + 2])
print(min(best[0], best[1]))

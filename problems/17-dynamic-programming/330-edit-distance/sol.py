import sys
from functools import lru_cache

raw = sys.stdin.read().split("\n")
a = raw[0].strip("\r") if len(raw) > 0 else ""
b = raw[1].strip("\r") if len(raw) > 1 else ""
m, n = len(a), len(b)
sys.setrecursionlimit(10000)


# column-by-column over b, iterating diagonals is overkill; use a top-down memo on suffixes
@lru_cache(maxsize=None)
def go(i, j):
    # minimum operations to turn a[i:] into b[j:]
    if i == m:
        return n - j
    if j == n:
        return m - i
    if a[i] == b[j]:
        return go(i + 1, j + 1)
    return 1 + min(go(i + 1, j), go(i, j + 1), go(i + 1, j + 1))


# fill from the end so recursion depth stays small
for i in range(m, -1, -1):
    for j in range(n, -1, -1):
        go(i, j)
print(go(0, 0))

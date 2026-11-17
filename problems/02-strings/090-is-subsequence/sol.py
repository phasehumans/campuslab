import sys
from bisect import bisect_right

s, t = sys.stdin.read().split()[:2]
pos = {}
for i, c in enumerate(t):
    pos.setdefault(c, []).append(i)
cur = -1
ok = True
for c in s:
    lst = pos.get(c)
    if not lst:
        ok = False
        break
    k = bisect_right(lst, cur)
    if k == len(lst):
        ok = False
        break
    cur = lst[k]
print("true" if ok else "false")

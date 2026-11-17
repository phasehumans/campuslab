import sys
from collections import Counter

d = sys.stdin.read().split()
s, t = d[0], d[1]
need = Counter(t)
missing = len(t)
best = None
left = 0
for right, ch in enumerate(s):
    if need[ch] > 0:
        missing -= 1
    need[ch] -= 1
    if missing == 0:
        while need[s[left]] < 0:
            need[s[left]] += 1
            left += 1
        if best is None or right - left + 1 < best[1] - best[0]:
            best = (left, right + 1)
        need[s[left]] += 1
        missing += 1
        left += 1
print(s[best[0]:best[1]])

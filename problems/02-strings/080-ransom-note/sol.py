import sys
from collections import Counter

r, m = sys.stdin.read().split()[:2]
need = Counter(r)
have = Counter(m)
print("true" if all(have[c] >= k for c, k in need.items()) else "false")

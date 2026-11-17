from collections import Counter
from math import factorial

s = input().strip()
ans = factorial(len(s))
for c in Counter(s).values():
    ans //= factorial(c)
print(ans)

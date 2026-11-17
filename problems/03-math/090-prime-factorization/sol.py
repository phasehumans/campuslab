import sys
from collections import Counter

n = int(sys.stdin.read().split()[0])
cnt = Counter()
m = n
for p in [2, 3]:
    while m % p == 0:
        cnt[p] += 1
        m //= p
p = 5
while p * p <= m:
    for q in (p, p + 2):  # 6k-1 and 6k+1
        while m % q == 0:
            cnt[q] += 1
            m //= q
    p += 6
if m > 1:
    cnt[m] += 1
print(" ".join(f"{p}^{e}" for p, e in sorted(cnt.items())))

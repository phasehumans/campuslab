import sys
from math import isqrt

L, R = map(int, sys.stdin.read().split()[:2])
lim = isqrt(R)
small = bytearray([1]) * (lim + 1)
small[0:2] = b"\x00\x00"[: min(2, lim + 1)]
for i in range(2, isqrt(lim) + 1):
    if small[i]:
        small[i * i::i] = bytearray(len(range(i * i, lim + 1, i)))
seg = bytearray([1]) * (R - L + 1)
for p in range(2, lim + 1):
    if small[p]:
        start = max(p * p, (L + p - 1) // p * p)
        if start <= R:
            seg[start - L::p] = bytearray(len(range(start - L, R - L + 1, p)))
cnt = seg.count(1)
if L == 1:
    cnt -= 1
print(cnt)

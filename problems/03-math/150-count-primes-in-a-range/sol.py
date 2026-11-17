import sys

L, R = map(int, sys.stdin.read().split()[:2])
s = bytearray([1]) * (R + 1)
s[0] = 0
if R >= 1:
    s[1] = 0
i = 2
while i * i <= R:
    if s[i]:
        s[i * i::i] = bytearray(len(range(i * i, R + 1, i)))
    i += 1
print(s[L:R + 1].count(1))

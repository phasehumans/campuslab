import sys

data = sys.stdin.read().split()
a, b = data[0], data[1]
# bit-parallel LCS (Allison-Dix / Hyyro): one big integer per row of `a`
m = len(b)
masks = {}
for j, ch in enumerate(b):
    masks[ch] = masks.get(ch, 0) | (1 << j)
full = (1 << m) - 1
row = 0
for ch in a:
    x = masks.get(ch, 0) | row
    y = (row << 1) | 1
    row = x & ((x - y) ^ x) & full
print(bin(row).count("1"))

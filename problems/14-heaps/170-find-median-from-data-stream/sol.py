import sys
from bisect import insort

# Sorted list with binary insertion (n <= 10^5, list insert is a fast memmove).
d = sys.stdin.read().split()
n = int(d[0])
s = []
out = []
for x in map(int, d[1:1 + n]):
    insort(s, x)
    m = len(s)
    if m % 2:
        out.append(str(s[m // 2]))
    else:
        tot = s[m // 2 - 1] + s[m // 2]
        if tot % 2 == 0:
            out.append(str(tot // 2))
        else:
            out.append(("-" if tot < 0 else "") + str(abs(tot) // 2) + ".5")
print(" ".join(out))

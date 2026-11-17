import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
total = sum(a)
# bit s of `reach` is set when some subset sums to s
reach = 1
for x in a:
    reach |= reach << x
print("true" if total % 2 == 0 and (reach >> (total // 2)) & 1 else "false")

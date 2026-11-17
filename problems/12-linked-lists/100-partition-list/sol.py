import sys
d = sys.stdin.read().split()
n, x = int(d[0]), int(d[1])
a = [int(v) for v in d[2:2 + n]]
# stable sort by the key "is >= x"
a.sort(key=lambda v: v >= x)
print(" ".join(map(str, a)))

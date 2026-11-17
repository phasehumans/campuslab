import sys

data = sys.stdin.read().split()
n = int(data[0])
a = data[1:1 + n]
out = []
i = n - 1
while i >= 0:
    out.append(a[i])
    i -= 1
print(" ".join(str(int(x)) for x in out))

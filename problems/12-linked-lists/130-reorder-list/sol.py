import sys
d = sys.stdin.read().split()
n = int(d[0])
a = d[1:1 + n]
out = []
i, j = 0, n - 1
while i <= j:
    out.append(a[i])
    if i != j:
        out.append(a[j])
    i += 1
    j -= 1
print(" ".join(out))

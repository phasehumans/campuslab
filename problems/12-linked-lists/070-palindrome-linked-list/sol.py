import sys
d = sys.stdin.read().split()
n = int(d[0])
a = d[1:1 + n]
i, j = 0, n - 1
ok = 1
while i < j:
    if int(a[i]) != int(a[j]):
        ok = 0
        break
    i += 1
    j -= 1
print(ok)

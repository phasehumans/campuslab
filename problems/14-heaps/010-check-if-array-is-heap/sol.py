import sys

d = sys.stdin.read().split()
n = int(d[0])
a = list(map(int, d[1:1 + n]))
ok = all(a[(i - 1) // 2] >= a[i] for i in range(1, n))
print("true" if ok else "false")

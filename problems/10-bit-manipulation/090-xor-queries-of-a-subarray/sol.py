import sys

data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
a = data[2:2 + n]
pre = [0] * (n + 1)
for i in range(n):
    pre[i + 1] = pre[i] ^ int(a[i])
out = []
p = 2 + n
for _ in range(q):
    l, r = int(data[p]), int(data[p + 1])
    p += 2
    out.append(pre[r + 1] ^ pre[l])
print("\n".join(map(str, out)))

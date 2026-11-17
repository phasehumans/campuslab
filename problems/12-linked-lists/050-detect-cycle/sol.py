import sys
d = sys.stdin.read().split()
n, pos = int(d[0]), int(d[1])
nxt = [i + 1 if i + 1 < n else pos for i in range(n)]
seen = set()
cur = 0 if n > 0 else -1
ans = 0
while cur != -1:
    if cur in seen:
        ans = 1
        break
    seen.add(cur)
    cur = nxt[cur]
print(ans)

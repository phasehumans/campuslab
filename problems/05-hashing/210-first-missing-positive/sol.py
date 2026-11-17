import sys

d = sys.stdin.read().split()
n = int(d[0])
s = set(map(int, d[1:n + 1]))
ans = 1
while ans in s:
    ans += 1
print(ans)

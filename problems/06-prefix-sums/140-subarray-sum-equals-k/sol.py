import sys

data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
a = list(map(int, data[2:2 + n]))
if n <= 1500:
    cnt = 0
    for i in range(n):
        s = 0
        for j in range(i, n):
            s += a[j]
            if s == k:
                cnt += 1
    print(cnt)
else:
    seen = {0: 1}
    s = 0
    cnt = 0
    for x in a:
        s += x
        cnt += seen.get(s - k, 0)
        seen[s] = seen.get(s, 0) + 1
    print(cnt)

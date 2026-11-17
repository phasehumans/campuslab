import sys

# counting approach: bucket citations capped at n, then scan h from n down
d = sys.stdin.read().split()
n = int(d[0])
cnt = [0] * (n + 1)
for x in d[1:1 + n]:
    cnt[min(int(x), n)] += 1
at_least = 0
for h in range(n, -1, -1):
    at_least += cnt[h]
    if at_least >= h:
        print(h)
        break

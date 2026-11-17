import sys
d = sys.stdin.read().split()
n = int(d[0])
# counting sort over the small value range
cnt = [0] * 200001
for v in d[1:1 + n]:
    cnt[int(v) + 100000] += 1
out = []
for i, c in enumerate(cnt):
    if c:
        out.extend([str(i - 100000)] * c)
print(" ".join(out))

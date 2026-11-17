import sys

d = sys.stdin.read().split()
n = int(d[0])
cnt = [0, 0, 0]
for x in d[1:1 + n]:
    cnt[int(x)] += 1
print(" ".join(["0"] * cnt[0] + ["1"] * cnt[1] + ["2"] * cnt[2]))

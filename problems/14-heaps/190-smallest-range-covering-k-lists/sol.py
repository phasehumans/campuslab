import sys

# Sliding window over all values merged and sorted, tagged with their list id.
tok = list(map(int, sys.stdin.read().split()))
k = tok[0]
pos = 1
items = []
for li in range(k):
    m = tok[pos]
    for x in tok[pos + 1:pos + 1 + m]:
        items.append((x, li))
    pos += 1 + m
items.sort()
cnt = [0] * k
covered = 0
best = None
lo = 0
for hi in range(len(items)):
    l = items[hi][1]
    cnt[l] += 1
    if cnt[l] == 1:
        covered += 1
    while covered == k:
        a, b = items[lo][0], items[hi][0]
        if best is None or (b - a, a) < (best[1] - best[0], best[0]):
            best = (a, b)
        ll = items[lo][1]
        cnt[ll] -= 1
        if cnt[ll] == 0:
            covered -= 1
        lo += 1
print(best[0], best[1])

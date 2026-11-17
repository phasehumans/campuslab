import sys

# Counting approach: weights are at most 1000, so keep a count per weight
# and always take from the largest non-empty bucket.
d = sys.stdin.read().split()
n = int(d[0])
cnt = [0] * 1001
for x in d[1:1 + n]:
    cnt[int(x)] += 1
w = 1000
left = None  # a stone pulled out waiting for a partner
while True:
    while w > 0 and cnt[w] == 0:
        w -= 1
    if w == 0:
        break
    if left is None:
        cnt[w] -= 1
        left = w
    else:
        y = left
        x = w
        cnt[w] -= 1
        left = None
        if y > x:
            cnt[y - x] += 1
            # y - x < y; new largest may still be <= w, but buckets above w are empty
            if y - x > w:
                w = y - x
print(left if left is not None else 0)

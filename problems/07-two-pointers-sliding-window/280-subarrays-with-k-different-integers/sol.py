import sys

# For each right end r, the good left ends form a range [far, near): `far` is the smallest
# left with at most k distinct values, `near` the smallest left with at most k - 1.
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
a = d[2:2 + n]
c1 = [0] * (n + 1); d1 = 0; far = 0
c2 = [0] * (n + 1); d2 = 0; near = 0
ans = 0
for r, x in enumerate(a):
    if c1[x] == 0:
        d1 += 1
    c1[x] += 1
    if c2[x] == 0:
        d2 += 1
    c2[x] += 1
    while d1 > k:
        c1[a[far]] -= 1
        if c1[a[far]] == 0:
            d1 -= 1
        far += 1
    while d2 > k - 1:
        c2[a[near]] -= 1
        if c2[a[near]] == 0:
            d2 -= 1
        near += 1
    ans += near - far
print(ans)

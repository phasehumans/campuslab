import sys

# Track the last two types seen and the length of the trailing run of the latest type.
d = list(map(int, sys.stdin.read().split()))
n = d[0]
a = d[1:1 + n]
best = cur = run = 0
last = second = None
for x in a:
    if x == last or x == second:
        cur += 1
    else:
        cur = run + 1
    if x == last:
        run += 1
    else:
        run = 1
        second, last = last, x
    best = max(best, cur)
print(best)

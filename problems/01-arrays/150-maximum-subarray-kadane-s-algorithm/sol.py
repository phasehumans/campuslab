import sys

# prefix sums: answer = max over j of (P[j] - min_{i<j} P[i])
data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
pre = 0
min_pre = 0
best = None
for x in a:
    pre += x
    cand = pre - min_pre
    if best is None or cand > best:
        best = cand
    if pre < min_pre:
        min_pre = pre
print(best)

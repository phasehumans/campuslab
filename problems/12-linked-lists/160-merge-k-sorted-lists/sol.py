import sys
d = sys.stdin.read().split()
k = int(d[0])
p = 1
lists = []
for _ in range(k):
    m = int(d[p]); p += 1
    lists.append([int(x) for x in d[p:p + m]]); p += m
# divide and conquer pairwise merging
def merge(a, b):
    i = j = 0
    r = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            r.append(a[i]); i += 1
        else:
            r.append(b[j]); j += 1
    r.extend(a[i:]); r.extend(b[j:])
    return r
while len(lists) > 1:
    nxt = [merge(lists[i], lists[i + 1]) for i in range(0, len(lists) - 1, 2)]
    if len(lists) % 2:
        nxt.append(lists[-1])
    lists = nxt
print(" ".join(map(str, lists[0])))

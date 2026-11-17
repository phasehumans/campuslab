import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:n + 1]))
B = 30
# binary trie stored in two flat child arrays
c0 = [-1]
c1 = [-1]
for x in a:
    node = 0
    for b in range(B, -1, -1):
        ch = c1 if (x >> b) & 1 else c0
        if ch[node] == -1:
            ch[node] = len(c0)
            c0.append(-1)
            c1.append(-1)
        node = ch[node]
best = 0
for x in a:
    node = 0
    cur = 0
    for b in range(B, -1, -1):
        bit = (x >> b) & 1
        want = c0 if bit else c1
        if want[node] != -1:
            cur |= 1 << b
            node = want[node]
        else:
            node = (c1 if bit else c0)[node]
    if cur > best:
        best = cur
print(best)

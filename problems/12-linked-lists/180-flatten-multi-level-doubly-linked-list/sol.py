import sys
d = sys.stdin.read().split()
n, head = int(d[0]), int(d[1])
val, nxt, child = {}, {}, {}
p = 2
for _ in range(n):
    i, v, nx, pv, ch = map(int, d[p:p + 5]); p += 5
    val[i], nxt[i], child[i] = v, nx, ch
# iterative DFS: a node's child list comes before the rest of its own list
out = []
stack = [head]
while stack:
    u = stack.pop()
    out.append(val[u])
    if nxt[u] != -1:
        stack.append(nxt[u])
    if child[u] != -1:
        stack.append(child[u])
print(" ".join(map(str, out)))

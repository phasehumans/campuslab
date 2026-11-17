import sys
from collections import deque


def read_tree(line):
    t = line.split()
    if not t or t[0] == "null":
        return [], [], []
    vals, L, R = [int(t[0])], [-1], [-1]
    q = deque([0])
    i = 1
    while i < len(t) and q:
        c = q.popleft()
        if t[i] != "null":
            vals.append(int(t[i])); L.append(-1); R.append(-1)
            L[c] = len(vals) - 1
            q.append(len(vals) - 1)
        i += 1
        if i < len(t) and t[i] != "null":
            vals.append(int(t[i])); L.append(-1); R.append(-1)
            R[c] = len(vals) - 1
            q.append(len(vals) - 1)
        i += 1
    return vals, L, R


def bfs_string(vals, L, R, root=0):
    if root == -1 or not vals:
        return "null"
    out = []
    q = deque([root])
    while q:
        x = q.popleft()
        if x == -1:
            out.append("null")
        else:
            out.append(str(vals[x]))
            q.append(L[x])
            q.append(R[x])
    while out[-1] == "null":
        out.pop()
    return " ".join(out)


vals, L, R = read_tree(sys.stdin.readline())
n = len(vals)
# Diameter = longest shortest-path in the tree: BFS from any node, then BFS from the farthest one.
adj = [[] for _ in range(n)]
for i in range(n):
    for c in (L[i], R[i]):
        if c != -1:
            adj[i].append(c)
            adj[c].append(i)


def bfs(s):
    dist = [-1] * n
    dist[s] = 0
    q = deque([s])
    last = s
    while q:
        x = q.popleft()
        last = x
        for y in adj[x]:
            if dist[y] < 0:
                dist[y] = dist[x] + 1
                q.append(y)
    return last, dist[last]


far, _ = bfs(0)
print(bfs(far)[1])

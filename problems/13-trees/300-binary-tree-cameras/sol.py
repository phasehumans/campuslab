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
INF = 10**9
# Tree DP over three states per node:
#   cam[i]  = node i holds a camera
#   cov[i]  = no camera at i, but a child's camera watches i
#   need[i] = i is not watched yet (its parent must hold a camera); everything below is watched
cam = [0] * n
cov = [0] * n
need = [0] * n
for i in range(n - 1, -1, -1):
    kids = [c for c in (L[i], R[i]) if c != -1]
    cam[i] = 1 + sum(min(cam[c], cov[c], need[c]) for c in kids)
    need[i] = sum(cov[c] for c in kids)
    if not kids:
        cov[i] = INF
    else:
        base = sum(min(cam[c], cov[c]) for c in kids)
        extra = min(max(0, cam[c] - cov[c]) for c in kids)
        cov[i] = base + extra
    need[i] = min(need[i], INF)
print(min(cam[0], cov[0]))

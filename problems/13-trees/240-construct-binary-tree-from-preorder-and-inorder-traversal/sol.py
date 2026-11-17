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


data = sys.stdin.read().split()
n = int(data[0])
pre = list(map(int, data[1:1 + n]))
ino = list(map(int, data[1 + n:1 + 2 * n]))
pos = {v: i for i, v in enumerate(ino)}
left, right = {}, {}
# Iterative build: the stack holds the current root-to-node path whose right child is still open.
stack = [pre[0]]
for v in pre[1:]:
    if pos[v] < pos[stack[-1]]:
        left[stack[-1]] = v
    else:
        parent = None
        while stack and pos[stack[-1]] < pos[v]:
            parent = stack.pop()
        right[parent] = v
    stack.append(v)
out = []
q = deque([pre[0]])
while q:
    x = q.popleft()
    if x is None:
        out.append("null")
        continue
    out.append(str(x))
    q.append(left.get(x))
    q.append(right.get(x))
while out[-1] == "null":
    out.pop()
print(" ".join(out))

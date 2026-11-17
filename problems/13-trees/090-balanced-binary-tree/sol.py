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
h = [0] * n
ok = True
for i in range(n - 1, -1, -1):  # children have larger indices than parents
    a = h[L[i]] if L[i] != -1 else 0
    b = h[R[i]] if R[i] != -1 else 0
    if abs(a - b) > 1:
        ok = False
    h[i] = 1 + max(a, b)
print("true" if ok else "false")

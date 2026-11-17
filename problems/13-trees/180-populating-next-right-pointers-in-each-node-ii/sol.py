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


def levels(vals, L, R):
    """Recursive-free DFS that files each node under its depth; preorder visits left before right."""
    rows = []
    stack = [(0, 0)] if vals else []
    while stack:
        x, d = stack.pop()
        if d == len(rows):
            rows.append([])
        rows[d].append(vals[x])
        if R[x] != -1:
            stack.append((R[x], d + 1))
        if L[x] != -1:
            stack.append((L[x], d + 1))
    return rows


vals, L, R = read_tree(sys.stdin.readline())
rows = levels(vals, L, R)
print(" ".join(" ".join(map(str, r)) + " #" for r in rows))

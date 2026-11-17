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


tok = sys.stdin.readline().split()
if not tok or tok[0] == "null":
    print("null")
else:
    vals, L, R = [int(tok[0])], [-1], [-1]
    stack = [[0, 0]]  # node, number of child slots already filled
    for t in tok[1:]:
        node = stack[-1]
        child = -1
        if t != "null":
            vals.append(int(t)); L.append(-1); R.append(-1)
            child = len(vals) - 1
        if node[1] == 0:
            L[node[0]] = child
        else:
            R[node[0]] = child
        node[1] += 1
        if node[1] == 2:
            stack.pop()
        if child != -1:
            stack.append([child, 0])
    print(bfs_string(vals, L, R))

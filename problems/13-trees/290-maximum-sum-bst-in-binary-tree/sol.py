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
INF = float("inf")
ok = [False] * n
lo = [0] * n
hi = [0] * n
sm = [0] * n
best = 0
for i in range(n - 1, -1, -1):  # children are processed before their parent
    l, r = L[i], R[i]
    good = True
    mn = mx = vals[i]
    s = vals[i]
    if l != -1:
        good = good and ok[l] and hi[l] < vals[i]
        mn = lo[l]
        s += sm[l]
    if r != -1:
        good = good and ok[r] and lo[r] > vals[i]
        mx = hi[r]
        s += sm[r]
    ok[i] = good
    if good:
        lo[i], hi[i], sm[i] = mn, mx, s
        best = max(best, s)
print(best)

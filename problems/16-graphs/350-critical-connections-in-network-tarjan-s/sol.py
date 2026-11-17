import sys

def main():
    d = list(map(int, sys.stdin.buffer.read().split()))
    n, m = d[0], d[1]
    # Bridges via a spanning tree + counting how many non-tree edges "cover" each tree edge.
    adj = [[] for _ in range(n)]
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        adj[u].append((v, i)); adj[v].append((u, i))
    depth = [-1] * n
    par = [-1] * n
    par_edge = [-1] * n
    order = []
    depth[0] = 0
    stack = [0]
    while stack:  # any spanning tree works for the cover technique below
        u = stack.pop()
        order.append(u)
        for v, e in adj[u]:
            if depth[v] == -1:
                depth[v] = depth[u] + 1
                par[v] = u
                par_edge[v] = e
                stack.append(v)
    # For each non-tree edge (a, b) add +1 at a and b and -2 at their LCA; the tree
    # edge above v is a bridge iff the sum over v's subtree is 0 (no edge covers it).
    LOG = max(1, n.bit_length())
    up = [par[:]]
    up[0][0] = 0
    for k in range(1, LOG):
        prev = up[-1]
        up.append([prev[prev[v]] for v in range(n)])
    def lca(a, b):
        if depth[a] < depth[b]:
            a, b = b, a
        diff = depth[a] - depth[b]
        k = 0
        while diff:
            if diff & 1:
                a = up[k][a]
            diff >>= 1; k += 1
        if a == b:
            return a
        for k in range(LOG - 1, -1, -1):
            if up[k][a] != up[k][b]:
                a = up[k][a]; b = up[k][b]
        return up[0][a]
    tree_edges = set(par_edge[v] for v in range(1, n))
    cover = [0] * n
    for i in range(m):
        if i in tree_edges:
            continue
        a, b = d[2 + 2 * i], d[3 + 2 * i]
        cover[a] += 1; cover[b] += 1; cover[lca(a, b)] -= 2
    for u in sorted(range(n), key=lambda x: -depth[x]):
        if par[u] != -1:
            cover[par[u]] += cover[u]
    bridges = sorted((min(v, par[v]), max(v, par[v])) for v in range(n) if par[v] != -1 and cover[v] == 0)
    sys.stdout.write("".join(f"{a} {b}\n" for a, b in bridges))

main()

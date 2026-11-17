import sys

def main():
    d = list(map(int, sys.stdin.buffer.read().split()))
    n, m = d[0], d[1]
    adj = [[] for _ in range(n)]
    for i in range(m):
        adj[d[2 + 2 * i]].append(d[3 + 2 * i])
    # iterative Tarjan
    index = [-1] * n
    low = [0] * n
    on = [False] * n
    st = []
    timer = 0
    sccs = 0
    for s in range(n):
        if index[s] != -1:
            continue
        index[s] = low[s] = timer; timer += 1
        st.append(s); on[s] = True
        work = [(s, 0)]
        while work:
            u, i = work[-1]
            if i < len(adj[u]):
                work[-1] = (u, i + 1)
                v = adj[u][i]
                if index[v] == -1:
                    index[v] = low[v] = timer; timer += 1
                    st.append(v); on[v] = True
                    work.append((v, 0))
                elif on[v]:
                    low[u] = min(low[u], index[v])
            else:
                work.pop()
                if work:
                    p = work[-1][0]
                    low[p] = min(low[p], low[u])
                if low[u] == index[u]:
                    sccs += 1
                    while True:
                        x = st.pop(); on[x] = False
                        if x == u:
                            break
    print(sccs)

main()

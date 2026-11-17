import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m = d[0], d[1]
    adj = [[] for _ in range(n)]
    for i in range(m):
        adj[d[2 + 2 * i]].append(d[3 + 2 * i])
    # iterative three-colour DFS: 0 = new, 1 = on stack, 2 = finished
    color = [0] * n
    for s in range(n):
        if color[s]:
            continue
        color[s] = 1
        stack = [(s, 0)]
        while stack:
            u, i = stack[-1]
            if i < len(adj[u]):
                stack[-1] = (u, i + 1)
                v = adj[u][i]
                if color[v] == 1:
                    print("false")
                    return
                if color[v] == 0:
                    color[v] = 1
                    stack.append((v, 0))
            else:
                color[u] = 2
                stack.pop()
    print("true")

main()

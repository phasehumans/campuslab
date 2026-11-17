import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m = d[0], d[1]
    adj = [[] for _ in range(n)]
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        adj[u].append(v); adj[v].append(u)
    for a in adj:
        a.sort(reverse=True)  # pushed largest first so the smallest is popped first
    seen = [False] * n
    order = []
    stack = [0]
    while stack:
        u = stack.pop()
        if seen[u]:
            continue
        seen[u] = True
        order.append(u)
        for v in adj[u]:
            if not seen[v]:
                stack.append(v)
    print(" ".join(map(str, order)))

main()

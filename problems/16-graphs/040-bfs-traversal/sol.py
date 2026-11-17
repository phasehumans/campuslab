import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m = d[0], d[1]
    adj = [[] for _ in range(n)]
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        adj[u].append(v); adj[v].append(u)
    seen = [False] * n
    seen[0] = True
    order = [0]
    head = 0  # the order list doubles as the queue
    while head < len(order):
        u = order[head]; head += 1
        for v in sorted(adj[u]):
            if not seen[v]:
                seen[v] = True
                order.append(v)
    print(" ".join(map(str, order)))

main()

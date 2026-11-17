import sys

def main():
    d = list(map(int, sys.stdin.buffer.read().split()))
    n, m = d[0], d[1]
    adj = [[] for _ in range(n)]
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        adj[u].append(v); adj[v].append(u)
    seen = [False] * n
    comps = 0
    for s in range(n):
        if seen[s]:
            continue
        comps += 1
        seen[s] = True
        stack = [s]
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    stack.append(v)
    print(comps)

main()

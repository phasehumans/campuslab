import sys
import heapq

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m, s = d[0], d[1], d[2]
    adj = [[] for _ in range(n)]
    for i in range(m):
        u, v, w = d[3 + 3 * i], d[4 + 3 * i], d[5 + 3 * i]
        adj[u].append((v, w)); adj[v].append((u, w))
    # Dijkstra with a "done" set (lazy deletion by visited flag)
    dist = [-1] * n
    pq = [(0, s)]
    while pq:
        dd, u = heapq.heappop(pq)
        if dist[u] != -1:
            continue
        dist[u] = dd
        for v, w in adj[u]:
            if dist[v] == -1:
                heapq.heappush(pq, (dd + w, v))
    print(" ".join(map(str, dist)))

main()

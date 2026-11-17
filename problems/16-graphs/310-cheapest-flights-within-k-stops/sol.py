import sys
import heapq

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m = d[0], d[1]
    adj = [[] for _ in range(n)]
    for i in range(m):
        u, v, w = d[2 + 3 * i:5 + 3 * i]
        adj[u].append((v, w))
    src, dst, k = d[2 + 3 * m:5 + 3 * m]
    # Dijkstra over states (cost, city, flights used); keep the best cost per state
    best = {}
    pq = [(0, src, 0)]
    while pq:
        c, u, used = heapq.heappop(pq)
        if u == dst:
            print(c)
            return
        if best.get((u, used), float("inf")) < c or used == k + 1:
            continue
        for v, w in adj[u]:
            nc = c + w
            if nc < best.get((v, used + 1), float("inf")):
                best[(v, used + 1)] = nc
                heapq.heappush(pq, (nc, v, used + 1))
    print(-1)

main()

**Approach: Dijkstra's algorithm with a min-heap**

Set every distance to infinity except `dist[S] = 0`, and push `(0, S)` into a min-priority queue. Repeatedly pop the vertex with the smallest tentative distance; skip it if the popped distance is stale. Otherwise relax each edge `(u, v, w)`: if `dist[u] + w < dist[v]`, update `dist[v]` and push it. Because all weights are positive, a vertex's distance is final when it is first popped. Print -1 for vertices whose distance stays infinite.

**Complexity:** O((N + M) log N) time, O(N + M) space.

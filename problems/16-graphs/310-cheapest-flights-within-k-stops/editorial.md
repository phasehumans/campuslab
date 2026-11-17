**Approach: Bellman-Ford limited to K + 1 rounds**

Let `dist[v]` be the cheapest cost to reach `v` using at most `i` flights. One round of relaxing every flight extends routes by one flight. Run exactly K + 1 rounds, and in each round relax from a copy of the previous round's distances, so that a single round never chains two flights.

An alternative is Dijkstra / BFS over states `(city, flights used)`.

**Complexity:** O(K * M) time, O(N) space.

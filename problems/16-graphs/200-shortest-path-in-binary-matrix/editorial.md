**Approach: BFS on the grid with 8 directions**

All steps have the same cost, so BFS from (0, 0) finds shortest paths. If the start or the end cell is blocked, the answer is -1. Start with distance 1 at (0, 0), explore the 8 neighbours of each cell, and stop when (N-1, N-1) is dequeued.

**Complexity:** O(N^2) time and space.

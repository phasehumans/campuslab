**Approach: topological sort (Kahn's algorithm)**

Courses and prerequisites form a directed graph; all courses can be finished exactly when the graph has no cycle. Compute in-degrees, push every course with in-degree 0 into a queue, and repeatedly remove a course, decreasing the in-degree of its successors. If every course gets removed, there is no cycle.

Alternatively, run DFS with three colours (unvisited, on the stack, done); reaching a vertex that is on the stack means a cycle.

**Complexity:** O(N + M) time and space.

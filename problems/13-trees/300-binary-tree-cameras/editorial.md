**Approach: Greedy Postorder DP**
Traverse the tree from bottom up. If either child of a node is not monitored (State 0), we must place a camera at the current node. If either child has a camera (State 1), the current node is monitored (State 2). Otherwise, the current node is not monitored (State 0).
Time Complexity: O(N)
Space Complexity: O(H) recursion stack space.

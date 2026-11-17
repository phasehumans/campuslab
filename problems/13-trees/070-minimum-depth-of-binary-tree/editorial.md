**Approach: DFS recursion**
If the root is null, depth is 0. If left child is null, recurse on right. If right child is null, recurse on left. Otherwise, return 1 + min(minDepth(left), minDepth(right)).
Time Complexity: O(N)
Space Complexity: O(H) recursion stack.

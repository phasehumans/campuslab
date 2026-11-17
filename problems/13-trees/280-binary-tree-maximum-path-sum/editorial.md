**Approach: Post-order DFS**
At each node, compute the max gain from left and right subtrees. The max path sum through the current node is `Node.val + max(0, leftGain) + max(0, rightGain)`. Update global maximum.
Time Complexity: O(N)
Space Complexity: O(H)

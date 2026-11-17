**Approach: DFS Preorder Traversal**
Recursively pass the cumulative path sum to children. For a node, the path sum is pathSum * 10 + node.val. If it is a leaf, return this path sum. Otherwise, return the sum of the path sums from left and right subtrees.
Time Complexity: O(N)
Space Complexity: O(H) where H is the height of the tree.
Use a 64-bit integer for the sums: a 10-level path already reaches 10 digits.

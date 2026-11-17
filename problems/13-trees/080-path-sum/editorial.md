**Approach: Recursive DFS**
For each node, if it is a leaf, check if its value equals the remaining sum. Otherwise, recursively search the left and right subtrees with targetSum minus the current node's value.
Time Complexity: O(N)
Space Complexity: O(H) where H is the height of the tree.

Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).

A Binary Search Tree (BST) is defined as:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Note: An empty tree is a BST, so the maximum sum of a BST subtree will be at least 0.

**Input Format:**
- A single line containing the BFS level-order serialization of the tree (using 'null' for empty nodes).

**Output Format:**
- An integer representing the maximum sum.

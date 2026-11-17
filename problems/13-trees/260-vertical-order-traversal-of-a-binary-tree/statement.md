Given the root of a binary tree, return the vertical order traversal of its nodes' values.

For each node at position (row, col), its left child is at (row + 1, col - 1) and its right child is at (row + 1, col + 1). The root is at (0, 0). The vertical order traversal should be grouped by column from left to right. If multiple nodes are in the same row and column, they must be sorted in ascending order of their values.

**Input Format:**
- A single line of BFS representation of the tree.

**Output Format:**
- Multiple lines. Each line contains space-separated integers representing a single column, ordered from leftmost to rightmost column.

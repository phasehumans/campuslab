You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.
- For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.

Return the total sum of all root-to-leaf numbers. The tree has at most 10 levels, so a single number has at most 10 digits and the total may not fit in a 32-bit integer: use a 64-bit type.

A leaf node is a node with no children.

**Input Format:**
- A single line containing the BFS level-order representation of the binary tree.

**Output Format:**
- An integer representing the total sum.

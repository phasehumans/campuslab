Given a 0-indexed integer array representation of a binary tree, determine if the tree represents a valid Max-Heap.

In a binary tree represented as an array, the left child of the node at index i is at index 2*i + 1, and the right child is at index 2*i + 2. The tree is a Max-Heap if for every node i, its value is greater than or equal to the values of its children.

**Input Format:**
- First line: integer n (size of the array)
- Second line: n space-separated integers

**Output Format:**
- Print "true" if the array is a max-heap, "false" otherwise.

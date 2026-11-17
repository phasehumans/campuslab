**Approach:**
Traverse the list. When a node with a child is encountered, recursively flatten the child list, returning the tail node of the flattened child. Connect the current node to the child's head, connect the child's tail to the current node's next node, and clear the child pointer. Continue traversal from the next node.

**Time Complexity:** O(n)
**Space Complexity:** O(depth of levels) for recursion stack.

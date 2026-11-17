**Approach:**
Keep track of a carry value. For each pair of nodes, calculate the sum = val1 + val2 + carry. The new carry is sum / 10, and the digit added to the new node is sum % 10. Repeat until both lists are exhausted and carry is 0.

**Time Complexity:** O(max(n1, n2))
**Space Complexity:** O(max(n1, n2))

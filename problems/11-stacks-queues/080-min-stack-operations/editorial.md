**Approach: Two Stacks**

We maintain two stacks:
1. A main stack `s` to store all pushed elements.
2. A min stack `mins` where the top element is always the minimum of the elements currently in `s`.

When we push `x`:
- Push `x` to `s`.
- If `mins` is empty or `x <= mins.top()`, push `x` to `mins`.

When we pop:
- Pop `x` from `s`.
- If `x == mins.top()`, pop from `mins`.

This ensures that the top of `mins` is always the current minimum, and all operations run in O(1) time.

**Time Complexity:** O(1) per operation
**Space Complexity:** O(q) in the worst case

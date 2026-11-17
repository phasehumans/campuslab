**Approach: Two Stacks (Lazy Transfer)**

We maintain two stacks: `s1` and `s2`.
- `s1` acts as the input buffer (where we push new elements).
- `s2` acts as the output buffer (from which we pop or peek elements).

When we pop or peek, if `s2` is empty, we pop all elements from `s1` one by one and push them to `s2`. This reverses the order, making the oldest elements appear at the top of `s2` (FIFO order).

Amortized time complexity of each operation is O(1).

**Time Complexity:** O(1) amortized per operation
**Space Complexity:** O(q) to store elements

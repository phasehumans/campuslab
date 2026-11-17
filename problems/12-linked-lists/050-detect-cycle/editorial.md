**Approach:**
Initialize two pointers `slow` and `fast` at the head. In each iteration, move `slow` by 1 step and `fast` by 2 steps. If they meet at any node, a cycle exists. If `fast` reaches the end, no cycle exists.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Approach:**
Keep track of `prev` (initially null), `curr` (initially head). In each step, store `curr.next`, set `curr.next` to `prev`, update `prev` to `curr`, and move `curr` to the stored next node.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

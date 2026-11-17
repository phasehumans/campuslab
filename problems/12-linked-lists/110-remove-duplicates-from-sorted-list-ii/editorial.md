**Approach:**
Since the input is sorted, duplicate nodes are adjacent. Use a `dummy` node pointing to `head` to handle cases where the head itself has duplicates. Maintain a pointer `prev` (initially `dummy`). At each step, if `prev.next` and `prev.next.next` have the same value, loop to skip all nodes with this value, and link `prev.next` to the node after the duplicate group. Otherwise, move `prev` forward.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

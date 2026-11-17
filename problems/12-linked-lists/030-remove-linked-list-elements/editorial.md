**Approach:**
Create a dummy node `dummy` such that `dummy.next = head`. Then, iterate through the list with a `curr` pointer starting at `dummy`. If `curr.next.val == val`, remove that node by updating `curr.next = curr.next.next`. Otherwise, move `curr` to `curr.next`.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

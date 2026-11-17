**Approach:**
Find the tail node and compute the length of the list `L`. Make the list circular by pointing `tail.next = head`. The new tail will be at position `L - (k % L) - 1` from the head. Find this new tail, store the new head `new_tail.next`, and break the circle by setting `new_tail.next = null`.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

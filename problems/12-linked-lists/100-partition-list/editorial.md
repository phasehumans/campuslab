**Approach:**
Create two dummy nodes `before_head` and `after_head`. Traverse the original list, appending nodes less than `x` to the `before` list, and nodes greater than or equal to `x` to the `after` list. At the end, connect the tail of the `before` list to the head of the `after` list, and terminate the tail of the `after` list to avoid cycles.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

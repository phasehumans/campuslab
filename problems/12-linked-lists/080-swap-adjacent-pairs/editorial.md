**Approach:**
If the list has less than 2 nodes, return head. Otherwise, let `first` be head, and `second` be head.next. Set `first.next` to the result of recursively calling the function on `second.next`. Set `second.next` to `first`. Return `second`.

**Time Complexity:** O(n)
**Space Complexity:** O(n) for recursion stack, or O(1) if done iteratively.

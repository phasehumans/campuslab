**Approach:**
This is a classic variation of merging K sorted lists. We can flatten the list by iteratively merging the first sub-list with the second, then merging the result with the third, and so on. The merging of two sorted sub-lists can be done iteratively using a dummy node, updating the `bottom` pointers instead of `next` pointers.

**Time Complexity:** O(N * log K) or O(N * K) where N is the total number of nodes and K is the number of sub-lists.
**Space Complexity:** O(1) if merging is done in-place iteratively.

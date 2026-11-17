**Approach:**
Verify if there are at least `k` nodes. If not, return the head as-is. If there are, reverse the first `k` nodes. The head of the original list becomes the tail of the reversed group. Connect this tail to the result of recursively reversing the remaining list.

**Time Complexity:** O(n)
**Space Complexity:** O(n/k) recursion depth.

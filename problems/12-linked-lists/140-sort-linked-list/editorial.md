**Approach:**
Divide the list into two halves using the fast/slow pointer method. Recursively sort each half. Finally, merge the sorted halves using a sorted merge algorithm. This achieves O(n log n) time.

**Time Complexity:** O(n log n)
**Space Complexity:** O(log n) recursion stack depth.

**Approach: Fenwick Tree (Binary Indexed Tree) + Coordinate Compression**

Iterate from right to left. We map each number to its rank in sorted unique elements (coordinate compression). We query the sum in the Fenwick Tree up to rank - 1 to find how many processed elements are strictly smaller, and then increment the count of the current rank in the Fenwick Tree.

**Time Complexity:** O(N log N)
**Space Complexity:** O(N)

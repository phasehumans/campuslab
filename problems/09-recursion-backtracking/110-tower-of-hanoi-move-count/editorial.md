**Approach: Recursive Formula**

The recurrence relation is:
- H(1) = 1
- H(n) = 2 * H(n-1) + 1

This solves mathematically to H(n) = 2^n - 1. Because n <= 60, 2^60 - 1 fits within a signed 64-bit integer. Recursive computation runs in O(n) steps. Time complexity is O(n), and space complexity is O(n) due to recursion stack depth.

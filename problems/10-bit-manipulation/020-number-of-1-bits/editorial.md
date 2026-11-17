**Approach: Brian Kernighan's Algorithm**

The expression n & (n-1) clears the lowest set bit of n. Count how many times we can do this before n becomes 0.

Alternatively, check each bit one by one using n & 1 and n >>= 1.

**Time Complexity:** O(log n) or O(number of set bits)
**Space Complexity:** O(1)

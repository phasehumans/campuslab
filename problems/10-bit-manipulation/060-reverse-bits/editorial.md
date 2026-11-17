**Approach: Bit by bit reversal**

Iterate from bit 0 to bit 31. Extract each bit using (n >> i) & 1, and place it at position (31 - i) in the result.

**Time Complexity:** O(32) = O(1)
**Space Complexity:** O(1)

**Approach: Two Pointers**

1. Place one pointer at the start (0) and another at the end (n-1).
2. The water container capacity is determined by the minimum height of the two boundaries multiplied by the distance between them.
3. Update the maximum capacity.
4. Move the pointer with the smaller height inward since moving the larger height inward would only decrease the distance without any chance of increasing the height boundary.

**Time Complexity:** O(N)
**Space Complexity:** O(1)

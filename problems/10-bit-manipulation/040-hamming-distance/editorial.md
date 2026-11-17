**Approach: Bitwise XOR**

The Hamming distance counts the number of positions where the binary representations of x and y differ. We can compute the bitwise XOR of x and y: `val = x ^ y`. The set bits in `val` represent the positions where x and y differ. We then count the number of set bits in `val` using standard set bit counting techniques (like Brian Kernighan's algorithm).

**Time Complexity:** O(log(max(x, y))) or O(1) as integers are 32-bit.
**Space Complexity:** O(1).

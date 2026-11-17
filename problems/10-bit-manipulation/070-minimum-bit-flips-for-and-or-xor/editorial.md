**Approach: Bit-by-bit analysis**

For each bit position i (0 to 30):
- Let a_i, b_i, c_i be the i-th bits of a, b, c
- If c_i = 1: we need a_i | b_i = 1. If both are 0, flip one (cost 1).
- If c_i = 0: we need a_i = 0 AND b_i = 0. Each 1 costs 1 flip.

**Time Complexity:** O(30) = O(1)
**Space Complexity:** O(1)

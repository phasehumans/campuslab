**Approach: Binary Representation Analysis**

For any positive integer represented in binary, the operations correspond to:
- If even (ends in '0'): dividing by 2 is equivalent to a right shift (removing the last character).
- If odd (ends in '1'): subtracting 1 is equivalent to changing the last character from '1' to '0'.

By stripping leading zeros first, we get a clean binary string of length L. If the string is empty or '0', 0 steps are needed.
Otherwise, for a positive integer:
- We will shift right exactly L - 1 times until only the MSB remains.
- Every '1' bit in the string (including the MSB) must be turned to '0' via subtraction.

Thus, the total steps required is exactly (L - 1) + (count of '1's).

**Time Complexity:** O(L) to count characters.
**Space Complexity:** O(1).

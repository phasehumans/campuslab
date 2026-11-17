**Approach: Direct Loop Modulo Multiplication**

The permutation count is given by:
`P(n, r) = n * (n - 1) * ... * (n - r + 1)`.

Instead of computing factorials and performing division (which requires finding modular inverse), we can simply multiply `r` terms from `n - r + 1` up to `n` modulo `10^9 + 7`.
- If `r > n` or `r < 0`, the count of permutations is `0`.
- If `r == 0`, the answer is `1` (empty permutation).
- Otherwise, compute the product of the `r` integers.

**Time Complexity:** O(r)
**Space Complexity:** O(1)

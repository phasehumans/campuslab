**Approach: Modular Multiplicative Inverse via Fermat's Little Theorem**

The combination count is given by:
`C(n, r) = n! / (r! * (n-r)!)`.

To compute division under modulo `10^9 + 7` (which is a prime), we compute the modular inverse of the denominator using Fermat's Little Theorem:
`inv(A) = A^(MOD - 2) % MOD`.

Algorithm:
1. If `r > n` or `r < 0`, return 0.
2. Compute `fact_n = n! % MOD`, `fact_r = r! % MOD`, and `fact_n_r = (n - r)! % MOD`.
3. Answer is `fact_n * inv(fact_r) * inv(fact_n_r) % MOD`.

This single-query solution runs in O(n) time and O(1) space, avoiding large table precomputation.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

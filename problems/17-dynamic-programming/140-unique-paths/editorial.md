**Approach: Dynamic Programming (1D Space Optimization)**

Let `dp[j]` be the number of paths to reach the current cell in column `j`.
Initialize `dp` array of size `n` with 1 (since there is only 1 path to reach any cell in the first row).
For each row from 1 to `m-1`:
  For each column `j` from 1 to `n-1`:
    `dp[j] = (dp[j] + dp[j-1]) % MOD`

Return `dp[n-1]`.

**Time Complexity:** O(m * n)
**Space Complexity:** O(n)

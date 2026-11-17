**Approach: 1D DP (Tabulation)**

Let `dp[i]` be the minimum coins to make amount `i`.
Initialize `dp[0] = 0` and all other elements to `amount + 1`.
For `i` from 1 to `amount`:
  For each coin `c` in `coins`:
     if `i >= c`:
       `dp[i] = min(dp[i], dp[i - c] + 1)`

If `dp[amount]` remains `amount + 1`, it is impossible to make that amount, so return -1.

**Time Complexity:** O(amount * n)
**Space Complexity:** O(amount)

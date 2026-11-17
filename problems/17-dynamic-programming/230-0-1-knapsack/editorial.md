**Approach: 0/1 Knapsack DP**

Let `dp[j]` be the maximum value we can achieve with capacity `j`.
We initialize the `dp` array of size `W + 1` with 0.
For each item `i` with weight `wt[i]` and value `val[i]`:
  For capacity `j` from `W` down to `wt[i]`:
    `dp[j] = max(dp[j], dp[j - wt[i]] + val[i])`

**Time Complexity:** O(n * W)
**Space Complexity:** O(W)

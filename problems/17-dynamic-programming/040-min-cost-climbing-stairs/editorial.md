**Approach: Dynamic Programming**

Let `dp[i]` be the minimum cost to reach step `i`.
To reach step `i`, we can transition from:
1. Step `i-1`: `dp[i-1] + cost[i-1]`
2. Step `i-2`: `dp[i-2] + cost[i-2]`

Thus, `dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`.
Base cases: `dp[0] = 0`, `dp[1] = 0` (since we can start at index 0 or index 1 free of cost).

**Time Complexity:** O(n)
**Space Complexity:** O(1) if optimized

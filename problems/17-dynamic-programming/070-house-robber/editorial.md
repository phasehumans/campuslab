**Approach: Dynamic Programming**

Let `dp[i]` be the maximum money robbed from the first `i` houses.
For house `i`, we have two options:
1. Rob house `i`: the total money is `dp[i-2] + money[i]`
2. Skip house `i`: the total money is `dp[i-1]`

Thus, `dp[i] = max(dp[i-1], dp[i-2] + money[i])`.
We can optimize the space to O(1) by keeping track of the previous two maximums.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Approach: Tabulation / Iterative**

Let dp[i] be the number of ways to reach the i-th step.
To reach step i, we can come from step i-1 or step i-2. Therefore:
dp[i] = dp[i-1] + dp[i-2]

With base cases dp[1] = 1, dp[2] = 2. We can optimize space to O(1) by only keeping track of the last two values.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

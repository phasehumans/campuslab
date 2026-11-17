**Approach: 2D Dynamic Programming**

Define `dp[i][j]` as the length of LCS of `text1[0...i-1]` and `text2[0...j-1]`.
- If `text1[i-1] == text2[j-1]`, then `dp[i][j] = dp[i-1][j-1] + 1`
- Else, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

We can optimize the space to O(min(m, n)) by using only two rows.

**Time Complexity:** O(m * n)
**Space Complexity:** O(min(m, n))

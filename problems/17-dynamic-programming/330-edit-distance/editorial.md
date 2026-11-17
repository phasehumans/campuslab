**Approach: 2D Dynamic Programming**

Let `dp[i][j]` be the minimum operations to convert `word1[0...i-1]` to `word2[0...j-1]`.
Base cases:
- `dp[i][0] = i` (delete all `i` characters)
- `dp[0][j] = j` (insert all `j` characters)

Transitions:
- If `word1[i-1] == word2[j-1]`, then `dp[i][j] = dp[i-1][j-1]`
- Else, `dp[i][j] = min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]}) + 1`

**Time Complexity:** O(m * n)
**Space Complexity:** O(m * n)

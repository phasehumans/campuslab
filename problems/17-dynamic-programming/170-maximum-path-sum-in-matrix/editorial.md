**Approach: Dynamic Programming (Tabulation)**

Let `dp[i][j]` be the maximum path sum starting from any cell in the first row and ending at `(i, j)`.
Base Case:
- `dp[0][j] = matrix[0][j]` for all `0 <= j < M`.

Transitions:
For each cell `(i, j)` where `i > 0`:
- `dp[i][j] = matrix[i][j] + max({dp[i-1][j], dp[i-1][j-1], dp[i-1][j+1]})`
(Taking care of boundary conditions where `j-1` or `j+1` are out of bounds).

Finally, the answer is the maximum value in `dp[N-1]`.
We can optimize the space to O(M) by maintaining only the previous row's DP values.

**Time Complexity:** O(N * M)
**Space Complexity:** O(M)

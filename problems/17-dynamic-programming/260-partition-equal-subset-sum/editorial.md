**Approach: Subset Sum DP**

First, calculate the total sum of the array. If it is odd, partition is impossible (return false).
Otherwise, our target sum is `target = sum / 2`.
Let `dp[j]` be a boolean indicating if a subset sum of `j` is possible.
Initialize `dp[0] = true` and all other elements to `false`.
For each number `x` in `nums`:
  For `j` from `target` down to `x`:
    if `dp[j - x]` is true:
      `dp[j] = true`

**Time Complexity:** O(n * target) = O(n * sum / 2)
**Space Complexity:** O(target)

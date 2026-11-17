**Approach: Recursion with Memoization (Knapsack-like DP)**

We define a function `solve(idx, target)` which calculates the number of ways to form target sum using a subset of candidates starting from `candidates[idx]`. 
- Base case: if target == 0, return 1 (successfully formed the sum)
- Base case: if target < 0 or idx >= n, return 0
- Transition: `solve(idx, target) = solve(idx, target - candidates[idx]) + solve(idx + 1, target)`

We memoize the state `(idx, target)` using a 2D table or hash map. Time complexity is O(n * target) and space complexity is O(n * target).

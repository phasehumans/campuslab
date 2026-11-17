**Approach: Backtracking with Bitmasks**

Placing queens row by row allows us to avoid checking row collisions. For column and diagonal collisions:
- A column `col` is blocked if bit `col` is set in `cols` mask.
- A positive diagonal is blocked if bit `row + col` is set in `diag2` mask.
- A negative diagonal is blocked if bit `row - col + n - 1` is set in `diag1` mask.

We recursively traverse column index in current row, apply masks, and recurse. If row == n, increment solution count. Backtrack by resetting masks.

Time complexity is O(N!), space complexity is O(N) due to recursion stack depth.

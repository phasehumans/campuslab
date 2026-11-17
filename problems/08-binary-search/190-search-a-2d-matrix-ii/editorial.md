**Approach: Search from Corner (Top-Right or Bottom-Left)**

We can solve this problem in O(M + N) time by starting from the top-right corner `(r, c) = (0, N - 1)`:
- If `matrix[r][c] == target`, we found the target, so output `true`.
- If `matrix[r][c] > target`, then all elements in the current column below `(r, c)` must also be greater than target since the columns are sorted. Thus, we can safely move left: `c = c - 1`.
- If `matrix[r][c] < target`, then all elements in the current row to the left of `(r, c)` must also be smaller than target. Thus, we can safely move down: `r = r + 1`.

Repeat this until we go out of bounds of the matrix, in which case target is not present, so output `false`.

**Time Complexity:** O(M + N) since in each step we either decrement `c` or increment `r`.
**Space Complexity:** O(1) auxiliary space.

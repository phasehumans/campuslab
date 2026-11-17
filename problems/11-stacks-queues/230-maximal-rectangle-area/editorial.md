**Approach: Reduction to Histogram**

1. Maintain an array `heights` of size `c` initialized to 0, which represents the number of consecutive 1s ending at the current column for the current row.
2. For each row from `0` to `r-1`:
   - For each column `j`:
     - If `matrix[row][j] == '1'`, increment `heights[j]`.
     - Else, reset `heights[j] = 0`.
   - Solve the 'Largest Rectangle in Histogram' for the `heights` array and update the overall maximum area.
3. Return the maximum area found.

**Time Complexity:** O(R * C) where R is the number of rows and C is the number of columns.
**Space Complexity:** O(C) to store heights and stack.

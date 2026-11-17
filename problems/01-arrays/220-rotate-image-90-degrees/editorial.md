**Approach: Transpose and Reverse**

1. Transpose the matrix: swap `matrix[i][j]` with `matrix[j][i]` for all `i < j`.
2. Reverse each row of the matrix.

**Time Complexity:** O(n^2)
**Space Complexity:** O(1) auxiliary space if done in-place.

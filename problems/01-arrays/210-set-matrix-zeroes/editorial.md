**Approach: Flag Arrays**

1. Use two arrays `rows[r]` and `cols[c]` initialized to false.
2. Traverse the matrix; if `matrix[i][j] == 0`, set `rows[i] = true` and `cols[j] = true`.
3. Traverse the matrix again and set `matrix[i][j] = 0` if `rows[i]` or `cols[j]` is true.

**Time Complexity:** O(r * c)
**Space Complexity:** O(r + c) auxiliary space.

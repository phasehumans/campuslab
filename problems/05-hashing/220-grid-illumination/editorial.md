**Approach: Frequency Counter Hash Maps + Unique Coordinates Hash Set**

We track active lamps using:
- `row_count[r]`: number of active lamps in row `r`.
- `col_count[c]`: number of active lamps in column `c`.
- `diag1_count[r - c]`: number of active lamps on diagonal parallel to the main diagonal.
- `diag2_count[r + c]`: number of active lamps on diagonal parallel to the anti-diagonal.
- `lamps`: Hash Set of combined 64-bit coordinates representing active lamp positions.

For each query `(r, c)`:
1. If `row_count[r] > 0`, `col_count[c] > 0`, `diag1_count[r-c] > 0`, or `diag2_count[r+c] > 0`, the query cell is illuminated (output 1); otherwise output 0.
2. Iterate through the 3x3 grid centered at `(r, c)`. For each cell `(nr, nc)`, check if a lamp exists in the `lamps` set. If it does, remove it and decrement the corresponding row, column, and diagonal counts.

**Time Complexity:** O(L + Q) since initialization takes O(L) and each query does at most 9 checks in O(1) time.
**Space Complexity:** O(L) to store the lamps in the maps and set.

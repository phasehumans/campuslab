There is a 2D grid of size `n x n` where each cell is initially off (dark). You are given a list of lamp positions `lamps` where `lamps[i] = [r_i, c_i]` indicates that there is a lamp at cell `(r_i, c_i)` which is turned on. When a lamp is turned on, it illuminates its cell and all cells in the same row, column, and two diagonals.

You are also given a list of queries `queries` where `queries[j] = [r_j, c_j]`. For the `j`-th query, determine whether the cell `(r_j, c_j)` is illuminated or not. After answering the query, you must turn off the lamp at `(r_j, c_j)` and all lamps in the 8 adjacent cells (including diagonal neighbors and the cell itself).

A lamp position may appear more than once in the list; it is still a single lamp. Turning off a cell that has no lamp does nothing.

Print the results of the queries (1 for illuminated, 0 for not illuminated), space-separated on a single line.

**Input Format:**
- First line: three space-separated integers: `n` (grid size), `L` (number of lamps), `Q` (number of queries)
- Next `L` lines: each line contains two space-separated integers representing row and col of a lamp.
- Next `Q` lines: each line contains two space-separated integers representing row and col of a query.

**Output Format:**
- A single line containing `Q` space-separated integers (either 0 or 1).

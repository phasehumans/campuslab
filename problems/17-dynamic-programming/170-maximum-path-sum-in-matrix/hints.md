Use dynamic programming starting from the second row. For each cell (i, j), update it with the max of the three reachable cells from the row above: (i-1, j-1), (i-1, j), and (i-1, j+1).

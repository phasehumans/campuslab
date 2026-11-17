**Approach: Backtracking Sudoku Search**

We scan the 9x9 board for the first empty cell '.'. 
For that empty cell, we iterate through characters '1' to '9'. For each digit:
- Check if it violates Sudoku rules (checking the current row, column, and 3x3 grid containing the cell).
- If valid, write it to the board, and recursively invoke `solve()`.
- If the recursive call returns `true`, then the puzzle is solved.
- Otherwise, backtrack by resetting the cell to '.' and try the next digit.

Time complexity is O(9^k) where k is the number of empty cells. Space complexity is O(81) for board state.

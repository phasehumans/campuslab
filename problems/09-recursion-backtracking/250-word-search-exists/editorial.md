**Approach: Backtracking DFS**

For each grid position, if the character matches the start of the word, we initiate a Depth First Search (DFS). 
During DFS:
- Check boundaries and if the current character matches `word[idx]`.
- Mark the cell as visited by temporarily modifying the board cell: `board[r][c] = '#'`.
- Explore the 4 neighbors (up, down, left, right).
- If any branch is successful, return `true`.
- Otherwise, restore the cell: `board[r][c] = temp` (backtrack) and return `false`.

Time complexity is O(m * n * 4^L) where L is word length. Space complexity is O(L) for recursion stack.

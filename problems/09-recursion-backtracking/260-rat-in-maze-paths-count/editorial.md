**Approach: Backtracking DFS**

We start DFS at (0,0) and maintain a `visited` matrix. At each step:
- If current position is (n-1, n-1), we have found a path, return 1.
- Mark the cell (r, c) as visited.
- Loop through the 4 directions (up, down, left, right).
- If neighbor is within boundaries, is open (1), and is not visited, recursively call DFS.
- Sum up the results from all valid recursive calls.
- Reset the visited status of (r, c) (backtrack) and return the sum.

Time complexity is O(4^(n^2)), but actual states visited are much lower. Space complexity is O(n^2) due to visited grid and recursion stack.

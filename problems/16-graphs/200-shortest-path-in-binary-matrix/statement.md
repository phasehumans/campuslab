Given an N x N binary matrix grid, return the length of the shortest clear path from the top-left cell (0, 0) to the bottom-right cell (N-1, N-1). If there is no clear path, return -1.

A clear path visits only cells with value 0, and each step moves to one of the 8 neighbouring cells (sharing a side or a corner). The length of a path is the number of cells it visits, including both ends.

**Input Format:**
- First line: N
- Next N lines: N space-separated integers

**Output Format:**
- A single integer representing the path length, or -1.

Given an R x C grid where 0 is an empty cell, 1 is a fresh orange and 2 is a rotten orange.

Every minute, each fresh orange that shares a side (up, down, left or right) with a rotten orange becomes rotten. Find the minimum number of minutes that must pass until no cell has a fresh orange. If some fresh orange can never rot, return -1. If there are no fresh oranges at the start, the answer is 0.

**Input Format:**
- First line: R C
- Next R lines: C space-separated integers

**Output Format:**
- A single integer representing the minutes, or -1.

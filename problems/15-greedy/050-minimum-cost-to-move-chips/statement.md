We have n chips, where the position of the i-th chip is position[i]. We want to move all the chips to the same position. In one step, we can change the position of the i-th chip from position[i] to:
- position[i] + 2 or position[i] - 2 with cost 0.
- position[i] + 1 or position[i] - 1 with cost 1.

Return the minimum cost needed to move all the chips to the same position.

**Input Format:**
- First line: integer n (the number of chips)
- Second line: n space-separated integers representing the positions of the chips

**Output Format:**
- A single integer: the minimum cost to move all chips to the same position

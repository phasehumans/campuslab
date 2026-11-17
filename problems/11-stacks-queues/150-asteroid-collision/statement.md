We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Input Format:**
- First line: integer n (number of asteroids)
- Second line: n space-separated integers representing the asteroids

**Output Format:**
- A single line containing the space-separated integers representing the remaining asteroids. It is guaranteed that at least one asteroid survives.

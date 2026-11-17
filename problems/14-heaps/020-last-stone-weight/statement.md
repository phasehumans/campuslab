You are given an array of integers representing the weights of stones. We play a game with the stones.

On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
- If x == y, both stones are totally destroyed;
- If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y - x.

At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.

**Input Format:**
- First line: an integer n (number of stones)
- Second line: n space-separated integers representing the initial stone weights

**Output Format:**
- A single integer: the weight of the last stone or 0 if no stones remain

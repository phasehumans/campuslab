You are given an array of integers `gifts` representing the number of gifts in various piles. Every second, you do the following:
1. Choose the pile with the maximum number of gifts.
2. Leave behind the floor of the square root of the number of gifts in that pile, and take the rest.

Return the total number of gifts remaining after `k` seconds.

**Input Format:**
- First line: two integers `n` (number of piles) and `k` (seconds).
- Second line: `n` space-separated integers representing the gifts in each pile.

**Output Format:**
- A single integer representing the total number of gifts remaining.

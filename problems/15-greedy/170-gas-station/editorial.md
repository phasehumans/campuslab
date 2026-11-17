**Approach: Greedy One-pass**

First, check if the sum of gas is at least the sum of cost. If not, return -1. Otherwise, a solution is guaranteed to exist. We start at index 0 and simulate the trip. If the gas tank becomes negative at station i, it means any station from our start to i cannot be the starting point. We reset the starting point to i + 1 and reset our tank to 0.

**Complexity:**
- Time Complexity: O(n) in one pass.
- Space Complexity: O(1).

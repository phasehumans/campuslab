**Approach: Parity Count**

We can move all chips at even positions to position 0 with cost 0, and all chips at odd positions to position 1 with cost 0. Then, we either move all chips at 0 to 1 (cost = count of even chips) or all chips at 1 to 0 (cost = count of odd chips). The minimum cost is min(even_chips, odd_chips).

**Complexity:**
- Time Complexity: O(n) to count parities.
- Space Complexity: O(1).

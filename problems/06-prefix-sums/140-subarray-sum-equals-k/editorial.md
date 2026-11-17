**Approach: Prefix Sum Hash Map**

We traverse the array and maintain the running prefix sum `current_sum`. For each index, the subarray sum ending at this index will equal `k` if there exists a previous prefix sum equal to `current_sum - k`. We lookup `current_sum - k` in our Hash Map, add its frequency to the answer, and then insert the new prefix sum `current_sum` (or increment its frequency) in the map. The map is initialized with `0` having frequency `1` (representing an empty prefix).

**Time Complexity:** O(n) as we traverse the array of size n exactly once.
**Space Complexity:** O(n) to store prefix sums in the Hash Map.

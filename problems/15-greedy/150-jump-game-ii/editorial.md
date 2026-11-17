**Approach: Greedy Range Expansion**

We maintain the maximum reach in the next jump (cur_far) and the end of the current jump range (cur_end). We iterate through the array (excluding the last element), updating cur_far. When we reach cur_end, it means we must make another jump. We increment jumps and set cur_end to cur_far.

**Complexity:**
- Time Complexity: O(n) to traverse the array.
- Space Complexity: O(1).

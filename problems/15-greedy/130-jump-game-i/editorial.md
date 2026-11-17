**Approach: Greedy Maximum Reach**

We keep track of the maximum index we can reach so far, initialized to 0. As we iterate through the array, if the current index is reachable, we update the maximum reachable index to max(max_reach, i + nums[i]). If at any point the maximum reachable index is at least the last index of the array, we can return true. If we encounter an index we cannot reach, we return false.

**Complexity:**
- Time Complexity: O(n) in a single pass.
- Space Complexity: O(1).

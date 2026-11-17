Maintain a sliding window [left, right] and track the number of zeroes inside it. If zero_count > k, increment left until zero_count <= k. The maximum window size (right - left + 1) during the traversal is the answer.

**Time Complexity:** O(n)
**Space Complexity:** O(1) auxiliary space.

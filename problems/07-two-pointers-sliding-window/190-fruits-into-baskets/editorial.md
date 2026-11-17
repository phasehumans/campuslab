Maintain a sliding window with a hash map of fruit counts. If map.size() > 2, increment the left pointer and decrement fruit counts in the map. Remove keys with 0 count. The answer is the maximum window size.

**Time Complexity:** O(n)
**Space Complexity:** O(1) auxiliary space (since the map size is at most 3).

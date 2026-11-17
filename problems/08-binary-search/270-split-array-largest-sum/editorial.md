**Approach: Binary Search on Answer**

Define low = max(nums) and high = sum(nums). For a target sum mid, traverse the array and greedily group elements. If the current subarray sum exceeds mid, we must start a new subarray. If the total number of subarrays exceeds K, then mid is too small. Otherwise, we try a smaller maximum.

**Time Complexity:** O(N log(sum(nums)))
**Space Complexity:** O(1)

**Approach: Dutch National Flag (Three-way Partitioning)**

Maintain low (for 0s), mid (for 1s), and high (for 2s). Traverse the array with mid:
- If nums[mid] == 0: swap(nums[low], nums[mid]), increment low and mid.
- If nums[mid] == 1: increment mid.
- If nums[mid] == 2: swap(nums[mid], nums[high]), decrement high.

**Time Complexity:** O(N)
**Space Complexity:** O(1)

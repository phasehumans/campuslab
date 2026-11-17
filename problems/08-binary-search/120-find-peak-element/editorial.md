**Approach: Binary Search**

If arr[mid] < arr[mid + 1], then we are in an ascending slope. The peak must be on the right side, so we set low = mid + 1. Otherwise, we are in a descending slope, meaning a peak must be at mid or to its left, so we set high = mid. The search converges when low == high.

**Time Complexity:** O(log N)
**Space Complexity:** O(1)

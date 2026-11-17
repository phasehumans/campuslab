**Approach: Binary Search**

Initialize low = 0 and high = N - 1. In each step, calculate mid = low + (high - low) / 2. If arr[mid] == K, we found the element. If arr[mid] < K, narrow search space to the right half by setting low = mid + 1. Otherwise, narrow search space to the left half by setting high = mid - 1.

**Time Complexity:** O(log N)
**Space Complexity:** O(1)

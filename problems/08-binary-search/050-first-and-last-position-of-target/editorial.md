**Approach: Dual Binary Search**

To find the first occurrence, perform binary search. When arr[mid] == target, save the index and search the left half (high = mid - 1) to find an even earlier occurrence. For the last occurrence, when arr[mid] == target, save the index and search the right half (low = mid + 1).

**Time Complexity:** O(log N)
**Space Complexity:** O(1)

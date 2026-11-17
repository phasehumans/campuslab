**Approach: Binary Search**

Compare arr[mid] with arr[high].
- If arr[mid] > arr[high], it means the pivot (and thus the minimum) is in the right half. So set low = mid + 1.
- Otherwise, the minimum element must be in the left half, including mid. So set high = mid.
When low == high, we have found the minimum element.

**Time Complexity:** O(log N)
**Space Complexity:** O(1)

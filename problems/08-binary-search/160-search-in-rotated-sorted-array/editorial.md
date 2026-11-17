**Approach: Rotated Binary Search**

For any mid, at least one of the halves [low, mid] or [mid, high] is sorted.
- If arr[low] <= arr[mid], the left half is sorted. If target lies within [arr[low], arr[mid]), search left (high = mid - 1); otherwise search right (low = mid + 1).
- If the right half is sorted, and target lies within (arr[mid], arr[high]], search right (low = mid + 1); otherwise search left (high = mid - 1).

**Time Complexity:** O(log N)
**Space Complexity:** O(1)

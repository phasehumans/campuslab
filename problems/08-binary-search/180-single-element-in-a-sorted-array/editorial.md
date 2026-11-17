**Approach: Binary Search**

Since the array is sorted and all elements except one appear twice, the array length `N` is always odd. We can use binary search.
For any index `mid`:
- If `mid` is even, and `arr[mid] == arr[mid + 1]`, the single element must be on the right side. So set `low = mid + 2`.
- If `mid` is even, and `arr[mid] != arr[mid + 1]`, the single element is either at `mid` or on the left side. So set `high = mid`.
- If `mid` is odd, we can compare it with `arr[mid - 1]` to reduce this case to an even index.
Specifically, we can do `mid = mid ^ 1`. If `arr[mid] == arr[mid ^ 1]`, it means the pairing is correct up to `mid`, so search the right side: `low = mid + 1`. Otherwise, search the left side: `high = mid`.

**Time Complexity:** O(log N)
**Space Complexity:** O(1)

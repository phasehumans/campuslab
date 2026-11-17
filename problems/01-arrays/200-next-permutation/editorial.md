**Approach: Single Pass Scan**

1. Traverse from right to left to find the first index `i` (pivot) such that `arr[i] < arr[i+1]`.
2. If not found, reverse the whole array and return.
3. If found, find the smallest element to the right of `i` that is strictly greater than `arr[i]`. Swap them.
4. Reverse the subarray from `i+1` to the end.

**Time Complexity:** O(n)
**Space Complexity:** O(1) auxiliary space.

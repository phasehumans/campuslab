**Approach: Two Pointers (In-place)**

1. Maintain a pointer `write_idx` initialized to 0.
2. Traverse the array from left to right. If the current element is non-zero, swap or copy it to the `write_idx` and increment `write_idx`.
3. Fill the remaining positions from `write_idx` to `n - 1` with zeroes.

**Time Complexity:** O(N)
**Space Complexity:** O(1) auxiliary space.

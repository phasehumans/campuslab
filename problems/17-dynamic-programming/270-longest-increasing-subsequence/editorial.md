**Approach: DP with Binary Search (Patience Sorting)**

Maintain an array `sub` which stores the smallest tail of all increasing subsequences of various lengths found so far.
For each element `x` in `nums`:
- Find the first element in `sub` that is >= `x` (using binary search / `lower_bound`).
- If `x` is larger than all elements in `sub`, append it to `sub`.
- Otherwise, replace the found element with `x`.

The length of `sub` at the end is the length of the LIS.

**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

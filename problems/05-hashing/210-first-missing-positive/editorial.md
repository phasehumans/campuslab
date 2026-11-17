**Approach: Index Cyclic Sort (In-place Swap)**

1. Iterate through the array. For each element `arr[i]`, if it is in the range `[1, n]` and `arr[i] != arr[arr[i] - 1]`, swap it with the element at index `arr[i] - 1`.
2. Repeat the swapping process until the current element cannot be swapped anymore.
3. After sorting, make a second pass to find the first index `i` where `arr[i] != i + 1`. Return `i + 1`.
4. If all positions are correct, return `n + 1`.

**Time Complexity:** O(n) as each element is put into its correct spot at most once.
**Space Complexity:** O(1) auxiliary space.

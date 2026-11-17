**Approach: Two Pointers**

Maintain index `m = 1` for unique elements. Iterate `i` from 1 to n-1. If `arr[i] != arr[i-1]`, update `arr[m] = arr[i]` and increment `m`.

**Time Complexity:** O(n)
**Space Complexity:** O(1) auxiliary space.

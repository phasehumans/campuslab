**Approach: Direct Verification of Parent-Child Invariant**

For a 0-indexed array of size n, only nodes at indices up to (n - 2) / 2 can have children. We can check each node i in this range:
1. Left child index is 2*i + 1. If 2*i + 1 < n and arr[i] < arr[2*i + 1], then it's not a Max-Heap.
2. Right child index is 2*i + 2. If 2*i + 2 < n and arr[i] < arr[2*i + 2], then it's not a Max-Heap.
If no node violates this property, then it is a valid Max-Heap.

**Time Complexity:** O(n) as we scan the array elements once.
**Space Complexity:** O(1) auxiliary space.

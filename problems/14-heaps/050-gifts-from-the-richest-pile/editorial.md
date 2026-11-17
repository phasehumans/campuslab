**Approach: Max-Heap Simulation**

To efficiently retrieve and update the maximum number of gifts at each second, we can use a Max-Heap. 
1. Push all pile values into a Max-Heap.
2. In each of the `k` seconds, pop the maximum element `val`.
3. Compute `floor(sqrt(val))` and push it back into the heap.
4. After `k` seconds, compute the sum of all elements in the heap.

Note: If the maximum value in the heap becomes `1`, we can stop early because `floor(sqrt(1)) = 1` which will not change the gifts count anymore.

**Time Complexity:** O(n + k log n) to heapify the array and perform k insertions/deletions.
**Space Complexity:** O(n) to store the heap.

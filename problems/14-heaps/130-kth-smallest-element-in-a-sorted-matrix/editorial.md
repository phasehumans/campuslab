**Approach: Min-Heap (K-Way Merge)**

Since both rows and columns are sorted, we can optimize the search using a Min-Heap. 
1. Push the first element of each of the `n` rows into the Min-Heap as `(value, row, col)`.
2. Repeat the following `k` times:
   - Pop the minimum element from the heap.
   - Let it be from `(row, col)`.
   - If `col + 1 < n`, push the next element in that row `(matrix[row][col + 1], row, col + 1)` into the heap.
3. The value popped at the `k`-th iteration is our answer.

**Time Complexity:** O(n + k log n) where heapifying the first column takes O(n) and each of the `k` pops takes O(log n) time.
**Space Complexity:** O(n) to maintain the heap.

**Approach: Min-Heap of size K**

1. Initialize a min-heap of size k storing triplets: (value, array_index, element_index).
2. Insert the first element of every non-empty array into the heap.
3. Loop while heap is not empty:
   - Pop the minimum element from the heap.
   - Append its value to the output list.
   - If this element has a successor in its original array, push the successor into the heap.

**Time Complexity:** O(N log k) where N is the total number of elements.
**Space Complexity:** O(k) for the heap.

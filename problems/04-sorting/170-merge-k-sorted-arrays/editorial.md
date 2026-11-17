**Approach: Min-Heap (Priority Queue)**

Create a min-heap that stores elements of the form (value, array_index, element_index). Push the first element of each of the K arrays into the heap. In each step, extract the minimum element, output it, and if there are more elements in the corresponding array, push the next element into the heap.

**Time Complexity:** O(K * N * log K)
**Space Complexity:** O(K) auxiliary space

1. Maintain a Min-Heap of size k, containing the current element pointers from each list.
2. Keep track of the maximum value currently in the heap.
3. The range is [heap.peek().val, max_val]. Try to shrink the range by popping the minimum element and pushing the next element from the same list.

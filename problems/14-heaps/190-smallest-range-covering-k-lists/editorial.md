**Approach: Min-Heap of pointers + track Max Value**

1. Initialize a min-heap. Push the first element of each list as (val, list_index, element_index) into the heap.
2. Maintain `max_val` as the maximum element among the currently chosen elements in the heap.
3. The current candidate range is [min_heap.peek().val, max_val]. If this range is smaller than the best range found so far, update the best range.
4. Pop the minimum element from the heap. If the corresponding list has a next element, push it into the heap and update `max_val`.
5. If the popped element belongs to a list that has been fully exhausted, terminate the loop. Since we can no longer cover that list, we cannot form any smaller valid ranges.

**Time Complexity:** O(N log k) where N is the total number of elements.
**Space Complexity:** O(k) for the heap.

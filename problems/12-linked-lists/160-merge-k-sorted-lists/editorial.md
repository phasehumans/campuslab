**Approach:**
Create a min-heap to store the head nodes of each of the `k` lists. Pop the minimum node from the heap, make it part of the merged list, and push its next node back into the heap. Repeat until the heap is empty.

**Time Complexity:** O(N log k) where N is total nodes.
**Space Complexity:** O(k) for heap size.

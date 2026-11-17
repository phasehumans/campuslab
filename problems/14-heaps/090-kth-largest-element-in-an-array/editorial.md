**Approach: Min-Heap of size K**

We keep a Min-Heap of size k. For each element:
- Push it into the heap.
- If heap size grows past k, pop the top element.
After processing all elements, the min-heap holds the k largest elements of the array. The root of the heap is the k-th largest element in the array.

**Time Complexity:** O(n log k)
**Space Complexity:** O(k)

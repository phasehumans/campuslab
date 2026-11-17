**Approach: Min-Heap of Size K**

To find the k-th largest element in a stream, we can maintain a Min-Heap of size k. For each new element from the stream:
1. Push the element into the min-heap.
2. If the heap size exceeds k, pop the top (minimum) element.
3. If the heap size is exactly k, the root of the heap (the minimum among the k largest elements) is the k-th largest element in the stream.

**Time Complexity:** O(n log k) as each of the n insertions takes O(log k) time.
**Space Complexity:** O(k) to store the k largest elements in the heap.

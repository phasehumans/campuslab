**Approach: Two Heaps (Max-Heap & Min-Heap)**

We maintain two heaps:
1. max_heap: stores the smaller half of numbers (size is either equal to or 1 greater than min_heap).
2. min_heap: stores the larger half of numbers.

For each number, add to max_heap if it is smaller than max_heap's peak, otherwise add to min_heap. Rebalance the heaps so their size difference is at most 1. The median is either the peak of max_heap (if odd size) or the average of both peaks (if even size).

**Time Complexity:** O(N log N)
**Space Complexity:** O(N)

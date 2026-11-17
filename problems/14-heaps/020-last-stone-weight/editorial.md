**Approach: Max-Heap / Priority Queue**

We can simulate the game using a Max-Heap:
1. Insert all stone weights into a max-heap.
2. In each iteration, pop the top two elements: y (heaviest) and x (second heaviest).
3. If y > x, push y - x back into the heap.
4. Repeat until there is 1 or 0 elements left in the heap.
5. If the heap is empty, return 0; else return the only remaining element.

**Time Complexity:** O(n log n) because we perform at most n - 1 smashes, and each smash does O(log n) heap operations.
**Space Complexity:** O(n) to store the heap elements.

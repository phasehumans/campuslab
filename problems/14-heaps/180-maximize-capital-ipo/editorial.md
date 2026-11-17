**Approach: Greedy + Sorting + Max-Heap**

To maximize capital at each step, we should greedily choose the project that gives the maximum profit among all the projects we can afford with our current capital `w`.

1. Combine `capital` and `profits` into a list of projects, and sort them in ascending order of `capital`.
2. Maintain a Max-Heap of profits for all projects we can currently afford.
3. Keep a pointer `idx` to track projects that have been added to the heap.
4. Repeat at most `k` times:
   - Add all projects whose capital is <= `w` to the Max-Heap, advancing `idx`.
   - If the Max-Heap is empty, we cannot afford any more projects; break.
   - Pop the project with the maximum profit from the heap and add its profit to `w`.
5. Return `w` as the final maximized capital.

**Time Complexity:** O(n log n + k log n) where sorting takes O(n log n) and we push/pop at most n elements in/out of the heap, each taking O(log n).
**Space Complexity:** O(n) to store the projects and the heap.

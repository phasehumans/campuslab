**Approach: Greedy with Max-Heap**

As we drive, we keep track of the maximum distance we can reach. Whenever we can't reach the next station (or target), we look at all the gas stations we have passed, and greedily choose the one with the largest fuel. We can use a max-heap to efficiently get the largest fuel. We repeat this until we can reach the next station/target.

**Complexity:**
- Time Complexity: O(n) or O(n log n) because each station is pushed and popped from the heap at most once.
- Space Complexity: O(n) for the heap.

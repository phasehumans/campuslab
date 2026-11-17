**Approach: Max-Heap of size K**

We want to find the `k` smallest elements, so maintaining a Max-Heap of size `k` is optimal:
1. For each point `(x, y)`, calculate its squared Euclidean distance `d = x^2 + y^2`.
2. Push the point into the Max-Heap.
3. If the size of the heap exceeds `k`, pop the furthest point (i.e. the one with the maximum distance). In case of ties, pop the one with the larger x-coordinate, then larger y-coordinate.
4. After iterating through all points, the heap will contain the `k` closest points.
5. Extract all points from the heap, reverse them (since they are extracted in descending order), and print them.

**Time Complexity:** O(n log k) because each insertion/deletion in the heap of size k takes O(log k) time.
**Space Complexity:** O(k) to maintain the heap.

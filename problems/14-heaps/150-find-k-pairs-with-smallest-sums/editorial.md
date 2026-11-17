**Approach: Min-Heap Expansion (Dijkstra-like)**

We don't need to generate all n1 * n2 pairs. Since the arrays are sorted:
1. Initialize a min-heap. Push (nums1[i] + nums2[0], i, 0) for i from 0 to min(n1, k) - 1.
2. Do the following k times (or until heap is empty):
   - Pop the smallest element (sum, i, j) from the heap.
   - Print nums1[i] and nums2[j].
   - If j + 1 < n2, push (nums1[i] + nums2[j+1], i, j+1) to the heap.

**Time Complexity:** O(k log k)
**Space Complexity:** O(k)

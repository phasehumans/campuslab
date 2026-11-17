**Approach: Greedy with Min-Heap**

At any point, we want to combine the two ropes with the smallest lengths. This is a classic greedy strategy (similar to Huffman Coding):
1. Insert all rope lengths into a Min-Heap.
2. While the heap contains more than 1 rope:
   - Pop the two smallest ropes `a` and `b`.
   - Connect them: the cost of this connection is `a + b`.
   - Add this cost to our total accumulated cost.
   - Push the new rope of length `a + b` back into the heap.
3. Return the total accumulated cost.

**Time Complexity:** O(n log n) because each of the `n-1` steps performs O(log n) heap operations.
**Space Complexity:** O(n) to store the elements in the heap.

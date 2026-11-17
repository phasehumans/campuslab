**Approach: Hash Map + Heap**

1. Count the occurrences of each element using a frequency map/hash map.
2. Insert the (frequency, value) pairs into a Max-Heap (or binary heap).
3. Compare elements based on frequency first (higher frequency has priority). If frequencies are equal, compare values (larger value has priority).
4. Pop k elements from the heap and print them.

**Time Complexity:** O(n + u log u) where u is the number of unique elements (u <= n).
**Space Complexity:** O(u) for map and heap.

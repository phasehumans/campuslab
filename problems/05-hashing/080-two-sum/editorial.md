**Approach: Hash Map (Single Pass)**

1. Initialize a hash map to store value-to-index mappings.
2. Iterate through the array. For each element, compute its complement: `target - arr[i]`.
3. Check if the complement exists in the hash map. If it does, we found the pair. Print the 1-based indices in ascending order.
4. Otherwise, add the current element and its index to the map.

**Time Complexity:** O(N)
**Space Complexity:** O(N)

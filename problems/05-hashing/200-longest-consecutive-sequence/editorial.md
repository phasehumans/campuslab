**Approach: Hash Set**

1. Insert all elements of the array into a hash set.
2. Iterate through each element `x` in the set. Check if `x - 1` is present in the set. If not, it means `x` can be the start of a consecutive sequence.
3. From `x`, incrementally check if `x + 1, x + 2, ...` are in the set, keeping track of the sequence length.
4. Update the maximum length found.

**Time Complexity:** O(N) because each element is visited at most twice (once in loop, once in inner while loop).
**Space Complexity:** O(N) for the hash set.

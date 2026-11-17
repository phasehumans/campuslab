**Approach: Greedy bit-by-bit with hash set**

Process bits from the most significant to least. For each bit position, try to set it in the answer. Use a set to store all prefixes of numbers up to the current bit. For each prefix p, check if (candidate ^ p) exists in the set.

**Time Complexity:** O(n * 30)
**Space Complexity:** O(n)

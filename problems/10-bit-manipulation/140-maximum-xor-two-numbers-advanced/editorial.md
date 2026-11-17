**Approach: Binary Trie**

Insert all numbers into a binary trie (from MSB to LSB). For each number, traverse the trie greedily choosing the opposite bit at each level to maximize XOR.

**Time Complexity:** O(n * 30)
**Space Complexity:** O(n * 30)

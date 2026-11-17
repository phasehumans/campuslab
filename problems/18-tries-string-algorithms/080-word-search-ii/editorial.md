**Approach: Backtracking with Trie**

Build a Trie containing all target words. Run a DFS from every board cell. At each cell, step down the matching character transition in the Trie. Mark cells visited by changing them to '#' temporarily and restore them. When a node's word is found, record it, then clear it to avoid duplicate output.

**Time Complexity:** O(M * N * 4^L) where L is the maximum word length.
**Space Complexity:** O(U * 26) Trie nodes.
